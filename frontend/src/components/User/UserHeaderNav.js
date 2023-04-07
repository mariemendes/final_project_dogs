import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import { ReactComponent as MyPictures } from '../../assets/feed.svg';
import { ReactComponent as AddPicture } from '../../assets/add.svg';
import { ReactComponent as Exit } from '../../assets/logout.svg';
import styles from './UserHeaderNav.module.css';
import useMedia from '../../hooks/useMedia';

const UserHeaderNav = () => {
  const { userLogout } = React.useContext(UserContext);
  const mobile = useMedia('(max-width: 40rem)');
  const [mobileMenu, setMobileMenu] = React.useState(false);

  const { pathname } = useLocation();
  React.useEffect(() => {
    setMobileMenu(false);
  }, [pathname]);

  return (
    <>
      {mobile && (
        <button
          aria-label="Menu"
          className={`${styles.mobileBtn} ${
            mobileMenu && styles.mobileBtnActive
          }`}
          onClick={() => setMobileMenu(!mobileMenu)}
        ></button>
      )}

      <nav
        className={`${mobile ? styles.navMobile : styles.navigation} ${
          mobileMenu && styles.navMobileActive
        }`}
      >
        <NavLink to="/account" end>
          <MyPictures />
          {mobile && 'My Pictures'}
        </NavLink>
        <NavLink to="/account/post" end>
          <AddPicture />
          {mobile && 'Add new Picture'}
        </NavLink>
        <button onClick={userLogout}>
          <Exit />
          {mobile && 'Exit'}
        </button>
      </nav>
    </>
  );
};

export default UserHeaderNav;
