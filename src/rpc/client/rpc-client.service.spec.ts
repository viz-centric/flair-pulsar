import {Test, TestingModule} from '@nestjs/testing';
import {RpcClientService} from './rpc-client.service';
import {ConfigService} from '../../config/config.service';
import {RpcConfigService} from '../config/rpc-config.service';

describe('RpcClientService', () => {
  let service: RpcClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RpcConfigService, RpcClientService, ConfigService],
    }).compile();

    service = module.get<RpcClientService>(RpcClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
