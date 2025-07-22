'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@contexts/AuthContext';
import { getUserById } from '@services/userService';
import { getImage } from '@services/purchaseReceipts';
import { IPublicUser } from '@models/user';
import styles from './styles.module.scss';
import { useTranslation } from '@hooks/useTranslation';
import { useCustomRouter } from '@hooks/useCustomRouter';
import Image from 'next/image';
import { getUserFromCookie, IUserFromCookie } from '@utils/localeCookies';

export default function PrivateHeader() {
  const { pushTo, switchLanguage } = useCustomRouter();
  const pathname = usePathname();
  const authContext = useAuth();
  const { t, lang } = useTranslation('userProfile');

  const [userData, setUserData] = useState<IPublicUser | undefined>();
  const [image, setImage] = useState<File | undefined>();
  const [user, setUser] = useState<IUserFromCookie | null>(null);

  useEffect(() => {
    const cookieUser = getUserFromCookie();
    setUser(cookieUser);
  }, []);

  useEffect(() => {
    if (user) {
      getUserById(user.id)
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
  }, [user]);

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    authContext.logout(lang);
  };

  const handleGoToProfile = (e: React.MouseEvent) => {
    e.preventDefault();
    pushTo(`/userProfile`);
  };

  const handleGoToMain = (e: React.MouseEvent) => {
    e.preventDefault();
    pushTo(`/eventHome`);
  };

  return (
    <div className={styles.headerWrapper}>
      <header className={styles.privateHeader}>
        <nav className={styles.navbar}>
          {user?.name && (
            <div className={styles.welcomeMsg}>
              {t.headerWelcome} {user.name}
              {userData?.profilePicture && image instanceof Blob ? (
                <Image
                  className={styles.profileBtn}
                  src={URL.createObjectURL(image)}
                  alt="profile"
                  onClick={handleGoToProfile}
                  width={40}
                  height={40}
                />
              ) : (
                <Image
                  src="/images/icons/profile.png"
                  className={styles.profileBtn}
                  alt="placeholder"
                  width={40}
                  height={40}
                  onClick={handleGoToProfile}
                />
              )}
              <button className={styles.spanishFlag} onClick={() => switchLanguage('es-AR', pathname)} />
              <button className={styles.englishFlag} onClick={() => switchLanguage('en-US', pathname)} />
            </div>
          )}
          <div className={styles.logoutBtnSection}>
            <button className={styles.logoutBtn} onClick={handleLogout}>
              {/* {!!user?.name ? t.logoutBtn : t.loginBtn} */}
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
