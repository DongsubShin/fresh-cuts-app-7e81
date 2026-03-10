"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingEntity = exports.BookingStatus = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../common/entities/base.entity");
const barber_entity_1 = require("../../barbers/entities/barber.entity");
const client_entity_1 = require("../../clients/entities/client.entity");
const service_entity_1 = require("../../services/entities/service.entity");
var BookingStatus;
(function (BookingStatus) {
    BookingStatus["PENDING"] = "PENDING";
    BookingStatus["CONFIRMED"] = "CONFIRMED";
    BookingStatus["COMPLETED"] = "COMPLETED";
    BookingStatus["CANCELLED"] = "CANCELLED";
    BookingStatus["NOSHOW"] = "NOSHOW";
})(BookingStatus || (exports.BookingStatus = BookingStatus = {}));
let BookingEntity = class BookingEntity extends base_entity_1.BaseEntity {
};
exports.BookingEntity = BookingEntity;
__decorate([
    (0, typeorm_1.Column)({ name: 'barber_id' }),
    (0, typeorm_1.Index)('idx_booking_barber_id'),
    __metadata("design:type", String)
], BookingEntity.prototype, "barberId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => barber_entity_1.BarberEntity, (barber) => barber.bookings),
    (0, typeorm_1.JoinColumn)({ name: 'barber_id' }),
    __metadata("design:type", barber_entity_1.BarberEntity)
], BookingEntity.prototype, "barber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'client_id' }),
    (0, typeorm_1.Index)('idx_booking_client_id'),
    __metadata("design:type", String)
], BookingEntity.prototype, "clientId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => client_entity_1.ClientEntity, (client) => client.bookings),
    (0, typeorm_1.JoinColumn)({ name: 'client_id' }),
    __metadata("design:type", client_entity_1.ClientEntity)
], BookingEntity.prototype, "client", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'service_id' }),
    __metadata("design:type", String)
], BookingEntity.prototype, "serviceId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => service_entity_1.ServiceEntity),
    (0, typeorm_1.JoinColumn)({ name: 'service_id' }),
    __metadata("design:type", service_entity_1.ServiceEntity)
], BookingEntity.prototype, "service", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'scheduled_at', type: 'timestamp' }),
    (0, typeorm_1.Index)('idx_booking_scheduled_at'),
    __metadata("design:type", Date)
], BookingEntity.prototype, "scheduledAt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: BookingStatus,
        default: BookingStatus.PENDING,
    }),
    __metadata("design:type", String)
], BookingEntity.prototype, "status", void 0);
exports.BookingEntity = BookingEntity = __decorate([
    (0, typeorm_1.Entity)('bookings')
], BookingEntity);
//# sourceMappingURL=booking.entity.js.map