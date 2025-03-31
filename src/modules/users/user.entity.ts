import { BaseEntity } from 'src/shared/entities/base.entity';
import { Entity, Column } from 'typeorm';

enum UserRole {
  CUSTOMER = 'customer',
  VENDOR = 'vendor',
  ADMIN = 'admin',
}

@Entity('users')
export class User extends BaseEntity {
  @Column('text')
  firstName: string;

  @Column('text')
  lastName: string;

  @Column({ type: 'text', nullable: true })
  bio?: string;

  @Column({ type: 'text', unique: true })
  phoneNumber?: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.CUSTOMER })
  role: UserRole;

  @Column({ type: 'text', unique: true })
  hashPassword: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'timestamptz', nullable: true })
  deactivatedAt?: Date;
}
