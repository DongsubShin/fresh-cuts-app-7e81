import { BaseEntity } from '../../../common/entities/base.entity';
import { ClientEntity } from '../../clients/entities/client.entity';
export declare enum NotificationType {
    SMS = "SMS",
    EMAIL = "EMAIL",
    PUSH = "PUSH"
}
export declare enum NotificationStatus {
    SCHEDULED = "SCHEDULED",
    SENT = "SENT",
    FAILED = "FAILED"
}
export declare class NotificationEntity extends BaseEntity {
    clientId: string;
    client: ClientEntity;
    type: NotificationType;
    message: string;
    scheduledAt: Date;
    sentAt: Date | null;
    status: NotificationStatus;
}
