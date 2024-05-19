import { User } from 'src/user/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('board')
export class Board {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  organizer: string;

  @Column()
  description: string;

  @Column()
  eventDate: Date;

  @OneToMany(() => User, (user) => user.board)
  @JoinColumn({ name: 'userId' })
  users: User[];

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
