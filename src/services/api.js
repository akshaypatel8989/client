import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const apiBaseUrl = import.meta.env.VIT_API_URL || '/api'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: apiBaseUrl.replace(/\/$/, ''), credentials: 'include' }),
  tagTypes: ['Auth', 'Attendance', 'Overtime'],
  endpoints: (builder) => ({
    me: builder.query({ query: () => '/auth/me', providesTags: ['Auth'] }),
    login: builder.mutation({ query: (body) => ({ url: '/auth/login', method: 'POST', body }), invalidatesTags: ['Auth'] }),
    register: builder.mutation({ query: (body) => ({ url: '/auth/register', method: 'POST', body }), invalidatesTags: ['Auth'] }),
    logout: builder.mutation({ query: () => ({ url: '/auth/logout', method: 'POST' }), invalidatesTags: ['Auth', 'Attendance', 'Overtime'] }),
    attendance: builder.query({ query: (params = {}) => ({ url: '/attendance', params }), providesTags: ['Attendance'] }),
    punchIn: builder.mutation({ query: (body) => ({ url: '/attendance/punch-in', method: 'POST', body }), invalidatesTags: ['Attendance'] }),
    punchOut: builder.mutation({ query: (body) => ({ url: '/attendance/punch-out', method: 'POST', body }), invalidatesTags: ['Attendance'] }),
    validateAttendance: builder.mutation({ query: ({ id, ...body }) => ({ url: `/attendance/${id}/validate`, method: 'PATCH', body }), invalidatesTags: ['Attendance'] }),
    overtime: builder.query({ query: () => '/overtime/pending', providesTags: ['Overtime'] }),
    requestOvertime: builder.mutation({ query: (body) => ({ url: '/overtime/request', method: 'POST', body }), invalidatesTags: ['Overtime'] }),
    updateOvertime: builder.mutation({ query: ({ id, status }) => ({ url: `/overtime/${id}/status`, method: 'PATCH', body: { status } }), invalidatesTags: ['Overtime'] }),
  }),
})

export const {
  useMeQuery, useLoginMutation, useRegisterMutation, useLogoutMutation,
  useAttendanceQuery, usePunchInMutation, usePunchOutMutation,
  useValidateAttendanceMutation, useOvertimeQuery, useRequestOvertimeMutation,
  useUpdateOvertimeMutation,
} = api
