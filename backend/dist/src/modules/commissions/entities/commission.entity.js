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
exports.CommissionEntity = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../common/entities/base.entity");
const barber_entity_1 = require("../../barbers/entities/barber.entity");
const booking_entity_1 = require("../../bookings/entities/booking.entity");
let CommissionEntity = class CommissionEntity extends base_entity_1.BaseEntity {
};
exports.CommissionEntity = CommissionEntity;
__decorate([
    (0, typeorm_1.Column)({ name: 'barber_id' }),
    (0, typeorm_1.Index)('idx_commission_barber_id'),
    __metadata("design:type", String)
], CommissionEntity.prototype, "barberId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => barber_entity_1.BarberEntity),
    (0, typeorm_1.JoinColumn)({ name: 'barber_id' }),
    __metadata("design:type", barber_entity_1.BarberEntity)
], CommissionEntity.prototype, "barber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'booking_id' }),
    (0, typeorm_1.Index)('idx_commission_booking_id', { unique: true }),
    __metadata("design:type", String)
], CommissionEntity.prototype, "bookingId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => booking_entity_1.BookingEntity),
    (0, typeorm_1.JoinColumn)({ name: 'booking_id' }),
    __metadata("design:type", booking_entity_1.BookingEntity)
], CommissionEntity.prototype, "booking", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'amount', type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], CommissionEntity.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'rate', type: 'decimal', precision: 5, scale: 2 }),
    __metadata("design:type", Number)
], CommissionEntity.prototype, "rate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'paid_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], CommissionEntity.prototype, "paidAt", void 0);
exports.CommissionEntity = CommissionEntity = __decorate([
    (0, typeorm_1.Entity)('commissions')
], CommissionEntity);
//# sourceMappingURL=commission.entity.js.map