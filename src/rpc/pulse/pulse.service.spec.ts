import {Test, TestingModule} from '@nestjs/testing';
import {PulseService} from './pulse.service';
import {AppModule} from "../../app.module";

describe('PulseService', () => {
  let service: PulseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [],
    }).compile();

    service = module.get<PulseService>(PulseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
