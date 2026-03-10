import { Entity, Column, ManyToOne, OneToOne, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { BarberEntity } from '../../barbers/entities/barber.entity';
import { BookingEntity } from '../../bookings/entities/booking.entity';

@Entity('commissions')
export class CommissionEntity extends BaseEntity {
  @Column({ name: 'barber_id' })
  @Index('idx_commission_barber_id')
  barberId: string;

  @ManyToOne(() => BarberEntity)
  @JoinColumn({ name: 'barber_id' })
  barber: BarberEntity;

  @Column({ name: 'booking_id' })
  @Index('idx_commission_booking_id', { unique: true })
  bookingId: string;

  @OneToOne(() => BookingEntity)
  @JoinColumn({ name: 'booking_id' })
  booking: BookingEntity;

  @Column({ name: 'amount', type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ name: 'rate', type: 'decimal', precision: 5, scale: 2 })
  rate: number;

  @Column({ name: 'paid_at', type: 'timestamp', nullable: true })
  paidAt: Date | null;
}