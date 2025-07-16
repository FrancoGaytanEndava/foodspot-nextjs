'use client';

import FormLayout from '@components/macro/layout/FormLayout';
import { EmailInput } from '@components/micro/Inputs/EmailInput';
import { PasswordInput } from '@components/micro/Inputs/PasswordInput';
import TextInput from '@components/micro/Inputs/TextInput';
import Button from '@components/micro/Button';
import styles from './styles.module.scss';
import { useSettingNewPasswordState } from '@hooks/useSettingNewPasswordState';
import { useTranslation } from '@hooks/useTranslation';

export default function SettingNewPasswordForm() {
  const { t, lang } = useTranslation('settingNewPassword');

  const { credentials, updateField, handleSubmit, passwordRef, confirmPasswordRef } = useSettingNewPasswordState(lang);

  return (
    <FormLayout onSubmit={handleSubmit}>
      <div className={styles.settingNewPasswordContainer}>
        <h1>{t.setNewPasswordTitle}</h1>

        <EmailInput label={t.email} placeholder={t.email} value={credentials.userEmail} onChange={val => updateField('userEmail', val)} />

        <TextInput
          label={t.verificationCode}
          placeholder={t.verificationCode}
          value={credentials.userVerificationCode}
          onChange={val => updateField('userVerificationCode', val)}
          className={styles.input}
        />

        <PasswordInput
          label={t.password}
          placeholder={t.password}
          value={credentials.userPassword}
          onChange={val => updateField('userPassword', val)}
          inputRef={passwordRef}
          className={styles.input}
        />

        <p className={styles.mainDesc}>{t.passwordDescription}</p>

        <PasswordInput
          label={t.confirmPassword}
          placeholder={t.confirmPassword}
          value={credentials.userConfirmedPassword}
          onChange={val => updateField('userConfirmedPassword', val)}
          inputRef={confirmPasswordRef}
          className={styles.input}
        />

        <Button type="submit" kind="primary" size="large" id="registerBtn" style={{ marginBottom: 30 }}>
          {t.setKeyBtn}
        </Button>
      </div>
    </FormLayout>
  );
}
