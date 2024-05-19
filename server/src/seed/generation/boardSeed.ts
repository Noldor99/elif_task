import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from '../../board/board.entity';
import { SeederInterface } from '../seeder.interface';
import { CreateBoardDto } from '../../board/dto/create-board.dto';
import { faker } from '@faker-js/faker';

@Injectable()
export class BoardSeed implements SeederInterface {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
  ) { }

  async seed() {

    for (let i = 12; i > 0; i--) {

      const boardSeed: CreateBoardDto = {
        title: faker.lorem.words(),
        description: faker.lorem.paragraph(),
        organizer: faker.person.firstName(),
        eventDate: new Date()
      };

      await new Promise(resolve => setTimeout(resolve, 10));

      await this.boardRepository.save(boardSeed);
    }
  }
}
