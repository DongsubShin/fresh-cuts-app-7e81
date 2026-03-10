import { Repository } from 'typeorm';
import { QueueEntryEntity } from './entities/queue-entry.entity';
import { BaseService } from '../../core/base/base.service';
export declare class QueueService extends BaseService<QueueEntryEntity> {
    private readonly queueRepository;
    constructor(queueRepository: Repository<QueueEntryEntity>);
    addToQueue(clientId: string, barberId?: string): Promise<QueueEntryEntity>;
}
