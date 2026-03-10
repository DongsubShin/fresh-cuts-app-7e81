import { Controller, Post, Body, Get, Param, Patch, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dtos/create-booking.dto';
import { BookingEntity, BookingStatus } from './entities/booking.entity';
import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';
import { RolesGuard } from '../../core/guards/roles.guard';
import { Roles } from '../../core/decorators/roles.decorator';
import { RoleEnum } from '../users/enums/role.enum';

@ApiTags('Bookings')
@Controller('bookings')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new appointment' })
  @ApiResponse({ status: 201, type: BookingEntity })
  async create(@Body() dto: CreateBookingDto) {
    return await this.bookingService.createBooking(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get booking details' })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.bookingService.findByIdOrFail(id);
  }

  @Patch(':id/status')
  @Roles(RoleEnum.BARBER, RoleEnum.ADMIN)
  @ApiOperation({ summary: 'Update booking status' })
  async updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body('status') status: BookingStatus,
  ) {
    return await this.bookingService.updateStatus(id, status);
  }
}