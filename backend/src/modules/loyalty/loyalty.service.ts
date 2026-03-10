import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoyaltyCardEntity, LoyaltyTier } from './entities/loyalty-card.entity';

@Injectable()
export class LoyaltyService {
  constructor(
    @InjectRepository(LoyaltyCardEntity)
    private readonly loyaltyRepo: Repository<LoyaltyCardEntity>,
  ) {}

  async awardPoints(clientId: string, amount: number): Promise<LoyaltyCardEntity> {
    let card = await this.loyaltyRepo.findOne({ where: { clientId } });
    
    if (!card) {
      card = this.loyaltyRepo.create({ clientId, points: 0 });
    }

    card.points += Math.floor(amount);
    card.tier = this.calculateTier(card.points);
    
    return await this.loyaltyRepo.save(card);
  }

  private calculateTier(points: number): LoyaltyTier {
    if (points >= 1000) return LoyaltyTier.PLATINUM;
    if (points >= 500) return LoyaltyTier.GOLD;
    if (points >= 200) return LoyaltyTier.SILVER;
    return LoyaltyTier.BRONZE;
  }
}