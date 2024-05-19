import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Board } from "./board.entity"
import { Repository } from "typeorm"
import { CreateBoardDto } from "./dto/create-board.dto"
import { QueryBoardParamsDto } from "./dto/query-board-params.dto"
import { UpdateBoardDto } from "./dto/update-board.dto"
import { UserService } from "src/user/user.service"

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
    private readonly userService: UserService,
  ) { }


  async create(dto: CreateBoardDto): Promise<Board> {

    const board = this.boardRepository.create(dto);
    return this.boardRepository.save(board);
  }

  async getAll(dto: QueryBoardParamsDto) {
    const { page = 1, limit = 4, sort } = dto;
    try {
      let queryBuilder = this.boardRepository.createQueryBuilder('board')
        .skip((+page - 1) * +limit)
        .take(+limit);

      if (sort === 'eventDate') {
        queryBuilder = queryBuilder.addOrderBy('board.eventDate', 'ASC');
      } else if (sort === 'organizer') {
        queryBuilder = queryBuilder.addOrderBy('board.organizer', 'ASC');
      } else if (sort === 'title') {
        queryBuilder = queryBuilder.addOrderBy('board.title', 'ASC');
      } else {
        queryBuilder = queryBuilder.addOrderBy('board.createdAt', 'DESC');
      }
      const [boards, totalCount] = await queryBuilder.getManyAndCount();

      return { totalCount, boards };
    } catch (e) {
      return { totalCount: 0, boards: [] };
    }
  }



  async findOne(id: string): Promise<Board> {
    const board = await this.boardRepository.findOne({
      where: { id },
      relations: { users: true },
    })

    if (!board) {
      throw new NotFoundException(`Board with ID ${id} not found`)
    }

    return board
  }

  async editBoard(boardId: string, dto: UpdateBoardDto) {
    const board = await this.findOne(boardId);


    const dtoFilter = Object.keys(dto).reduce((acc, key) => {
      if (dto[key]) acc[key] = dto[key];
      return acc;
    }, {});

    Object.assign(board, dtoFilter);

    const updatedBoard = await this.boardRepository.save(board);
    return updatedBoard;
  }


  async remove(id: string) {
    const board = await this.findOne(id);

    if (board.users && board.users.length > 0) {
      for (const user of board.users) {
        await this.userService.remove(user.id);
      }
    }

    return this.boardRepository.remove(board);
  }

}
