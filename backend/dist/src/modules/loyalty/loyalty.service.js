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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoyaltyService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const loyalty_card_entity_1 = require("./entities/loyalty-card.entity");
let LoyaltyService = class LoyaltyService {
    constructor(loyaltyRepo) {
        this.loyaltyRepo = loyaltyRepo;
    }
    async awardPoints(clientId, amount) {
        let card = await this.loyaltyRepo.findOne({ where: { clientId } });
        if (!card) {
            card = this.loyaltyRepo.create({ clientId, points: 0 });
        }
        card.points += Math.floor(amount);
        card.tier = this.calculateTier(card.points);
        return await this.loyaltyRepo.save(card);
    }
    calculateTier(points) {
        if (points >= 1000)
            return loyalty_card_entity_1.LoyaltyTier.PLATINUM;
        if (points >= 500)
            return loyalty_card_entity_1.LoyaltyTier.GOLD;
        if (points >= 200)
            return loyalty_card_entity_1.LoyaltyTier.SILVER;
        return loyalty_card_entity_1.LoyaltyTier.BRONZE;
    }
};
exports.LoyaltyService = LoyaltyService;
exports.LoyaltyService = LoyaltyService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(loyalty_card_entity_1.LoyaltyCardEntity)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], LoyaltyService);
//# sourceMappingURL=loyalty.service.js.map