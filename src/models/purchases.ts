import { IUser } from './user';

export interface IPurchaseReceipt {
  amount: number;
  description: string;
  image: string;
  _id: string;
  participants: string[];
  event: string;
  shoppingDesignee: IUser;
}

export interface IPurchaseReceiptImage {
  file: any;
}

export interface IPurchaseReceiptRequest {
  //nuevo
  amount: number;
  description: string;
  file: any;
}

export interface IPurchaseByEvent {
  id: string;
  participants: string[];
}

export interface IPurchaseAssignmentResponse {
  message: string;
}

export interface IPurchaseAssignment {
  _id: string;
  image: string;
  description: string;
  amount: number;
  participants: IParticipant[];
  event: string;
  shoppingDesignee: IUser;
}

export interface IParticipant {
  _id: string;
  name: string;
  lastName?: string;
}
