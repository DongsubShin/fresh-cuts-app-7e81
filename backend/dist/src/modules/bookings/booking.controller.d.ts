import { BookingService } from './booking.service';
import { CreateBookingDto } from './dtos/create-booking.dto';
import { BookingEntity, BookingStatus } from './entities/booking.entity';
export declare class BookingController {
    private readonly bookingService;
    constructor(bookingService: BookingService);
    create(dto: CreateBookingDto): Promise<BookingEntity>;
    findOne(id: string): Promise<any>;
    updateStatus(id: string, status: BookingStatus): Promise<BookingEntity>;
}
