import { Repository } from 'typeorm';
import { BaseService } from '../../core/base/base.service';
import { BookingEntity, BookingStatus } from './entities/booking.entity';
import { CreateBookingDto } from './dtos/create-booking.dto';
import { I18nHelper } from '../../core/utils/i18n.helper';
export declare class BookingService extends BaseService<BookingEntity> {
    private readonly bookingRepository;
    private readonly i18nHelper;
    constructor(bookingRepository: Repository<BookingEntity>, i18nHelper: I18nHelper);
    createBooking(dto: CreateBookingDto): Promise<BookingEntity>;
    updateStatus(id: string, status: BookingStatus): Promise<BookingEntity>;
}
