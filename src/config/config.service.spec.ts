import {Test, TestingModule} from '@nestjs/testing';
import {ConfigService} from './config.service';

describe('ConfigService', () => {
  let service: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigService],
    }).compile();

    service = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return grpc port from config', function() {
    expect(service.get('GRPC_PORT')).toBe('5031');
  });

  it('should return undefined for non existent config key', function() {
    expect(service.get('UNKNOWN KEY')).toBeUndefined();
  });
});
