import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/users/user.module';
import { BookingModule } from './modules/bookings/booking.module';
import { BarberModule } from './modules/barbers/barber.module';
import { ClientModule } from './modules/clients/client.module';
import { ServiceModule } from './modules/services/service.module';
import { QueueModule } from './modules/queue/queue.module';
import { PaymentModule } from './modules/payments/payment.module';
import { LoyaltyModule } from './modules/loyalty/loyalty.module';
import { CommissionModule } from './modules/commissions/commission.module';
import { NotificationModule } from './modules/notifications/notification.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: false, // Use migrations for production
    }),
    AuthModule,
    UserModule,
    BarberModule,
    ClientModule,
    ServiceModule,
    BookingModule,
    QueueModule,
    PaymentModule,
    LoyaltyModule,
    CommissionModule,
    NotificationModule,
  ],
})
export class AppModule {}