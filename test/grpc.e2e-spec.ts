import {Test, TestingModule} from '@nestjs/testing';
import {AppModule} from '../src/app.module';
import {RpcClientService} from '../src/rpc/client/rpc-client.service';
import {DatabaseService} from '../src/persistence/database/database.service';
import {IncomingEventService} from '../src/persistence/incoming-event/incoming-event.service';
import {IncomingEvent} from '../src/persistence/incoming-event/incoming-event.entity';
import {IncomingEventLogType} from '../src/persistence/incoming-event/incoming-event-log-type';
import {PromiseUtils} from '../src/utils/promise-utils';
import {grpcClientOptions} from '../src/rpc/config/grpc-client.options';

describe('Pulsar gRPC (e2e)', () => {
  let app;
  let moduleFixture: TestingModule;
  let rpcClientService: RpcClientService;
  let databaseService: DatabaseService;
  let incomingEventService: IncomingEventService;

  beforeEach(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
      providers: [RpcClientService],
    }).compile();

    app = moduleFixture.createNestMicroservice(grpcClientOptions);
    await app.listenAsync();
    await app.init();

    rpcClientService = moduleFixture.get<RpcClientService>(RpcClientService);
    databaseService = moduleFixture.get<DatabaseService>(DatabaseService);
    incomingEventService = moduleFixture.get<IncomingEventService>(IncomingEventService);
  });

  afterEach(async () => {
    await app.close();
  });

  it('should return empty pulse when pulse request succeeded', async () => {
    const currentTime = new Date();
    const itemId: number = currentTime.getTime();
    const summary = `some summary ${itemId}`;
    const request = createPulseRequest(itemId);

    const result = rpcClientService.publishPulse(request);
    await expect(result).resolves.toEqual({});

    await PromiseUtils.wait(100);

    const incomingEvents: IncomingEvent[] = await incomingEventService.findAll();
    const matchingEvents = incomingEvents.filter((item) => item.summary === summary);

    expect(matchingEvents.length).toBe(1);

    const matchingEvent = matchingEvents[0];

    expect(+matchingEvent.id).toBeGreaterThan(0);
    expect(matchingEvent.summary).toEqual(summary);
    expect(matchingEvent.eventData[`custom`]).toEqual('field');
    expect(matchingEvent.logType).toEqual(IncomingEventLogType.ON);
    expect(matchingEvent.ttl).toEqual(111);
    expect(matchingEvent.serviceName).toEqual('my service');
    expect(matchingEvent.createdAt.getTime()).toBeGreaterThanOrEqual(currentTime.getTime());
    expect(matchingEvent.updatedAt.getTime()).toBeGreaterThanOrEqual(currentTime.getTime());
    expect(matchingEvent.eventTime.getTime()).toBeGreaterThanOrEqual(currentTime.getTime());
  });

  it('should return error when grpc pulse request fails', async () => {
    const itemId: number = new Date().getTime();
    const summary = `some summary ${itemId}`;
    const request = createPulseRequest(itemId);
    const result = rpcClientService.publishPulse(request);
    await expect(result).rejects.toMatchObject({code: 2});

    await PromiseUtils.wait(100);

    const incomingEvents: IncomingEvent[] = await incomingEventService.findAll();
    const matchingEvents = incomingEvents.filter((item) => item.summary === summary);

    expect(matchingEvents.length).toBe(0);
  });

  function createPulseRequest(itemId: number) {
    const eventTimeDate: Date = new Date();
    return {
      pulseHeader: {
        service: 'my service',
        eventTime: {
          seconds: Math.floor(eventTimeDate.getTime() / 1000),
          nanos: eventTimeDate.getMilliseconds() * 1000,
        },
      },
      pulseBody: {
        summary: `some summary ${itemId}`,
        eventData: {custom: 'field'},
      },
      pulseConfig: {
        log: true,
        ttl: 111,
      },
    };
  }
});
