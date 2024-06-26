import { Injectable, Logger } from '@nestjs/common'
import { Promise as Bluebird } from 'bluebird'
import { SeederInterface } from './seeder.interface'
import { ResetTotalDataSeed } from './generation/resetTotalDataSeed'
import { BoardSeed } from './generation/boardSeed'
import { UserSeed } from './generation/userSeed'


const isProdaction = process.env.NODE_ENV === 'prodaction'

@Injectable()
export class SeedService {
  private readonly seeders = []
  private readonly logger = new Logger(SeedService.name)

  constructor(
    private readonly resetTotalDataSeed: ResetTotalDataSeed,
    private readonly userSeed: UserSeed,
    private readonly boardSeed: BoardSeed,

  ) {
    this.seeders = isProdaction
      ? [
        this.resetTotalDataSeed,
        this.boardSeed,
        this.userSeed,

      ]
      : [
        this.resetTotalDataSeed,
        this.boardSeed,
        this.userSeed,


      ]
  }

  async seed() {
    await Bluebird.each(this.seeders, async (seeder: SeederInterface) => {
      this.logger.log(`Seeding ${seeder.constructor.name}`)
      await seeder.seed()
    })
  }
}
