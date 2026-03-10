import { BaseEntity } from '../../../common/entities/base.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { BookingEntity } from '../../bookings/entities/booking.entity';
export declare class ClientEntity extends BaseEntity {
    userId: string;
    user: UserEntity;
    phone: string;
    visitCount: number;
    notes: string | null;
    bookings: BookingEntity[];
}
