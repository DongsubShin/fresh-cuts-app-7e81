import { BaseEntity } from '../../../common/entities/base.entity';
import { ClientEntity } from '../../clients/entities/client.entity';
export declare enum LoyaltyTier {
    BRONZE = "BRONZE",
    SILVER = "SILVER",
    GOLD = "GOLD",
    PLATINUM = "PLATINUM"
}
export declare class LoyaltyCardEntity extends BaseEntity {
    clientId: string;
    client: ClientEntity;
    points: number;
    tier: LoyaltyTier;
    rewardsClaimed: string[];
}
