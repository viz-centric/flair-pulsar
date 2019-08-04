import {Test, TestingModule} from '@nestjs/testing';
import {PulseService} from './pulse.service';
import {AppModule} from "../../app.module";
import {IncomingEventService} from "../../persistence/incoming-event/incoming-event.service";
import {IncomingEvent} from "../../persistence/incoming-event/incoming-event.entity";
import {IncomingEventLogType} from "../../persistence/incoming-event/incoming-event-log-type";

describe('PulseService', () => {
  let service: PulseService;
  let incomingEventService: IncomingEventService;
  let appModule;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [],
    }).compile();

    appModule = module.get<AppModule>(AppModule);
    service = module.get<PulseService>(PulseService);
    incomingEventService = module.get<IncomingEventService>(IncomingEventService);
  });

  afterEach(async () => {
    await appModule.shutdown();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should save incoming event when calling handlePulse method', async () => {
    let currentTime = new Date();
    let itemId: number = currentTime.getTime();
    let summary = `some summary ${itemId}`;
    let request = createPulseRequest(itemId);

    await service.handlePulse(request.pulseConfig, request.pulseHeader, request.pulseBody);

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
