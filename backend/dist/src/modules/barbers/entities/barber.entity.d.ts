import { BaseEntity } from '../../../common/entities/base.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { BookingEntity } from '../../bookings/entities/booking.entity';
export declare class BarberEntity extends BaseEntity {
    userId: string;
    user: UserEntity;
    specialties: string[];
    workingHours: any;
    isActive: boolean;
    bookings: BookingEntity[];
}
