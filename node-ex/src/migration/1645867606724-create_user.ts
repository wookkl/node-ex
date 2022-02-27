import {MigrationInterface, QueryRunner} from "typeorm";

export class createUser1645867606724 implements MigrationInterface {
    name = 'createUser1645867606724'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "isStaff" boolean NOT NULL DEFAULT false, "createdAt" date NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
