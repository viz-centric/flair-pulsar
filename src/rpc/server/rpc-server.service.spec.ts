import {Test, TestingModule} from '@nestjs/testing';
import {RpcServerService} from './rpc-server.service';
import {AppModule} from "../../app.module";

describe('RpcServerService', () => {
  let service: RpcServerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [],
    }).compile();

    service = module.get<RpcServerService>(RpcServerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
