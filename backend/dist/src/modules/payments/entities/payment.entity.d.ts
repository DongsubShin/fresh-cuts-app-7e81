import { BaseEntity } from '../../../common/entities/base.entity';
import { BookingEntity } from '../../bookings/entities/booking.entity';
export declare enum PaymentStatus {
    PENDING = "PENDING",
    SUCCEEDED = "SUCCEEDED",
    FAILED = "FAILED",
    REFUNDED = "REFUNDED"
}
export declare class PaymentEntity extends BaseEntity {
    bookingId: string;
    booking: BookingEntity;
    amount: number;
    stripeId: string | null;
    status: PaymentStatus;
}
