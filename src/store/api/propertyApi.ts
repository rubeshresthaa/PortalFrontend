import { baseApi } from './baseApi';

export interface Property {
  _id: string;
  propertyTitle: string;
  propertyAddress: string;
  propertyPrice: number;
  propertyImage?: string;
  propertyType?: string;
  propertyBeds?: number;
  propertyBaths?: number;
  createdAt: string;
}

export const propertyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProperties: builder.query<{ data: Property[] }, void>({
      query: () => '/property/all',
      providesTags: ['Property' as any],
    }),
    getProperty: builder.query<{ data: Property }, string>({
      query: (id) => `/property/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Property' as any, id }],
    }),
    addProperty: builder.mutation<any, Partial<Property>>({
      query: (data) => ({
        url: '/property/add',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Property' as any],
    }),
  }),
});

export const {
  useGetPropertiesQuery,
  useGetPropertyQuery,
  useAddPropertyMutation,
} = propertyApi;
