import { baseApi } from './baseApi';
import { MyProperitiesResponse, Property } from '../../types/property.types.d';

export const propertyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyProperties: builder.query<MyProperitiesResponse, void>({
      query: () => '/property/my-properties',
      providesTags: ['MyProperties'],
    }),
    getProperties: builder.query<{ data: Property[] }, void>({
      query: () => '/property/all',
      providesTags: ['Property'],
    }),
    getProperty: builder.query<{ data: Property }, string>({
      query: (id) => `/property/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Property', id }],
    }),
    createProperty: builder.mutation<any, Partial<Property>>({
      query: (data) => ({
        url: '/property/create',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Property', 'MyProperties'],
    }),
    updateProperty: builder.mutation<any,any>({
      query: ({ id, ...data }) => ({
        url: `/property/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Property', 'MyProperties'],
    }),
    deleteProperty: builder.mutation<any, string>({
      query: (id) => ({
        url: `/property/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Property', 'MyProperties'],
    }),
  }),
});

export const {
  useGetPropertiesQuery,
  useGetMyPropertiesQuery,
  useGetPropertyQuery,
  useCreatePropertyMutation,
  useUpdatePropertyMutation,
  useDeletePropertyMutation,
} = propertyApi;
