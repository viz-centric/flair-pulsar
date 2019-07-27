import {Injectable} from '@nestjs/common';
import {RpcConfigService} from "../rpcconfig/rpc-config.service";
import {Client} from "grpc";

@Injectable()
export class RpcClientService {
    private client: Client;

    constructor(private readonly rpcConfig:RpcConfigService) {
        let ProtoPackage = rpcConfig.getProtoPackage('PulsarService');
        let serverCredentials = rpcConfig.createClientCredentials();
        let rpcUrl = rpcConfig.getRpcUrl();
        this.client = new ProtoPackage(rpcUrl, serverCredentials);
    }

    getClient() {
        return this.client;
    }
}
