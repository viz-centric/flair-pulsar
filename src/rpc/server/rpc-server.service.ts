import {Injectable, Logger} from '@nestjs/common';
import * as grpc from 'grpc';
import {ConfigService} from "./../../config/config.service";
import {RpcConfigService} from "./../rpcconfig/rpc-config.service";

@Injectable()
export class RpcServerService {

    private protoMapping = {
        publishPulse: this.publishPulse,
    };

    constructor(private readonly configService: ConfigService,
                private readonly rpcConfig: RpcConfigService) {
        let server = new grpc.Server();
        let credentials = this.rpcConfig.createServerCredentials();
        let protoService = this.rpcConfig.getProtoService('PulsarService');
        let rpcUrl = this.rpcConfig.getRpcUrl();
        server.addService(protoService, this.protoMapping);
        server.bind(rpcUrl, credentials);
        server.start();
    }

    /**
     * @param {EventEmitter} call Call object for the handler to process
     * @param {function(Error, feature)} callback Response callback
     */
    private publishPulse(call, callback) {
        let request = call.request;
        let pulseHeader = request.pulseHeader;
        let pulseBody = request.pulseBody;
        let pulseConfig = request.pulseConfig;

        Logger.log(`Publish pulse grpc handler called ${pulseHeader} ${pulseConfig} ${pulseBody}`);

        callback(null, request);
    }

}
