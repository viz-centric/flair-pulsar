import {Injectable} from '@nestjs/common';
import {Connection} from "typeorm";

@Injectable()
export class DatabaseService {

  constructor(
    private readonly connection: Connection
  ) {
  }

  async close() {
    await this.connection.close();
  }

  isConnected(): boolean {
    return this.connection.isConnected;
  }
}
