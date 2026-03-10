import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommissionEntity } from './entities/commission.entity';
import { BookingEntity } from '../bookings/entities/booking.entity';

@Injectable()
export class CommissionService {
  constructor(
    @InjectRepository(CommissionEntity)
    private readonly commissionRepo: Repository<CommissionEntity>,
  ) {}

  async calculateForBooking(booking: BookingEntity, rate: number = 0.6): Promise<CommissionEntity> {
    const amount = Number(booking.service.price) * rate;
    
    const commission = this.commissionRepo.create({
      barberId: booking.barberId,
      bookingId: booking.id,
      amount,
      rate,
    });

    return await this.commissionRepo.save(commission);
  }

  async getBarberEarnings(barberId: string) {
    return await this.commissionRepo.find({
      where: { barberId },
      relations: ['booking'],
    });
  }
}