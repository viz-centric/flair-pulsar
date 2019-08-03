import {Injectable} from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

@Injectable()
export class ConfigService {
    private readonly envConfig: { [key: string]: string };

    constructor() {
        let filePath = `./config/${process.env.NODE_ENV}.env`;
        this.envConfig = dotenv.parse(fs.readFileSync(filePath))
    }

    get(key: string): string {
        return this.envConfig[key];
    }
}
