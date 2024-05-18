import { Module } from '@nestjs/common'
import { SeedService } from './seed.service'
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/database/database.module'
import { ResetTotalDataSeed } from './generation/resetTotalDataSeed';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([]),
  ],
  providers: [
    SeedService,
    ResetTotalDataSeed,
  ],
  exports: [SeedService]

})
export class SeedModule { }
