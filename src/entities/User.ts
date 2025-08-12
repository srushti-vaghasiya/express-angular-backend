import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  AfterLoad,
} from "typeorm";

export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ unique: true })
  mobile: string;

  @Column({ type: "enum", enum: Role, default: Role.USER })
  role: Role;

  @Column({ nullable: true })
  profile: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  profileUrl?: string;

  @AfterLoad()
  setProfileUrl() {
    if (this.profile) {
      this.profileUrl = `${process.env.BASE_URL}/uploads/${this.profile}`;
    }
  }
}
