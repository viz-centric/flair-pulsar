import {Test, TestingModule} from '@nestjs/testing';
import {AppModule} from '../src/app.module';
import {RpcClientService} from "../src/rpc/rpcclient/rpc-client.service";
import {Client} from "grpc";
import {RpcServerService} from "../src/rpc/server/rpc-server.service";

describe('AppController (e2e)', () => {
  let app;
  let rpcClientService: RpcClientService;
  let rpcServerService: RpcServerService;
  let client: Client;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: []
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    rpcServerService = moduleFixture.get<RpcServerService>(RpcServerService);
    rpcClientService = moduleFixture.get<RpcClientService>(RpcClientService);

    rpcServerService.startServer();
    client = rpcClientService.createClient();
  });

  afterEach(() => {
    rpcServerService.stop();
    rpcClientService.stop();
  });

  it('should return empty pulse when pulse request succeeded', () => {
    let request = {
      pulseHeader: {service: 'my service'},
      pulseBody: {summary: 'some summary', eventData: {custom: 'field'}},
      pulseConfig: {log: true, ttl: 111}
    };
    return rpcClientService.publishPulse(request)
      .catch(error => {
        expect(error).toEqual('some custom error never called');
      })
      .then((data) => {
        expect(data).toEqual({});
      });
  });
});
