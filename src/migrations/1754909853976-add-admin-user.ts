import { MigrationInterface, QueryRunner } from "typeorm";
import * as bcrypt from "bcrypt";
import { Role } from "@entities/User";

export class AddAdminUser1754909853976 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const hashedPassword = await bcrypt.hash("admin@123", 10);

    await queryRunner.query(
      `
      INSERT INTO "user" 
        (id, "firstName", "lastName", email, password, mobile, role, profile, "createdAt", "updatedAt")
      VALUES 
        (uuid_generate_v4(), $1, $2, $3, $4, $5, $6, NULL, NOW(), NOW())
      `,
      [
        "Admin",
        "User",
        "admin@admin.com",
        hashedPassword,
        "12345780",
        Role.ADMIN,
      ]
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "user" WHERE email = $1`, [
      "admin@admin.com",
    ]);
  }
}
