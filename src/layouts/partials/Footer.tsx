"use client";

import Logo from "@/components/Logo";
import Social from "@/components/Social";
import config from "@/config/config.json";
import social from "@/config/social.json";
import { slugSelector } from "@/lib/utils/slugSelector";
import { INavigationLink } from "@/types";
import Link from "next/link";

const Footer = ({
  lang,
  baseUrl,
  menu,
}: {
  lang: string;
  baseUrl: string;
  menu: { footer: INavigationLink[] };
}) => {
  const { copyright } = config.params;

  return (
    <footer className="bg-theme-light dark:bg-darkmode-theme-light">
      <div className="border-t border-border py-7 dark:border-darkmode-border">
        <div className="container text-center text-primary dark:text-dark">
          <p>{`${copyright}${baseUrl}`}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
