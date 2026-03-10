import { BaseEntity } from '../../../common/entities/base.entity';
import { RoleEnum } from '../enums/role.enum';
export declare class UserEntity extends BaseEntity {
    email: string;
    password: string;
    fullName: string;
    role: RoleEnum;
    isActive: boolean;
}
