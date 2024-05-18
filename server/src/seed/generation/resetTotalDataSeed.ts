import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { Role } from 'src/roles/role.entity';
// import { User } from 'src/user/user.entity';

import { Repository } from 'typeorm';

@Injectable()
export class ResetTotalDataSeed {
  constructor(
    // @InjectRepository(User) private userRepository: Repository<User>,
    // @InjectRepository(Role) private roleRepository: Repository<Role>,
  ) { }

  async seed(): Promise<void> {
    const repositories = [
      // this.contentRepository,
      // this.portfolioRepository,
    ];

    try {
      for (const repository of repositories) {
        const items = await repository.find();
        for (const item of items) {
          //@ts-ignore
          await repository.remove(item);
        }
      }
    } catch (error) {
      console.error('Помилка під час видалення записів:', error);
      throw error;
    }
  }
}
