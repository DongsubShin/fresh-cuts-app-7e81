import { Repository } from 'typeorm';
import { CommissionEntity } from './entities/commission.entity';
import { BookingEntity } from '../bookings/entities/booking.entity';
export declare class CommissionService {
    private readonly commissionRepo;
    constructor(commissionRepo: Repository<CommissionEntity>);
    calculateForBooking(booking: BookingEntity, rate?: number): Promise<CommissionEntity>;
    getBarberEarnings(barberId: string): Promise<any>;
}
