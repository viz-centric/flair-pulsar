import {Test, TestingModule} from '@nestjs/testing';
import {AppModule} from '../src/app.module';
import {Client} from "grpc";
import {RpcServerService} from "../src/rpc/server/rpc-server.service";
import {RpcClientService} from "../src/rpc/client/rpc-client.service";

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
  });

  afterEach(() => {
    rpcServerService.stop();
    rpcClientService.stop();
  });

  it('should return empty pulse when pulse request succeeded', () => {
    let request = createPulseRequest();
    rpcServerService.startServer();
    client = rpcClientService.createClient();
    return rpcClientService.publishPulse(request)
      .then((data) => {
        expect(data).toEqual({});
      })
      .catch(error => {
        expect(error).toEqual('some custom error never called');
      });
  });

  it('should return error when grpc pulse request fails', function () {
    let request = createPulseRequest();
    rpcServerService.setupHandlers({
      publishPulse: (call, callback)=> {
        callback({error: 'error name'}, null);
      }
    });
    rpcServerService.startServer();
    client = rpcClientService.createClient();
    return rpcClientService.publishPulse(request)
      .then((data) => {
        expect(data).toEqual('success should be never called');
      })
      .catch(error => {
        expect(error.code).toEqual(2);
      });
  });

  function createPulseRequest() {
    return {
      pulseHeader: {service: 'my service'},
      pulseBody: {summary: 'some summary', eventData: {custom: 'field'}},
      pulseConfig: {log: true, ttl: 111}
    };
  }
});
