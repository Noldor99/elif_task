import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Patch,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { QueryUserParamsDto } from './dto/query-user-params.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiQuery({ name: 'page', type: Number, required: false, example: 1 })
  @ApiQuery({ name: 'limit', type: Number, required: false, example: 4 })
  @ApiQuery({ name: 'search', type: String, required: false })
  getAll(@Query() params: QueryUserParamsDto) {
    return this.userService.getAll(params);

  }

  @Get(':id')
  @ApiParam({ name: 'id', required: true, description: 'ID of the user' })
  getOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.editUser(userId, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
