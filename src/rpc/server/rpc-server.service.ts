import {Injectable} from '@nestjs/common';
import * as grpc from 'grpc';
import {ConfigService} from "./../../config/config.service";
import {msg} from "../../utils/logging/logging.service";
import {RpcConfigService} from "../config/rpc-config.service";

@Injectable()
export class RpcServerService {

    private protoMapping = {
        publishPulse: this.publishPulse,
    };
    private server: grpc.Server;

    constructor(private readonly configService: ConfigService,
                private readonly rpcConfig: RpcConfigService) {
    }

    startServer() {
        this.server = new grpc.Server();
        let credentials = this.rpcConfig.createServerCredentials();
        let protoService = this.rpcConfig.getProtoService('PulsarService');
        let rpcUrl = this.rpcConfig.getRpcUrl();
        this.server.addService(protoService, this.protoMapping);
        this.server.bind(rpcUrl, credentials);
        this.server.start();

        msg(`gRPC server created on ${rpcUrl}`);

        return this.server;
    }

    setupHandlers(map) {
        this.protoMapping = map;
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

        msg(`Publish pulse grpc handler called`, {pulseBody, pulseHeader, pulseConfig});

        callback(null, {});
    }

    stop() {
        this.server.forceShutdown();
    }
}
