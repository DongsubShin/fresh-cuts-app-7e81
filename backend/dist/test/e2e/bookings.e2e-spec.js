"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const common_1 = require("@nestjs/common");
const request = require("supertest");
const app_module_1 = require("../../src/app.module");
const booking_entity_1 = require("../../src/modules/bookings/entities/booking.entity");
describe('BookingController (e2e)', () => {
    let app;
    beforeAll(async () => {
        const moduleFixture = await testing_1.Test.createTestingModule({
            imports: [app_module_1.AppModule],
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
                .expect(common_1.HttpStatus.CREATED)
                .expect((res) => {
                expect(res.body.data.status).toEqual(booking_entity_1.BookingStatus.PENDING);
                expect(res.body.data.barberId).toEqual(createBookingDto.barberId);
            });
        });
        it('GIVEN missing fields WHEN creating a booking THEN return 400 Bad Request', () => {
            return request(app.getHttpServer())
                .post('/bookings')
                .send({ barberId: 'invalid-uuid' })
                .expect(common_1.HttpStatus.BAD_REQUEST);
        });
    });
    afterAll(async () => {
        await app.close();
    });
});
//# sourceMappingURL=bookings.e2e-spec.js.map