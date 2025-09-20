import { api } from '@/lib/axios';
import { useAuthStore } from '@/store/auth';
import type { LoginInput, RegisterInput } from '@/types';

export const login = async (data: LoginInput) => {
  const res = await api.post("/auth/login", data);
  useAuthStore.getState().setToken(res.data.token);
  return res.data;
};

export const register = async (data: RegisterInput) => {
  const res = await api.post("/auth/register", data);
  useAuthStore.getState().setToken(res.data.token);
  return res.data;
};