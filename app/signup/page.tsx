"use client";

import React from "react";
import { useRouter } from "next/navigation";
import SignUpForm from "@/app/signup/signUpForm";
import PandaLogo from "@/app/assets/images/logo.png";
import styles from "./Page.module.css";
import Image from "next/image";

const SignUpPage = () => {
  const router = useRouter();

  const handleLogoClick = () => {
    router.push("/");
  };

  const handleLoginClick = () => {
    router.push("/login");
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.logo}>
        <span onClick={handleLogoClick}>
          <Image
            src={PandaLogo}
            className={styles.pandamarket}
            width="296"
            alt="판다마켓 로고"
          />
        </span>
      </div>
      <SignUpForm />
      <div className={styles.goLogin}>
        이미 회원이신가요?{" "}
        <a className={styles.loginLink} onClick={handleLoginClick}>
          로그인
        </a>
      </div>
    </div>
  );
};

export default SignUpPage;
