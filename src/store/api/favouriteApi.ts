import { baseApi } from './baseApi';
export const favouriteApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFavourites: builder.query<{ data: Property[] }, void>({
      query: () => '/favourite/my-favourites',
      providesTags: ['Favourite'],
    }),

    addFavourite: builder.mutation<void, { propertyId: string }>({
      query: (data) => ({
        url: '/favourite/add',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Favourite'],
    }),
  }),
});

export const {
  useGetFavouritesQuery,
  useAddFavouriteMutation,
} = favouriteApi;
