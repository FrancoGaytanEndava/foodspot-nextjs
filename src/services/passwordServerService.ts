import { IMailRequest } from '../models/mail';
import { postServer } from './httpServer';

export async function forgotPassword(payload: IMailRequest, signal?: AbortSignal): Promise<any> {
  const url = `/password/forgot`;
  return await postServer<any, IMailRequest>(url, payload, signal);
}
