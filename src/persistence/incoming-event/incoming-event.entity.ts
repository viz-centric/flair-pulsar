import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn,} from 'typeorm';
import {IncomingEventLogType} from './incoming-event-log-type';

@Entity()
export class IncomingEvent {
  @PrimaryGeneratedColumn()
  id: number;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @Column()
  summary: string;

  @Column({ type: 'timestamptz', name: 'event_time' })
  eventTime: Date;

  @Column({ name: 'service_name' })
  serviceName: string;

  @Column({ type: 'jsonb', nullable: true, name: 'event_data' })
  eventData: object;

  @Column({ type: 'text', name: 'log_type' })
  logType: IncomingEventLogType;

  @Column()
  ttl: number;
}
