import { IMailRequest, IRecoverPasswordRequest, IVerificationCode } from '../models/mail';
import { postServer, putServer } from './httpServer';

export async function forgotPassword(payload: IMailRequest, signal?: AbortSignal): Promise<any> {
  const url = `/password/forgot`;
  return await postServer<any, IMailRequest>(url, payload, signal);
}

export async function verifyCode(payload: IVerificationCode, signal?: AbortSignal): Promise<any> {
  const url = `/password/verifyCode`;
  return await putServer<any, IVerificationCode>(url, payload, signal);
}

export async function recoverPassword(payload: IRecoverPasswordRequest, signal?: AbortSignal): Promise<any> {
  //TODO: tipar any
  const url = `/password/recover`;
  return await putServer<any>(url, payload, signal);
}
