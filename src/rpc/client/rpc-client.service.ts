import {Injectable} from '@nestjs/common';
import {Client} from "grpc";
import {msg} from "../../utils/logging/logging.service";
import {RpcConfigService} from "../config/rpc-config.service";

@Injectable()
export class RpcClientService {
    private client: Client;

    constructor(private readonly rpcConfig:RpcConfigService) {
    }

    createClient() {
        let ProtoPackage = this.rpcConfig.getProtoPackage('PulsarService');
        let serverCredentials = this.rpcConfig.createClientCredentials();
        let rpcUrl = this.rpcConfig.getRpcUrl();
        this.client = new ProtoPackage(rpcUrl, serverCredentials);

        msg(`gRPC client created on ${rpcUrl}`);
        return this.client;
    }

    publishPulse(publishPulseRequest:Object) {
        return new Promise((success, reject) => {
            let callback = (error, data) => {
                if (error) {
                    reject(error);
                } else {
                    success(data);
                }
            };
            this.client['publishPulse'](publishPulseRequest, callback);
        });
    }

    stop() {
        this.client.close();
    }
}
