import { AlertTypes } from '@components/micro/AlertPopup';

type AlertData = { text: string; type: AlertTypes };

let handler: ((data: AlertData) => void) | null = null;

export function subscribeToAlerts(cb: (data: AlertData) => void) {
  handler = cb;
}

export function showAlert(text: string, type: AlertTypes) {
  if (handler) {
    handler({ text, type });
  }
}
