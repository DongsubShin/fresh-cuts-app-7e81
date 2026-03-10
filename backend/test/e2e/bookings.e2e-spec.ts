import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { BookingStatus } from '../../src/modules/bookings/entities/booking.entity';

describe('BookingController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('POST /bookings', () => {
    it('GIVEN valid booking data WHEN creating a booking THEN return 201 and booking object', () => {
      const createBookingDto = {
        barberId: '36066761-0000-0000-0000-000000000000',
        clientId: '36066761-1111-0000-0000-000000000000',
        serviceId: '36066761-2222-0000-0000-000000000000',
        scheduledAt: new Date(Date.now() + 86400000).toISOString(),
      };

      return request(app.getHttpServer())
        .post('/bookings')
        .send(createBookingDto)
        .expect(HttpStatus.CREATED)
        .expect((res) => {
          expect(res.body.data.status).toEqual(BookingStatus.PENDING);
          expect(res.body.data.barberId).toEqual(createBookingDto.barberId);
        });
    });

    it('GIVEN missing fields WHEN creating a booking THEN return 400 Bad Request', () => {
      return request(app.getHttpServer())
        .post('/bookings')
        .send({ barberId: 'invalid-uuid' })
        .expect(HttpStatus.BAD_REQUEST);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});