import { BaseEntity } from '../../../common/entities/base.entity';
import { BarberEntity } from '../../barbers/entities/barber.entity';
import { ClientEntity } from '../../clients/entities/client.entity';
export declare enum QueueStatus {
    WAITING = "WAITING",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED",
    CANCELLED = "CANCELLED"
}
export declare class QueueEntryEntity extends BaseEntity {
    clientId: string;
    client: ClientEntity;
    barberId: string | null;
    barber: BarberEntity | null;
    position: number;
    status: QueueStatus;
    estimatedWaitMinutes: number;
}
