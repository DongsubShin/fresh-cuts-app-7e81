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
exports.ClientEntity = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../common/entities/base.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const booking_entity_1 = require("../../bookings/entities/booking.entity");
let ClientEntity = class ClientEntity extends base_entity_1.BaseEntity {
};
exports.ClientEntity = ClientEntity;
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id' }),
    (0, typeorm_1.Index)('idx_client_user_id'),
    __metadata("design:type", String)
], ClientEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.UserEntity),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.UserEntity)
], ClientEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'phone' }),
    (0, typeorm_1.Index)('idx_client_phone'),
    __metadata("design:type", String)
], ClientEntity.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'visit_count', default: 0 }),
    __metadata("design:type", Number)
], ClientEntity.prototype, "visitCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', name: 'notes', nullable: true }),
    __metadata("design:type", String)
], ClientEntity.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => booking_entity_1.BookingEntity, (booking) => booking.client),
    __metadata("design:type", Array)
], ClientEntity.prototype, "bookings", void 0);
exports.ClientEntity = ClientEntity = __decorate([
    (0, typeorm_1.Entity)('clients')
], ClientEntity);
//# sourceMappingURL=client.entity.js.map