import { Entity, Column, Index } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { RoleEnum } from '../enums/role.enum';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column({ name: 'email', unique: true })
  @Index('idx_user_email', { unique: true })
  email: string;

  @Column({ name: 'password', select: false })
  password: string;

  @Column({ name: 'full_name' })
  fullName: string;

  @Column({
    type: 'enum',
    enum: RoleEnum,
    default: RoleEnum.CLIENT,
  })
  role: RoleEnum;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;
}