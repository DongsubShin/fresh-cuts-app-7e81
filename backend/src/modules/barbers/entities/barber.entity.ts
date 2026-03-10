import { Entity, Column, OneToOne, JoinColumn, OneToMany, Index } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { BookingEntity } from '../../bookings/entities/booking.entity';

@Entity('barbers')
export class BarberEntity extends BaseEntity {
  @Column({ name: 'user_id' })
  @Index('idx_barber_user_id')
  userId: string;

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ type: 'jsonb', name: 'specialties', default: [] })
  specialties: string[];

  @Column({ type: 'jsonb', name: 'working_hours', nullable: true })
  workingHours: any;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @OneToMany(() => BookingEntity, (booking) => booking.barber)
  bookings: BookingEntity[];
}