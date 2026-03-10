import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QueueEntryEntity, QueueStatus } from './entities/queue-entry.entity';
import { BaseService } from '../../core/base/base.service';

@Injectable()
export class QueueService extends BaseService<QueueEntryEntity> {
  constructor(
    @InjectRepository(QueueEntryEntity)
    private readonly queueRepository: Repository<QueueEntryEntity>,
  ) {
    super(queueRepository, 'QueueEntry');
  }

  async addToQueue(clientId: string, barberId?: string): Promise<QueueEntryEntity> {
    const lastEntry = await this.queueRepository.findOne({
      where: { status: QueueStatus.WAITING },
      order: { position: 'DESC' },
    });

    const position = lastEntry ? lastEntry.position + 1 : 1;
    const estimatedWait = position * 20; // 20 mins per cut estimate

    const entry = this.queueRepository.create({
      clientId,
      barberId,
      position,
      estimatedWaitMinutes: estimatedWait,
      status: QueueStatus.WAITING,
    });

    return await this.queueRepository.save(entry);
  }
}