import "reflect-metadata";
import "dotenv/config";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5433"),
  username: process.env.DB_USERNAME, // change as per your local DB
  password: process.env.DB_PASSWORD, // change as per your local DB
  database: process.env.DB_DATABASE, // change as per your local DB
  entities: ["src/entities/*.ts"],
  migrations: ["src/migrations/**/*.ts"],
  synchronize: false, // Always false when using migrations
});
