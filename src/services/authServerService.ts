// src/services/authServerService.ts

import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '../models/user';
import { postServer } from './httpServer';

export async function loginServerSide(payload: LoginRequest): Promise<LoginResponse> {
  return await postServer<LoginResponse, LoginRequest>('/login/', payload);
}

export async function registerServerSide(payload: RegisterRequest): Promise<RegisterResponse> {
  return await postServer<RegisterResponse, RegisterRequest>('/users/register/', payload);
}
