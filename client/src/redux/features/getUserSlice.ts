import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUsers } from '../../services/userServices';

interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
}

interface User {
  id: number;
  name: string;
  email: string;
  password: string;

}

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await getUsers();
  return response;
});

const usersSlice = createSlice({
  name: 'users',
  initialState: { users: [], loading: false, error: null } as UsersState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Error al obtener usuarios';
    });
  },
});

export const { actions: usersActions, reducer: usersReducer } = usersSlice;

export default usersReducer;
