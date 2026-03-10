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
exports.LoyaltyCardEntity = exports.LoyaltyTier = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../common/entities/base.entity");
const client_entity_1 = require("../../clients/entities/client.entity");
var LoyaltyTier;
(function (LoyaltyTier) {
    LoyaltyTier["BRONZE"] = "BRONZE";
    LoyaltyTier["SILVER"] = "SILVER";
    LoyaltyTier["GOLD"] = "GOLD";
    LoyaltyTier["PLATINUM"] = "PLATINUM";
})(LoyaltyTier || (exports.LoyaltyTier = LoyaltyTier = {}));
let LoyaltyCardEntity = class LoyaltyCardEntity extends base_entity_1.BaseEntity {
};
exports.LoyaltyCardEntity = LoyaltyCardEntity;
__decorate([
    (0, typeorm_1.Column)({ name: 'client_id' }),
    (0, typeorm_1.Index)('idx_loyalty_client_id', { unique: true }),
    __metadata("design:type", String)
], LoyaltyCardEntity.prototype, "clientId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => client_entity_1.ClientEntity),
    (0, typeorm_1.JoinColumn)({ name: 'client_id' }),
    __metadata("design:type", client_entity_1.ClientEntity)
], LoyaltyCardEntity.prototype, "client", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'points', type: 'int', default: 0 }),
    __metadata("design:type", Number)
], LoyaltyCardEntity.prototype, "points", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: LoyaltyTier,
        default: LoyaltyTier.BRONZE,
    }),
    __metadata("design:type", String)
], LoyaltyCardEntity.prototype, "tier", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', name: 'rewards_claimed', default: [] }),
    __metadata("design:type", Array)
], LoyaltyCardEntity.prototype, "rewardsClaimed", void 0);
exports.LoyaltyCardEntity = LoyaltyCardEntity = __decorate([
    (0, typeorm_1.Entity)('loyalty_cards')
], LoyaltyCardEntity);
//# sourceMappingURL=loyalty-card.entity.js.map