import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';
import { SeederInterface } from '../seeder.interface';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { faker } from '@faker-js/faker';
import { BoardService } from 'src/board/board.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class UserSeed implements SeederInterface {
  constructor(
    private readonly userService: UserService,
    private readonly boardService: BoardService,
  ) { }



  async seed() {

    const boardsResponse = await this.boardService.getAll({ limit: '100' });
    const boards = boardsResponse.boards;

    for (let i = 0; i < boards.length; i++) {
      const board = boards[i];


      for (let i = 2; i > 0; i--) {
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
          name: faker.person.firstName(),
          email: faker.internet.email(),
          hear: 'Friends',
          birth: data,
          boardId: board.id,
        };

        await new Promise(resolve => setTimeout(resolve, 10));

        await this.userService.create(userSeed);
      }
    }
  }
}
