import { baseApi } from './baseApi';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentUser: builder.query<any, void>({
      query: () => ({
        url: '/user',
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['User'],
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          // Store token and user data in localStorage
          localStorage.setItem('access_token', data.data.access_token);
          localStorage.setItem('user', JSON.stringify({
            id: data.data.id,
            email: data.data.email,
            firstName: data.data.firstName,
            lastName: data.data.lastName,
            role: data.data.role,
          }));
        } catch (error) {
          console.error('Login failed:', error);
        }
      },
    }),
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (userData) => ({
        url: '/register',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['User'],
    }),
    logout: builder.mutation<LogoutResponse, void>({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
      invalidatesTags: ['User'],
      onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
        try {
          await queryFulfilled;
          // Clear localStorage on successful logout
          localStorage.removeItem('access_token');
          localStorage.removeItem('user');
          // Clear all cached data
          dispatch(authApi.util.resetApiState());
        } catch (error) {
          console.error('Logout API failed:', error);
          // Still clear localStorage even if API call fails
          localStorage.removeItem('access_token');
          localStorage.removeItem('user');
          // Clear cache even on failure
          dispatch(authApi.util.resetApiState());
        }
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation, useGetCurrentUserQuery } = authApi;



// export const getAuthToken = () => {
//   return localStorage.getItem('access_token');
// };

// export const isAuthenticated = () => {
//   return !!localStorage.getItem('access_token');
// };
