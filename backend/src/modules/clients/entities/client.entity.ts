import { Entity, Column, OneToOne, JoinColumn, Index, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { BookingEntity } from '../../bookings/entities/booking.entity';

@Entity('clients')
export class ClientEntity extends BaseEntity {
  @Column({ name: 'user_id' })
  @Index('idx_client_user_id')
  userId: string;

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ name: 'phone' })
  @Index('idx_client_phone')
  phone: string;

  @Column({ name: 'visit_count', default: 0 })
  visitCount: number;

  @Column({ type: 'text', name: 'notes', nullable: true })
  notes: string | null;

  @OneToMany(() => BookingEntity, (booking) => booking.client)
  bookings: BookingEntity[];
}