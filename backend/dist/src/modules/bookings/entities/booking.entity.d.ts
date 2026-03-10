import { BaseEntity } from '../../../common/entities/base.entity';
import { BarberEntity } from '../../barbers/entities/barber.entity';
import { ClientEntity } from '../../clients/entities/client.entity';
import { ServiceEntity } from '../../services/entities/service.entity';
export declare enum BookingStatus {
    PENDING = "PENDING",
    CONFIRMED = "CONFIRMED",
    COMPLETED = "COMPLETED",
    CANCELLED = "CANCELLED",
    NOSHOW = "NOSHOW"
}
export declare class BookingEntity extends BaseEntity {
    barberId: string;
    barber: BarberEntity;
    clientId: string;
    client: ClientEntity;
    serviceId: string;
    service: ServiceEntity;
    scheduledAt: Date;
    status: BookingStatus;
}
