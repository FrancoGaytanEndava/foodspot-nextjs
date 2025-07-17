// src/services/authServerService.ts

import { LoginRequest, LoginResponse } from '../models/user';
import { postServer } from './httpServer';

export async function loginServer(payload: LoginRequest): Promise<LoginResponse> {
  return await postServer<LoginResponse, LoginRequest>('/login/', payload);
}
