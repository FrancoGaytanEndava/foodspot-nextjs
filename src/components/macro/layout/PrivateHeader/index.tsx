'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@contexts/AuthContext';
import { useLocalizationContext, useTranslation } from '@contexts/LocalizationContext';
import { getUserById } from '@services/userService';
import { getImage } from '@services/purchaseReceipts';
import { locales } from '@localization/index';
import { IPublicUser } from '@models/user';
import styles from './privateHeader.module.scss';

export default function PrivateHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const authContext = useAuth();
  const localeContext = useLocalizationContext();
  const translation = useTranslation('userProfile');

  const [userData, setUserData] = useState<IPublicUser | undefined>();
  const [image, setImage] = useState<File | undefined>();

  useEffect(() => {
    if (authContext.user) {
      getUserById(authContext.user.id)
        .then(resp => {
          setUserData(resp);
          if (resp.profilePicture) {
            getImage(resp.profilePicture)
              .then(res => setImage(res))
              .catch(e => console.error('Error loading image:', e));
          }
        })
        .catch(e => console.error('Error loading user data:', e));
    }
  }, [authContext.user]);

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    authContext.logout(localeContext.locale.id);
  };

  const handleGoToProfile = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(`/${localeContext.locale.id}/userProfile`);
  };

  const handleGoToMain = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(`/${localeContext.locale.id}`);
  };

  const switchLanguage = (langId: string) => {
    const selected = locales.find(l => l.id === langId);
    if (!selected) return;

    localeContext.setLocale(selected);
    document.cookie = `locale=${langId}; path=/; max-age=${60 * 60 * 24 * 365}`;

    const newPath = pathname.replace(/^\/[a-zA-Z-]+/, `/${langId}`);
    router.push(newPath);
  };

  return (
    <div className={styles.headerWrapper}>
      <header className={styles.privateHeader}>
        <nav className={styles.navbar}>
          {!!authContext.user?.name && (
            <div className={styles.welcomeMsg}>
              {translation.headerWelcome} {authContext.user.name}
              {userData?.profilePicture && image instanceof Blob ? (
                <img className={styles.profileBtn} src={URL.createObjectURL(image)} alt="profile" onClick={handleGoToProfile} />
              ) : (
                <img src="/assets/pictures/profile.png" className={styles.profileBtn} alt="placeholder" onClick={handleGoToProfile} />
              )}
              <button className={styles.spanishFlag} onClick={() => switchLanguage('es-AR')} />
              <button className={styles.englishFlag} onClick={() => switchLanguage('en-US')} />
            </div>
          )}
          <div className={styles.logoutBtnSection}>
            <button className={styles.logoutBtn} onClick={handleLogout}>
              {!!authContext.user?.name ? translation.logoutBtn : translation.loginBtn}
            </button>
          </div>
        </nav>
      </header>

      <section className={styles.secondHeader}>
        <button className={styles.logo} onClick={handleGoToMain}></button>
        <div className={styles.fire}></div>
      </section>
    </div>
  );
}
