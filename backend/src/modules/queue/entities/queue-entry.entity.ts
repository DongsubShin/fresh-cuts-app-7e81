import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { BarberEntity } from '../../barbers/entities/barber.entity';
import { ClientEntity } from '../../clients/entities/client.entity';

export enum QueueStatus {
  WAITING = 'WAITING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

@Entity('queue_entries')
export class QueueEntryEntity extends BaseEntity {
  @Column({ name: 'client_id' })
  clientId: string;

  @ManyToOne(() => ClientEntity)
  @JoinColumn({ name: 'client_id' })
  client: ClientEntity;

  @Column({ name: 'barber_id', nullable: true })
  barberId: string | null;

  @ManyToOne(() => BarberEntity)
  @JoinColumn({ name: 'barber_id' })
  barber: BarberEntity | null;

  @Column({ name: 'position', type: 'int' })
  position: number;

  @Column({
    type: 'enum',
    enum: QueueStatus,
    default: QueueStatus.WAITING,
  })
  status: QueueStatus;

  @Column({ name: 'estimated_wait_minutes', type: 'int', default: 0 })
  estimatedWaitMinutes: number;
}