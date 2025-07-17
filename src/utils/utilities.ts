'use client';
import '@cyntler/react-doc-viewer/dist/index.css';

export function parseMinutes(minutes: string) {
  let newMinutes = minutes;
  if (Number(minutes) < 10) {
    newMinutes = '0' + minutes;
  }
  return newMinutes;
}

interface DownloadFileParams {
  file: Blob | File;
  fileName: string;
}

export const downloadFile = ({ file, fileName }: DownloadFileParams): void => {
  const blob = new Blob([file], { type: file.type });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();

  URL.revokeObjectURL(url);
  document.body.removeChild(link);
};

export function getBrowserName(): string {
  if (typeof window === 'undefined') return 'unknown';

  const agent = window.navigator.userAgent.toLowerCase();

  switch (true) {
    case agent.includes('edge'):
    case agent.includes('edg/'):
      return 'Edge';
    case agent.includes('trident'):
      return 'MS IE';
    case agent.includes('firefox'):
      return 'Mozilla Firefox';
    case agent.includes('safari'):
      return 'Safari';
    default:
      return 'other';
  }
}
