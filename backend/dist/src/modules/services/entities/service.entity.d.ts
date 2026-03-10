import { BaseEntity } from '../../../common/entities/base.entity';
export declare class ServiceEntity extends BaseEntity {
    name: string;
    description: string | null;
    durationMinutes: number;
    price: number;
    category: string | null;
    isActive: boolean;
}
