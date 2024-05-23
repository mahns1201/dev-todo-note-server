import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RepoEntity } from './repo.entity';
import { CreateRepoDto } from './dto/create-repo.dto';

@Injectable()
export class RepoDao {
  constructor(
    @InjectRepository(RepoEntity)
    private repoRepository: Repository<RepoEntity>,
  ) {}

  async create(dto: CreateRepoDto): Promise<RepoEntity> {
    const repo = this.repoRepository.create(dto);
    await this.repoRepository.save(repo);

    return repo;
  }

  async findById(id: number, userId: number): Promise<RepoEntity> {
    return await this.repoRepository.findOne({
      where: {
        id,
        userId,
        deletedAt: null,
      },
    });
  }

  async findAllByUserId(userId: number): Promise<RepoEntity[]> {
    return await this.repoRepository.find({
      where: { userId, deletedAt: null },
    });
  }
}
