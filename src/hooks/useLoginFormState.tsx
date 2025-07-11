import { useState } from 'react';
import { LoginRequest } from '@models/user';

export function useLoginFormState() {
  const [credentials, setCredentials] = useState<LoginRequest>({ email: '', password: '' });

  const updateField = (field: keyof LoginRequest) => (value: string) => {
    setCredentials(prev => ({ ...prev, [field]: value }));
  };

  return {
    credentials,
    setEmail: updateField('email'),
    setPassword: updateField('password'),
  };
}
