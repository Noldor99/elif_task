import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';
import { SeederInterface } from '../seeder.interface';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { faker } from '@faker-js/faker';

@Injectable()
export class UserSeed implements SeederInterface {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async seed() {
    for (let i = 50; i > 0; i--) {
      let birthYear;
      if (i % 3 === 0) {
        birthYear = 2000;
      } else if (i % 3 === 1) {
        birthYear = 1994;
      } else {
        birthYear = 2010;
      }

      const data = faker.date.between(`${birthYear}-01-01`, `${birthYear}-12-31`);

      const userSeed: CreateUserDto = {
        Name: faker.person.firstName(),
        email: faker.internet.email(),
        hear: 'Friends',
        birth: data,
      };

      await new Promise(resolve => setTimeout(resolve, 10));

      await this.userRepository.save(userSeed);
    }
  }
}
