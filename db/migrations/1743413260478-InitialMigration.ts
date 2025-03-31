import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1743413260478 implements MigrationInterface {
  name = 'InitialMigration1743413260478';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."users_role_enum" AS ENUM('customer', 'vendor', 'admin')`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "firstName" text NOT NULL, "lastName" text NOT NULL, "bio" text, "phoneNumber" text NOT NULL, "email" text NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'customer', "hashPassword" text NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "deactivatedAt" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_1e3d0240b49c40521aaeb953293" UNIQUE ("phoneNumber"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_c61c95b9cc05ef51e5f9557f019" UNIQUE ("hashPassword"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
  }
}
