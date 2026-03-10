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
exports.BarberEntity = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../common/entities/base.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const booking_entity_1 = require("../../bookings/entities/booking.entity");
let BarberEntity = class BarberEntity extends base_entity_1.BaseEntity {
};
exports.BarberEntity = BarberEntity;
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id' }),
    (0, typeorm_1.Index)('idx_barber_user_id'),
    __metadata("design:type", String)
], BarberEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.UserEntity),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.UserEntity)
], BarberEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', name: 'specialties', default: [] }),
    __metadata("design:type", Array)
], BarberEntity.prototype, "specialties", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', name: 'working_hours', nullable: true }),
    __metadata("design:type", Object)
], BarberEntity.prototype, "workingHours", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', default: true }),
    __metadata("design:type", Boolean)
], BarberEntity.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => booking_entity_1.BookingEntity, (booking) => booking.barber),
    __metadata("design:type", Array)
], BarberEntity.prototype, "bookings", void 0);
exports.BarberEntity = BarberEntity = __decorate([
    (0, typeorm_1.Entity)('barbers')
], BarberEntity);
//# sourceMappingURL=barber.entity.js.map