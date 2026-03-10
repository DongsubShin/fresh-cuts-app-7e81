import { Entity, Column, OneToOne, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { ClientEntity } from '../../clients/entities/client.entity';

export enum LoyaltyTier {
  BRONZE = 'BRONZE',
  SILVER = 'SILVER',
  GOLD = 'GOLD',
  PLATINUM = 'PLATINUM',
}

@Entity('loyalty_cards')
export class LoyaltyCardEntity extends BaseEntity {
  @Column({ name: 'client_id' })
  @Index('idx_loyalty_client_id', { unique: true })
  clientId: string;

  @OneToOne(() => ClientEntity)
  @JoinColumn({ name: 'client_id' })
  client: ClientEntity;

  @Column({ name: 'points', type: 'int', default: 0 })
  points: number;

  @Column({
    type: 'enum',
    enum: LoyaltyTier,
    default: LoyaltyTier.BRONZE,
  })
  tier: LoyaltyTier;

  @Column({ type: 'jsonb', name: 'rewards_claimed', default: [] })
  rewardsClaimed: string[];
}