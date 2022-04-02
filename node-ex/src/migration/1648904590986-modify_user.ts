import {MigrationInterface, QueryRunner} from "typeorm";

export class modifyUser1648904590986 implements MigrationInterface {
    name = 'modifyUser1648904590986'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_9466682df91534dd95e4dbaa616"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_9466682df91534dd95e4dbaa616"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "profileId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "profileId" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_9466682df91534dd95e4dbaa616" UNIQUE ("profileId")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_9466682df91534dd95e4dbaa616" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
