import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { User } from "./user.entity"
import { Repository } from "typeorm"
import { CreateUserDto } from "./dto/create-user.dto"
import { QueryUserParamsDto } from "./dto/query-user-params.dto"
import { UpdateUserDto } from "./dto/update-user.dto"

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) { }


  async create(dto: CreateUserDto): Promise<User> {

    const user = this.userRepository.create(dto);
    return this.userRepository.save(user);
  }

  async getAll(dto: QueryUserParamsDto) {
    const { page = 1, limit = 4 } = dto;
    try {
      let queryBuilder = this.userRepository.createQueryBuilder('user')
        .orderBy('user.createdAt', 'DESC')
        .skip((+page - 1) * +limit)
        .take(+limit);

      const [users, totalCount] = await queryBuilder.getManyAndCount();

      return { totalCount, users };
    } catch (e) {
      return { totalCount: 0, users: [] };
    }
  }


  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: {},
    })

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`)
    }

    return user
  }

  async editUser(userId: string, dto: UpdateUserDto) {
    const user = await this.findOne(userId);


    const dtoFilter = Object.keys(dto).reduce((acc, key) => {
      if (dto[key]) acc[key] = dto[key];
      return acc;
    }, {});

    Object.assign(user, dtoFilter);

    const updatedUser = await this.userRepository.save(user);
    return updatedUser;
  }


  async remove(id: string) {
    const user = await this.findOne(id);
    return this.userRepository.remove(user)
  }

}
