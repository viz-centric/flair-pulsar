import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {IncomingEventLogType} from "./incoming-event-log-type";

@Entity()
export class IncomingEvent {
  @PrimaryGeneratedColumn()
  id: number;

  @UpdateDateColumn({type: 'timestamptz'})
  updatedAt: Date;

  @CreateDateColumn({type: 'timestamptz'})
  createdAt: Date;

  @Column()
  summary: string;

  @Column({type: 'timestamptz'})
  eventTime: Date;

  @Column()
  serviceName: string;

  @Column({type: 'jsonb', nullable: true})
  eventData: object;

  @Column('text')
  logType: IncomingEventLogType;

  @Column()
  ttl: number;
}
