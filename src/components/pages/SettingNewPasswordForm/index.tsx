'use client';

import FormLayout from '@components/macro/layout/FormLayout';
import { useTranslation } from '@contexts/LocalizationContext';
import { EmailInput } from '@components/micro/Inputs/EmailInput';
import { PasswordInput } from '@components/micro/Inputs/PasswordInput';
import TextInput from '@components/micro/Inputs/TextInput';
import Button from '@components/micro/Button';
import styles from './styles.module.scss';
import { useSettingNewPasswordState } from '@hooks/useSettingNewPasswordState';

export default function SettingNewPasswordForm() {
  const lang = useTranslation('settingNewPassword');

  const { credentials, updateField, handleSubmit, passwordRef, confirmPasswordRef } = useSettingNewPasswordState(lang);

  return (
    <FormLayout onSubmit={handleSubmit}>
      <div className={styles.settingNewPasswordContainer}>
        <h1>{lang.setNewPasswordTitle}</h1>

        <EmailInput label={lang.email} placeholder={lang.email} value={credentials.userEmail} onChange={val => updateField('userEmail', val)} />

        <TextInput
          label={lang.verificationCode}
          placeholder={lang.verificationCode}
          value={credentials.userVerificationCode}
          onChange={val => updateField('userVerificationCode', val)}
        />

        <PasswordInput
          label={lang.password}
          placeholder={lang.password}
          value={credentials.userPassword}
          onChange={val => updateField('userPassword', val)}
          inputRef={passwordRef}
        />

        <p className={styles.mainDesc}>{lang.passwordDescription}</p>

        <PasswordInput
          label={lang.confirmPassword}
          placeholder={lang.confirmPassword}
          value={credentials.userConfirmedPassword}
          onChange={val => updateField('userConfirmedPassword', val)}
          inputRef={confirmPasswordRef}
        />

        <Button type="submit" kind="primary" size="large" id="registerBtn" style={{ marginBottom: 30 }}>
          {lang.setKeyBtn}
        </Button>
      </div>
    </FormLayout>
  );
}
