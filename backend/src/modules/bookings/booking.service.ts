import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../core/base/base.service';
import { BookingEntity, BookingStatus } from './entities/booking.entity';
import { CreateBookingDto } from './dtos/create-booking.dto';
import { I18nHelper } from '../../core/utils/i18n.helper';

@Injectable()
export class BookingService extends BaseService<BookingEntity> {
  constructor(
    @InjectRepository(BookingEntity)
    private readonly bookingRepository: Repository<BookingEntity>,
    private readonly i18nHelper: I18nHelper,
  ) {
    super(bookingRepository, 'Booking');
  }

  async createBooking(dto: CreateBookingDto): Promise<BookingEntity> {
    // Business Logic: Check for double booking
    const conflict = await this.bookingRepository.findOne({
      where: {
        barberId: dto.barberId,
        scheduledAt: dto.scheduledAt,
        status: BookingStatus.CONFIRMED,
      },
    });

    if (conflict) {
      throw new BadRequestException(
        this.i18nHelper.t('translation.booking.error.conflict'),
      );
    }

    const booking = this.bookingRepository.create(dto);
    return await this.bookingRepository.save(booking);
  }

  async updateStatus(id: string, status: BookingStatus): Promise<BookingEntity> {
    const booking = await this.findByIdOrFail(id);
    booking.status = status;
    return await this.bookingRepository.save(booking);
  }
}