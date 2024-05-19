import { IsIn, IsOptional } from 'class-validator';

export class QueryBoardParamsDto {
  @IsOptional()
  page?: string;

  @IsOptional()
  limit?: string;

  @IsIn(['all', 'title', 'eventDate', 'organizer'])
  sort?: 'all' | 'title' | 'eventDate' | 'organizer'


}
