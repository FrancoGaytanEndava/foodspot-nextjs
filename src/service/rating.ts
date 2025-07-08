import { IRatingResponse, IRatingRequest } from '../models/ratings';
import { _get, _post } from './httpService';

export async function createRating(
  idEvent: string,
  idUser: string,
  payload: IRatingRequest,
  signal?: AbortSignal
): Promise<IRatingResponse> {
  const url = `/ratings/createRating/${idEvent}/${idUser}`;
  return await _post<IRatingResponse, IRatingRequest>(url, payload, signal);
}

export async function getRatingFromUser(
  idEvent: string,
  idUser: string,
  signal?: AbortSignal
): Promise<IRatingResponse> {
  const url = `/ratings/getRatingFromUser/${idEvent}/${idUser}`;
  return await _get(url, signal);
}
