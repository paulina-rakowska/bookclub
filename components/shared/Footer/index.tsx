"use client";
import { BookOpenText } from "lucide-react";
import Link from "next/link";
import Image from 'next/image';
import { IoLogoFacebook, IoLogoTiktok  } from "react-icons/io5";
import { FaYoutube } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FiInstagram } from "react-icons/fi";
import { GrLinkedin } from "react-icons/gr";

// Required for client-side components

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="row-start-3 flex flex-wrap flex-col items-center justify-center bg-gray-800">
      <div className="flex flex-wrap items-center justify-center gap-10 pt-17 pb-4 mx-auto max-w-4xl border-b border-white mb-6">
        <div>
          <Link
            className="inline-block text-lg md:text-xl text-white font-medium"
            href="/"
          >
              <div className="w-10 h-8 bg-white rounded-lg flex items-center justify-center relative z-10">
                <BookOpenText className="h-5 w-5 text-primary" />
              </div>
          </Link>
        </div>
        <div>
          <Link
            className="inline-block text-md text-white hover:border-b py-[2px] font-medium text-shadow-lg/20"
            href="/books"
          >
            Books
          </Link>
        </div>
        <div>
          <Link
            className="inline-block text-md text-white hover:border-b py-[2px] font-medium text-shadow-lg/20"
            href="/authors"
          >
            Authors
          </Link>
        </div>
        <div>
          <Link
            className="inline-block text-md text-white hover:border-b py-[2px] font-medium text-shadow-lg/20"
            href="/membership"
          >
            Membership
          </Link>
        </div>
        <div>
          <Link
            className="inline-block text-md text-white hover:border-b py-[2px] font-medium text-shadow-lg/20"
            href="/privacy-policy"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
      <div className="social-icons mx-auto max-w-4xl flex flex-row mb-6 gap-x-4">
        <Link href="/facebook">
          <IoLogoFacebook size="30" color="white"/>
        </Link>
        <Link href="/youtube">
          <FaYoutube size="30" color="white"/>
        </Link>
        <Link href="/twitter">
          <FaSquareXTwitter size="30" color="white"/>
        </Link>
        <Link href="/instagram">
          <FiInstagram size="30" color="white" />
        </Link>
        <Link href="/linkedin">
          <GrLinkedin size="30" color="white" />
        </Link>
        <Link href="/tiktok">
          <IoLogoTiktok size="30" color="white" />
        </Link>
      </div>
      <div className="container px-4 mx-auto">
        <p className="py-[2px]0 md:pb-10 text-xs text-white text-shadow-lg/30 font-medium text-center">
          © {year | 2025} BookClub. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
