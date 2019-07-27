import {Test, TestingModule} from '@nestjs/testing';
import {RpcServerService} from './rpc-server.service';
import {RpcConfigService} from "../rpcconfig/rpc-config.service";
import {ConfigService} from "../../config/config.service";

describe('RpcServerService', () => {
  let service: RpcServerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RpcServerService, ConfigService, RpcConfigService],
    }).compile();

    service = module.get<RpcServerService>(RpcServerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
