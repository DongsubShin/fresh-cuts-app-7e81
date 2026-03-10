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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const base_service_1 = require("../../core/base/base.service");
const booking_entity_1 = require("./entities/booking.entity");
const i18n_helper_1 = require("../../core/utils/i18n.helper");
let BookingService = class BookingService extends base_service_1.BaseService {
    constructor(bookingRepository, i18nHelper) {
        super(bookingRepository, 'Booking');
        this.bookingRepository = bookingRepository;
        this.i18nHelper = i18nHelper;
    }
    async createBooking(dto) {
        const conflict = await this.bookingRepository.findOne({
            where: {
                barberId: dto.barberId,
                scheduledAt: dto.scheduledAt,
                status: booking_entity_1.BookingStatus.CONFIRMED,
            },
        });
        if (conflict) {
            throw new common_1.BadRequestException(this.i18nHelper.t('translation.booking.error.conflict'));
        }
        const booking = this.bookingRepository.create(dto);
        return await this.bookingRepository.save(booking);
    }
    async updateStatus(id, status) {
        const booking = await this.findByIdOrFail(id);
        booking.status = status;
        return await this.bookingRepository.save(booking);
    }
};
exports.BookingService = BookingService;
exports.BookingService = BookingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(booking_entity_1.BookingEntity)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof i18n_helper_1.I18nHelper !== "undefined" && i18n_helper_1.I18nHelper) === "function" ? _b : Object])
], BookingService);
//# sourceMappingURL=booking.service.js.map