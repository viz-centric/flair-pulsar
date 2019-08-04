import {Test, TestingModule} from '@nestjs/testing';
import {AppModule} from '../src/app.module';
import {Client} from "grpc";
import {RpcServerService} from "../src/rpc/server/rpc-server.service";
import {RpcClientService} from "../src/rpc/client/rpc-client.service";
import {DatabaseService} from "../src/persistence/database/database.service";
import {IncomingEventService} from "../src/persistence/incoming-event/incoming-event.service";
import {IncomingEvent} from "../src/persistence/incoming-event/incoming-event.entity";
import {IncomingEventLogType} from "../src/persistence/incoming-event/incoming-event-log-type";
import {PromiseUtils} from "../src/utils/promise-utils";

describe('AppController (e2e)', () => {
  let app;
  let rpcClientService: RpcClientService;
  let rpcServerService: RpcServerService;
  let client: Client;
  let databaseService: DatabaseService;
  let incomingEventService: IncomingEventService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: []
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    rpcServerService = moduleFixture.get<RpcServerService>(RpcServerService);
    rpcClientService = moduleFixture.get<RpcClientService>(RpcClientService);
    databaseService = moduleFixture.get<DatabaseService>(DatabaseService);
    incomingEventService = moduleFixture.get<IncomingEventService>(IncomingEventService);
  });

  afterEach(async () => {
    rpcServerService.stop();
    rpcClientService.stop();
    return await databaseService.close();
  });

  it('should return empty pulse when pulse request succeeded', async () => {
    let currentTime = new Date();
    let itemId: number = currentTime.getTime();
    let summary = `some summary ${itemId}`;
    let request = createPulseRequest(itemId);

    rpcServerService.startServer();
    client = rpcClientService.createClient();
    let result = rpcClientService.publishPulse(request);
    await expect(result).resolves.toEqual({});

    await PromiseUtils.wait(100);

    let incomingEvents: IncomingEvent[] = await incomingEventService.findAll();
    let matchingEvents = incomingEvents.filter((item) => item.summary === summary);

    expect(matchingEvents.length).toBe(1);

    let matchingEvent = matchingEvents[0];

    expect(+matchingEvent.id).toBeGreaterThan(0);
    expect(matchingEvent.summary).toEqual(summary);
    expect(matchingEvent.eventData['custom']).toEqual('field');
    expect(matchingEvent.logType).toEqual(IncomingEventLogType.ON);
    expect(matchingEvent.ttl).toEqual(111);
    expect(matchingEvent.serviceName).toEqual('my service');
    expect(matchingEvent.createdAt.getTime()).toBeGreaterThanOrEqual(currentTime.getTime());
    expect(matchingEvent.updatedAt.getTime()).toBeGreaterThanOrEqual(currentTime.getTime());
    expect(matchingEvent.eventTime.getTime()).toBeGreaterThanOrEqual(currentTime.getTime());
  });

  it('should return error when grpc pulse request fails', async () => {
    let itemId: number = new Date().getTime();
    let summary = `some summary ${itemId}`;
    let request = createPulseRequest(itemId);
    rpcServerService.setupHandlers({
      publishPulse: (call, callback) => {
        callback({error: 'error name'}, null);
      }
    });
    rpcServerService.startServer();
    client = rpcClientService.createClient();
    let result = rpcClientService.publishPulse(request);
    await expect(result).rejects.toMatchObject({code: 2});

    await PromiseUtils.wait(100);

    let incomingEvents: IncomingEvent[] = await incomingEventService.findAll();
    let matchingEvents = incomingEvents.filter((item) => item.summary === summary);

    expect(matchingEvents.length).toBe(0);
  });

  function createPulseRequest(itemId: number) {
    let eventTimeDate: Date = new Date();
    return {
      pulseHeader: {
        service: 'my service',
        eventTime: {
          seconds: Math.floor(eventTimeDate.getTime() / 1000),
          nanos: eventTimeDate.getMilliseconds() * 1000
        }
      },
      pulseBody: {
        summary: `some summary ${itemId}`,
        eventData: {custom: 'field'}
      },
      pulseConfig: {
        log: true,
        ttl: 111
      }
    };
  }
});
