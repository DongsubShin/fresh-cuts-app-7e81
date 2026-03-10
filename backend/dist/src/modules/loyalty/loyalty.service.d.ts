import { Repository } from 'typeorm';
import { LoyaltyCardEntity } from './entities/loyalty-card.entity';
export declare class LoyaltyService {
    private readonly loyaltyRepo;
    constructor(loyaltyRepo: Repository<LoyaltyCardEntity>);
    awardPoints(clientId: string, amount: number): Promise<LoyaltyCardEntity>;
    private calculateTier;
}
