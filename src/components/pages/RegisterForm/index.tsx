'use client';

import FormLayout from '@components/macro/layout/FormLayout';
import { useTranslation } from '@contexts/LocalizationContext';
import { useRegisterFormState } from '@hooks/useRegisterFormState';
import { EmailInput } from '@components/micro/Inputs/EmailInput';
import { PasswordInput } from '@components/micro/Inputs/PasswordInput';
import Button from '@components/micro/Button';
import styles from './styles.module.scss';
import TextInput from '@components/micro/Inputs/TextInput';
import SpecialDietCheckboxGroup from './SpecialDietCheckboxGroup';

export default function RegisterForm() {
  const lang = useTranslation('register');

  const { credentials, updateField, dietOptions, updateDietOption, passwordRef, confirmPasswordRef, handleSubmit } = useRegisterFormState(lang);

  return (
    <FormLayout onSubmit={handleSubmit}>
      <h3 className={styles.title}>{lang.registerTitle}</h3>

      <div className={styles.inputSection}>
        <section className={styles.firstColumn}>
          <TextInput
            label={lang.name}
            placeholder={lang.name}
            value={credentials.name}
            onChange={value => updateField('name', value)}
            className={styles.registerInput}
          />
          <TextInput
            label={lang.lastName}
            placeholder={lang.lastName}
            value={credentials.lastName}
            onChange={value => updateField('lastName', value)}
            className={styles.registerInput}
          />
          <EmailInput
            label={lang.email}
            placeholder={lang.emailPlaceholder}
            value={credentials.email}
            onChange={value => updateField('email', value)}
            className={styles.registerInput}
          />
        </section>

        <section className={styles.secondColumn}>
          <PasswordInput
            label={lang.password}
            placeholder={lang.password}
            value={credentials.password}
            onChange={value => updateField('password', value)}
            inputRef={passwordRef}
            className={styles.registerInput}
          />

          <PasswordInput
            label={lang.confirmPassword}
            placeholder={lang.password}
            value={credentials.repeatedPassword as string}
            onChange={value => updateField('repeatedPassword', value)}
            inputRef={confirmPasswordRef}
            className={styles.registerInput}
          />

          <SpecialDietCheckboxGroup
            values={dietOptions}
            labels={{
              isVegan: lang.specialDietOptions.vegan,
              isVegetarian: lang.specialDietOptions.vegetarian,
              isHypertensive: lang.specialDietOptions.hypertensive,
              isCeliac: lang.specialDietOptions.celiac,
            }}
            title={lang.specialDiet}
            description={lang.specialDietOptional}
            onChange={(params: { key: keyof typeof dietOptions; checked: boolean }) => updateDietOption(params.key, params.checked)}
          />
        </section>
      </div>

      <section className={styles.buttonContainer}>
        <Button type="submit" kind="primary" size="large" id="registerBtn">
          {lang.registerBtn}
        </Button>
      </section>
    </FormLayout>
  );
}
