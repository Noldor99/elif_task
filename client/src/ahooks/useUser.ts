

import { useEffect } from 'react'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
  IUserSchema,
  QueryUserParams,
  apiUser,
} from '@/actions/client/userAction'


export const useCreateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: apiUser.create,
    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: ['user'],
      })
    },
  })
}

export const useUpdateUser = (id: string) => {

  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (body: Partial<IUserSchema>) => apiUser.update(id!, body),
    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: ['user'],
      })
      // queryClient.invalidateQueries({
      //   queryKey: ['user', id],
      // })
    },
  })
}

export const useGetUser = ({
  enabled = true,
  params,
}: {
  enabled?: boolean
  params?: QueryUserParams
}) =>
  useQuery({
    queryKey: ['user'],
    queryFn: () => apiUser.getAll(params ?? {}),
    enabled,
  })

export const useDeleteUserById = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => apiUser.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user'],
      })
    },
  })
}

export const useGetUserById = (id: string) => {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['user', id],
    queryFn: () => apiUser.getOne(id),
    enabled: !!id && id !== 'Add',
  })
  const { isSuccess } = query

  useEffect(() => {
    if (isSuccess) {
      queryClient.invalidateQueries({
        queryKey: ['user'],
      })
    }
  }, [isSuccess, queryClient])

  return query
}


