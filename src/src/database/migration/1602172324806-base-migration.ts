import {MigrationInterface, QueryRunner} from "typeorm";

export class baseMigration1602172324806 implements MigrationInterface {
    name = 'baseMigration1602172324806'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "device" ("id" character varying NOT NULL, "userId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "fcmToken" character varying NOT NULL, "type" character varying NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_a7f599b76931cfc8987efeaaed7" UNIQUE ("fcmToken"), CONSTRAINT "PK_2dc10972aa4e27c01378dad2c72" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9eb58b0b777dbc2864820228eb" ON "device" ("userId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_9eb58b0b777dbc2864820228eb"`);
        await queryRunner.query(`DROP TABLE "device"`);
    }

}
