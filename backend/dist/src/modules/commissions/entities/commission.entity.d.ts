import { BaseEntity } from '../../../common/entities/base.entity';
import { BarberEntity } from '../../barbers/entities/barber.entity';
import { BookingEntity } from '../../bookings/entities/booking.entity';
export declare class CommissionEntity extends BaseEntity {
    barberId: string;
    barber: BarberEntity;
    bookingId: string;
    booking: BookingEntity;
    amount: number;
    rate: number;
    paidAt: Date | null;
}
