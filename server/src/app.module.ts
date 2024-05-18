import { Module } from '@nestjs/common'
import { DatabaseModule } from "./database/database.module";
import { BoardModule } from './board/board.module';
import { UserModule } from './user/user.module';


@Module({
  controllers: [],
  providers: [],
  imports: [
    DatabaseModule,
    BoardModule,
    UserModule
  ]
})

export class AppModule { }
