import {Test, TestingModule} from '@nestjs/testing';
import {IncomingEventService} from './incoming-event.service';
import {DatabaseModule} from "../database.module";

describe('IncomingEventService', () => {
  let service: IncomingEventService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
    }).compile();

    service = module.get<IncomingEventService>(IncomingEventService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
