import { baseApi } from './baseApi';
import { Property } from './propertyApi';

export const favouriteApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /** Returns populated Property objects directly */
    getFavourites: builder.query<{ data: Property[] }, void>({
      query: () => '/favourite/my-favourites',
      providesTags: ['Favourite'],
    }),

    addFavourite: builder.mutation<any, { propertyId: string }>({
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
