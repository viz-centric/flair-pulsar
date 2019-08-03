import {Test, TestingModule} from '@nestjs/testing';
import {IncomingEventService} from './incoming-event.service';
import {AppModule} from "../../app.module";
import {IncomingEvent} from "./incoming-event.entity";
import {IncomingEventLogType} from "./incoming-event-log-type";
import {PromiseUtils} from "../../utils/promise-utils";

describe('IncomingEventService', () => {
  let service: IncomingEventService;
  let appModule: AppModule;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    service = module.get<IncomingEventService>(IncomingEventService);
    appModule = module.get<AppModule>(AppModule);
  });

  afterEach(async () => {
    await appModule.shutdown();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should save event into the database', async () => {
    let {currentTime, dummyEvent} = createDummyEvent();

    let savedEvent: IncomingEvent = await service.save(dummyEvent);

    verifyPersistedEvent(savedEvent, currentTime);
  });

  it('should update updateAt field on save', async () => {
    let {currentTime, dummyEvent} = createDummyEvent();

    let savedEvent: IncomingEvent = await service.save(dummyEvent);

    await PromiseUtils.wait(100);

    dummyEvent.summary = 'new summary';
    let savedEvent2: IncomingEvent = await service.save(dummyEvent);

    let savedEvent3 = await service.find(savedEvent2.id);

    expect(savedEvent3.updatedAt.getTime() + 2000).toBeGreaterThanOrEqual(savedEvent3.createdAt.getTime());
  });

  it('should load event from the database with the same parameters that it was saved with', async () => {
    let {currentTime, dummyEvent} = createDummyEvent();

    let savedEvent: IncomingEvent = await service.save(dummyEvent);
    savedEvent = await service.find(savedEvent.id);

    verifyPersistedEvent(savedEvent, currentTime);
  });

  it('should load all events from db', async () => {
    let {currentTime, dummyEvent} = createDummyEvent();

    let savedEvent: IncomingEvent = await service.save(dummyEvent);
    let allEvents = await service.findAll();
    let eventsMatchingId = allEvents.filter((item) => item.id === savedEvent.id);
    expect(eventsMatchingId.length).toBe(1);
    verifyPersistedEvent(eventsMatchingId[0], currentTime);
  });

  function createDummyEvent() {
    let currentTime = new Date();
    let dummyEvent = new IncomingEvent();
    dummyEvent.summary = 'summary event';
    dummyEvent.serviceName = 'service name';
    dummyEvent.ttl = 10;
    dummyEvent.logType = IncomingEventLogType.ON;
    dummyEvent.eventData = {one: 'two', three: 'four'};
    dummyEvent.eventTime = new Date();
    return {currentTime, dummyEvent};
  }

  function verifyPersistedEvent(savedEvent: IncomingEvent, currentTime) {
    expect(+savedEvent.id).toBeGreaterThan(0);
    expect(savedEvent.createdAt.getTime()).toBeGreaterThanOrEqual(currentTime.getTime());
    expect(savedEvent.updatedAt.getTime()).toBeGreaterThanOrEqual(currentTime.getTime());
    expect(savedEvent.eventTime.getTime()).toBeGreaterThanOrEqual(currentTime.getTime());
    expect(savedEvent.summary).toBe('summary event');
    expect(savedEvent.serviceName).toBe('service name');
    expect(savedEvent.ttl).toBe(10);
    expect(savedEvent.logType).toBe(IncomingEventLogType.ON);
    expect(savedEvent.eventData['one']).toBe('two');
    expect(savedEvent.eventData['three']).toBe('four');
  }
});
