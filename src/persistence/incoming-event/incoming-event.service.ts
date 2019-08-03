import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {IncomingEvent} from "./incoming-event.entity";

@Injectable()
export class IncomingEventService {
  constructor(@InjectRepository(IncomingEvent) private readonly incomingEventRepository: Repository<IncomingEvent>) {
  }

  findAll(): Promise<IncomingEvent[]> {
    return this.incomingEventRepository.find();
  }
}
