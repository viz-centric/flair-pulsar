import {Test, TestingModule} from '@nestjs/testing';
import {PulseController} from './pulse.controller';
import {AppModule} from '../../app.module';

describe('Pulse Controller', () => {
  let controller: PulseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    controller = module.get<PulseController>(PulseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
