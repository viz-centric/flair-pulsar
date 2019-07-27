import {Test, TestingModule} from '@nestjs/testing';
import {RpcConfigService} from './rpc-config.service';
import {ConfigService} from "../../config/config.service";

describe('RpcConfigService', () => {
  let service: RpcConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RpcConfigService, ConfigService],
    }).compile();

    service = module.get<RpcConfigService>(RpcConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
