import { BookingStatus } from '../entities/booking.entity';
export declare class CreateBookingDto {
    barberId: string;
    clientId: string;
    serviceId: string;
    scheduledAt: Date;
    status?: BookingStatus;
}
