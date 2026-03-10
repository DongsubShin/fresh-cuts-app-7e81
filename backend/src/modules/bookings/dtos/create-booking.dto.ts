import { IsUUID, IsEnum, IsISO8601, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BookingStatus } from '../entities/booking.entity';

export class CreateBookingDto {
  @ApiProperty({ example: 'uuid-barber' })
  @IsUUID()
  @IsNotEmpty()
  barberId: string;

  @ApiProperty({ example: 'uuid-client' })
  @IsUUID()
  @IsNotEmpty()
  clientId: string;

  @ApiProperty({ example: 'uuid-service' })
  @IsUUID()
  @IsNotEmpty()
  serviceId: string;

  @ApiProperty({ example: '2023-12-25T10:00:00Z' })
  @IsISO8601()
  @IsNotEmpty()
  scheduledAt: Date;

  @ApiProperty({ enum: BookingStatus, required: false })
  @IsEnum(BookingStatus)
  status?: BookingStatus;
}