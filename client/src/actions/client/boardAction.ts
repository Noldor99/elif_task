import { z } from 'zod'
import { api } from '@/lib/axios'

import { AxiosResponse } from 'axios'
import { IBoard, IBoards } from '@/types/board';

export const BoardSchema = z.object({
  title: z
    .string()
    .min(3, { message: 'Title must be at least 3 characters.' })
    .max(50, { message: 'Title must be at most 50 characters.' }),
  organizer: z
    .string()
    .min(3, { message: 'Organizer must be at least 3 characters.' })
    .max(50, { message: 'Organizer must be at most 50 characters.' }),
  description: z
    .string()
    .min(3, { message: 'Description must be at least 3 characters.' })
    .max(150, { message: 'Description must be at most 150 characters.' }),
  eventDate: z.date(),
});

export type IBoardSchema = z.infer<typeof BoardSchema>

export enum SortVariant {
  all = 'all',
  title = 'title',
  eventDate = 'eventDate',
  organizer = 'organizer',
}


export interface QueryBoardParams {
  page?: string;
  limit?: string;
  sort?: SortVariant | string;
}

export interface ApiBoard {
  create: (body: IBoardSchema) => Promise<IBoard>;
  getAll: (params: QueryBoardParams) => Promise<IBoards>;
  getOne: (id: string) => Promise<IBoard>;
  update: (boardId: string, data: Partial<IBoardSchema>) => Promise<IBoard>;
  remove: (id: string) => Promise<void>;
}

export const apiBoard: ApiBoard = {
  create: (body) => api.post('/board', body).then(qw),
  getAll: (params) => api.get('/board', { params }).then(qw),
  getOne: (id) => api.get(`/board/${id}`).then(qw),
  update: (boardId, body) => api.patch(`/board/${boardId}`, body).then(qw),
  remove: (id) => api.delete(`/board/${id}`).then(qw),
};


const qw = <T>(response: AxiosResponse<T>): T => response.data;