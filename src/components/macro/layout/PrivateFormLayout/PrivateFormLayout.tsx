'use client';

import { useEffect, useState } from 'react';
import { useLocalizationContext, useTranslation } from '@contexts/LocalizationContext';
import AlertPopup from '@components/micro/AlertPopup/AlertPopup';
import { useAuth } from '@contexts/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import styles from './styles.module.scss';
import { locales } from '@localization/index';
import { getUserById } from '@services/userService';
import { IPublicUser } from '@models/user';
import { getImage } from '@services/purchaseReceipts';

interface PrivateFormLayoutProps {
  children: React.ReactNode;
}

export default function PrivateFormLayout({ children }: PrivateFormLayoutProps) {
  const { setLocale, locale } = useLocalizationContext();
  const lang = useTranslation('userProfile');
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const [userData, setUserData] = useState<IPublicUser | undefined>(undefined);
  const [image, setImage] = useState<File | undefined>(undefined);

  useEffect(() => {
    if (user) {
      getUserById(user.id)
        .then(resp => {
          setUserData(resp);
          if (resp.profilePicture) {
            getImage(resp.profilePicture)
              .then(setImage)
              .catch(e => console.error('Catch in context: ', e));
          }
        })
        .catch(e => console.error('Catch in context:', e));
    }
  }, [user]);

  function handleLogout(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    logout();
  }

  function handleGoToProfile(e: React.MouseEvent) {
    e.preventDefault();
    router.push(`/${locale.id}/userProfile`);
  }

  function handleGoToMain(e: React.MouseEvent) {
    e.preventDefault();
    router.push(`/${locale.id}`);
  }

  function switchLanguage(langId: string) {
    const selected = locales.find(l => l.id === langId);
    if (!selected) return;

    setLocale(selected);
    if (typeof document !== 'undefined') {
      document.cookie = `locale=${langId}; path=/; max-age=${60 * 60 * 24 * 365}`;
    }

    const newPath = pathname.replace(/^\/[a-zA-Z-]+/, `/${langId}`);
    router.push(newPath);
  }

  return (
    <div className={styles.privateContainer}>
      <AlertPopup />

      <header className={styles.privateHeader}>
        <nav className={styles.navbar}>
          {!!user?.name && (
            <div className={styles.welcomeMsg}>
              {lang.headerWelcome} {user.name}
              {userData?.profilePicture && image instanceof Blob ? (
                <img className={styles.profileBtn} src={URL.createObjectURL(image)} alt="selected" onClick={handleGoToProfile} /> //TODO: usar el componente image de next
              ) : (
                <img src="/assets/pictures/profile.png" className={styles.profileBtn} alt="placeholder" onClick={handleGoToProfile} />
              )}
              <button className={styles.spanishFlag} onClick={() => switchLanguage('es-AR')} />
              <button className={styles.englishFlag} onClick={() => switchLanguage('en-US')} />
            </div>
          )}

          <div className={styles.logoutBtnSection}>
            <button className={styles.logoutBtn} onClick={handleLogout}>
              {!!user?.name ? lang.logoutBtn : lang.loginBtn}
            </button>
          </div>
        </nav>
      </header>

      <section className={styles.secondHeader}>
        <button className={styles.logo} onClick={handleGoToMain}></button>
        <div className={styles.fire}></div>
      </section>

      <section className={styles.containerLayout}>{children}</section>

      <footer className={styles.footerFire}></footer>
    </div>
  );
}
