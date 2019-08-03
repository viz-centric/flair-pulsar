import {Test, TestingModule} from '@nestjs/testing';
import {RpcServerService} from './rpc-server.service';
import {ConfigService} from "../../config/config.service";
import {RpcConfigService} from "../config/rpc-config.service";

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
