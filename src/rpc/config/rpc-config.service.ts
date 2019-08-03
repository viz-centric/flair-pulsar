import {Injectable} from '@nestjs/common';
import {ConfigService} from "./../../config/config.service";
import * as protoLoader from "@grpc/proto-loader";
import * as grpc from "grpc";

@Injectable()
export class RpcConfigService {

    private static readonly PULSE_PROTO: string = './src/resources/proto';
    private pulsarMessagesPackage: any;

    constructor(private readonly configService: ConfigService) {
        let packageDefinition = protoLoader.loadSync(
            `${RpcConfigService.PULSE_PROTO}/PulsarService.proto`,
            {
                keepCase: true,
                longs: String,
                enums: String,
                defaults: true,
                oneofs: true
            });
        this.pulsarMessagesPackage = grpc.loadPackageDefinition(packageDefinition).messages['pulsar'];
    }

    getProtoService(name:string) {
        return this.getProtoPackage(name)['service'];
    }

    getProtoPackage(name: string) {
        return this.pulsarMessagesPackage[name];
    }

    createServerCredentials() {
        return grpc.ServerCredentials.createInsecure();
    }

    createClientCredentials() {
        return grpc.credentials.createInsecure();
    }

    getRpcUrl() {
        return `localhost:${this.configService.get('GRPC_PORT')}`;
    }
}
