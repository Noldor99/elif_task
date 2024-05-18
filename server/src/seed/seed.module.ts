import { Module } from '@nestjs/common'
import { SeedService } from './seed.service'
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/database/database.module'
import { ResetTotalDataSeed } from './generation/resetTotalDataSeed';
import { Board } from 'src/board/board.entity';
import { User } from 'src/user/user.entity';
import { BoardSeed } from './generation/boardSeed';
import { BoardModule } from 'src/board/board.module';
import { UserModule } from 'src/user/user.module';
import { UserSeed } from './generation/userSeed';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([Board, User]),
    BoardModule,
    UserModule
  ],
  providers: [
    SeedService,
    ResetTotalDataSeed,
    BoardSeed,
    UserSeed
  ],
  exports: [SeedService]

})
export class SeedModule { }
