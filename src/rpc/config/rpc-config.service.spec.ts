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

  it('should not contain unknown protobuf services', function () {
    let protoPackage = service.getProtoPackage('unknown');
    expect(protoPackage).toBeUndefined();
  });

  it('should contain known PulsarService.proto messages', function () {
    expect(service.getProtoPackage('PulseRequest')).toBeDefined();
    expect(service.getProtoPackage('PulseResponse')).toBeDefined();
    expect(service.getProtoPackage('PulsarService')).toBeDefined();
  });

  it('should contain known Pulse.proto messages', function () {
    expect(service.getProtoPackage('PulseHeader')).toBeDefined();
    expect(service.getProtoPackage('PulseBody')).toBeDefined();
    expect(service.getProtoPackage('PulseConfig')).toBeDefined();
  });
});
