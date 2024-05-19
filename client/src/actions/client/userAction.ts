import { z } from 'zod'
import { api } from '@/lib/axios'

import { AxiosResponse } from 'axios'
import { IUser, IUsers } from '@/types/user';

export const UserSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Name must be at least 3 characters.' })
    .max(50, { message: 'Name must be at most 50 characters.' }),
  email: z
    .string()
    .email({ message: 'Invalid email address.' }),
  hear: z
    .string(),
  birth: z.date(),
});

export type IUserSchema = z.infer<typeof UserSchema>

export interface QueryUserParams {
  page?: string;
  limit?: string;
  search?: string;
}

export interface ApiUser {
  create: (body: IUserSchema) => Promise<IUser>;
  getAll: (params: QueryUserParams) => Promise<IUsers>;
  getOne: (id: string) => Promise<IUser>;
  update: (userId: string, data: Partial<IUserSchema>) => Promise<IUser>;
  remove: (id: string) => Promise<void>;
}

export const apiUser: ApiUser = {
  create: (body) => api.post('/user', body).then(qw),
  getAll: (params) => api.get('/user', { params }).then(qw),
  getOne: (id) => api.get(`/user/${id}`).then(qw),
  update: (userId, body) => api.patch(`/user/${userId}`, body).then(qw),
  remove: (id) => api.delete(`/user/${id}`).then(qw),
};


const qw = <T>(response: AxiosResponse<T>): T => response.data;