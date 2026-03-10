import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { BarberEntity } from '../../barbers/entities/barber.entity';
import { ClientEntity } from '../../clients/entities/client.entity';
import { ServiceEntity } from '../../services/entities/service.entity';

export enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  NOSHOW = 'NOSHOW',
}

@Entity('bookings')
export class BookingEntity extends BaseEntity {
  @Column({ name: 'barber_id' })
  @Index('idx_booking_barber_id')
  barberId: string;

  @ManyToOne(() => BarberEntity, (barber) => barber.bookings)
  @JoinColumn({ name: 'barber_id' })
  barber: BarberEntity;

  @Column({ name: 'client_id' })
  @Index('idx_booking_client_id')
  clientId: string;

  @ManyToOne(() => ClientEntity, (client) => client.bookings)
  @JoinColumn({ name: 'client_id' })
  client: ClientEntity;

  @Column({ name: 'service_id' })
  serviceId: string;

  @ManyToOne(() => ServiceEntity)
  @JoinColumn({ name: 'service_id' })
  service: ServiceEntity;

  @Column({ name: 'scheduled_at', type: 'timestamp' })
  @Index('idx_booking_scheduled_at')
  scheduledAt: Date;

  @Column({
    type: 'enum',
    enum: BookingStatus,
    default: BookingStatus.PENDING,
  })
  status: BookingStatus;
}