import {MigrationInterface, QueryRunner} from "typeorm";

export class init1564823993197 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
        CREATE TABLE incoming_event
        (
            id           BIGSERIAL PRIMARY KEY NOT NULL,
            created_at   TIMESTAMPTZ           NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at   TIMESTAMPTZ           NOT NULL DEFAULT CURRENT_TIMESTAMP,
            summary      TEXT                  NOT NULL,
            event_time   TIMESTAMPTZ           NOT NULL,
            service_name VARCHAR(255)          NOT NULL,
            log_type     VARCHAR(30)           NOT NULL,
            ttl          integer               NOT NULL,
            event_data   JSONB
        )
    `);
    await queryRunner.query(`CREATE INDEX idx_incoming_event_event_time ON incoming_event (event_time)`);
    await queryRunner.query(`CREATE INDEX idx_incoming_event_service_name ON incoming_event (service_name)`);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP TABLE "incoming_event"`);
  }

}
