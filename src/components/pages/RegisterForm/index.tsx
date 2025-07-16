'use client';

import FormLayout from '@components/macro/layout/FormLayout';
import { useTranslation } from '@hooks/useTranslation';
import { useRegisterFormState } from '@hooks/useRegisterFormState';
import { EmailInput } from '@components/micro/Inputs/EmailInput';
import { PasswordInput } from '@components/micro/Inputs/PasswordInput';
import Button from '@components/micro/Button';
import styles from './styles.module.scss';
import TextInput from '@components/micro/Inputs/TextInput';
import SpecialDietCheckboxGroup from './SpecialDietCheckboxGroup';
import { Translation } from '@localization/index';

export default function RegisterForm() {
  const { t } = useTranslation<Translation['register']>('register');

  const { credentials, updateField, dietOptions, updateDietOption, passwordRef, confirmPasswordRef, handleSubmit } = useRegisterFormState(t);

  return (
    <FormLayout onSubmit={handleSubmit}>
      <h3 className={styles.title}>{t.registerTitle}</h3>

      <div className={styles.inputSection}>
        <section className={styles.firstColumn}>
          <TextInput
            label={t.name}
            placeholder={t.name}
            value={credentials.name}
            onChange={value => updateField('name', value)}
            className={styles.registerInput}
          />
          <TextInput
            label={t.lastName}
            placeholder={t.lastName}
            value={credentials.lastName}
            onChange={value => updateField('lastName', value)}
            className={styles.registerInput}
          />
          <EmailInput
            label={t.email}
            placeholder={t.emailPlaceholder}
            value={credentials.email}
            onChange={value => updateField('email', value)}
            className={styles.registerInput}
          />
        </section>

        <section className={styles.secondColumn}>
          <PasswordInput
            label={t.password}
            placeholder={t.password}
            value={credentials.password}
            onChange={value => updateField('password', value)}
            inputRef={passwordRef}
            className={styles.registerInput}
          />

          <PasswordInput
            label={t.confirmPassword}
            placeholder={t.password}
            value={credentials.repeatedPassword as string}
            onChange={value => updateField('repeatedPassword', value)}
            inputRef={confirmPasswordRef}
            className={styles.registerInput}
          />

          <SpecialDietCheckboxGroup
            values={dietOptions}
            labels={{
              isVegan: t.specialDietOptions?.vegan,
              isVegetarian: t.specialDietOptions?.vegetarian,
              isHypertensive: t.specialDietOptions?.hypertensive,
              isCeliac: t.specialDietOptions?.celiac,
            }}
            title={t.specialDiet}
            description={t.specialDietOptional}
            onChange={(params: { key: keyof typeof dietOptions; checked: boolean }) => updateDietOption(params.key, params.checked)}
          />
        </section>
      </div>

      <section className={styles.buttonContainer}>
        <Button type="submit" kind="primary" size="large" id="registerBtn">
          {t.registerBtn}
        </Button>
      </section>
    </FormLayout>
  );
}
