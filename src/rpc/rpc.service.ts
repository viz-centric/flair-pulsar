import {Injectable, Logger} from '@nestjs/common';
import {ConfigService} from "../config/config.service";
import * as protoLoader from '@grpc/proto-loader';
import * as grpc from 'grpc';

@Injectable()
export class RpcService {

    private static readonly PULSE_PROTO: string = './src/resources/proto';
    private pulsarMessagesPackage: Object;

    constructor(private readonly configService: ConfigService) {
        let packageDefinition = protoLoader.loadSync(
            `${RpcService.PULSE_PROTO}/PulsarService.proto`,
            {
                keepCase: true,
                longs: String,
                enums: String,
                defaults: true,
                oneofs: true
            });
        this.pulsarMessagesPackage = grpc.loadPackageDefinition(packageDefinition).messages['pulsar'];

        let rpcServer = this.getServer();
        rpcServer.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
        rpcServer.start();
    }

    private getServer() {
        let server = new grpc.Server();
        server.addService(this.pulsarMessagesPackage['PulsarService'].service, {
            publishPulse: this.publishPulse,
        });
        return server;
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
