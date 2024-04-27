import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  tagTypes: ['Users', 'User'],
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
  endpoints: (build) => ({
    getUsers: build.query<User[], void>({
      query: () => `/users`,
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Users' as const, id })), { type: 'Users', id: 'LIST' }]
          : [{ type: 'Users', id: 'LIST' }],
    }),
    getUser: build.query<User, string>({
      query: (id: string) => `/users/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'User', id }],
    }),
    updateUser: build.mutation({
      query: (body: User) => ({
        url: `/users/${body.id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (_results, _error, arg) => [
        { type: 'Users', id: 'LIST' },
        { type: 'User', id: arg.id },
      ],
    }),
  }),
});

export const { useGetUsersQuery, useGetUserQuery, useUpdateUserMutation } = usersApi;
