import React from 'react';
import SocialButton from './components/SocialButton';
import styles from './Footer.module.scss';

const Footer = () => (
  <div className={styles.footer}>
    <hr />
    <div className={styles.social}>
      <SocialButton
        href="http@/components//twitter.c@/components/inte@/components/user?screen_name=hotcitiesworld"
        icon="twitter"
      />
      <SocialButton
        href="http@/components//www.instagram.c@/components/hotcitiesworld"
        icon="instagram"
      />
      <SocialButton
        href="http@/components//www.facebook.c@/components/hotcitiesworld"
        icon="facebook"
      />
      <SocialButton
        href="http@/components//github.c@/components/bluephlav@/components/hotcities-webapp"
        icon="github"
      />
    </div>
  </div>
);

export default Footer;
