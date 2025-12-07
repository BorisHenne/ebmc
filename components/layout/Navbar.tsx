"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "./LanguageSwitcher";
import {
  Home,
  Database,
  Cloud,
  Shield,
  Users,
  Mail,
  Menu,
  X,
  LogIn,
} from "lucide-react";

interface NavItem {
  key: string;
  href: string;
  icon: React.ReactNode;
}

export function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    { key: "home", href: `/${locale}`, icon: <Home className="h-4 w-4" /> },
    { key: "sap", href: `/${locale}/sap`, icon: <Database className="h-4 w-4" /> },
    { key: "ict", href: `/${locale}/ict`, icon: <Cloud className="h-4 w-4" /> },
    { key: "cyber", href: `/${locale}/cybersecurite`, icon: <Shield className="h-4 w-4" /> },
    { key: "careers", href: `/${locale}/carrieres`, icon: <Users className="h-4 w-4" /> },
    { key: "contact", href: `/${locale}/contact`, icon: <Mail className="h-4 w-4" /> },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-white/80 dark:bg-ebmc-dark/80 backdrop-blur-lg shadow-lg"
            : "bg-transparent"
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href={`/${locale}`} className="flex items-center space-x-3">
              <div className="relative w-12 h-12">
                <Image
                  src="/logo-ebmc.svg"
                  alt="EBMC GROUP"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <span
                className={cn(
                  "font-display font-bold text-xl hidden sm:block transition-colors",
                  isScrolled
                    ? "text-ebmc-dark dark:text-white"
                    : "text-white"
                )}
              >
                EBMC GROUP
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    "hover:bg-ebmc-primary/10 hover:text-ebmc-primary",
                    isScrolled
                      ? "text-ebmc-dark dark:text-gray-200"
                      : "text-white/90 hover:text-white"
                  )}
                >
                  <span className="flex items-center gap-2">
                    {item.icon}
                    {t(item.key)}
                  </span>
                </Link>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              <LanguageSwitcher />

              {/* Login Button */}
              <Link
                href={`/${locale}/connexion`}
                className={cn(
                  "hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  "bg-ebmc-primary hover:bg-ebmc-primary-dark text-white"
                )}
              >
                <LogIn className="h-4 w-4" />
                {t("login")}
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={cn(
                  "lg:hidden p-2 rounded-lg transition-colors",
                  isScrolled
                    ? "text-ebmc-dark dark:text-white"
                    : "text-white"
                )}
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-20 z-40 lg:hidden"
          >
            <div className="bg-white dark:bg-ebmc-dark shadow-xl border-t border-gray-100 dark:border-gray-800">
              <nav className="container mx-auto px-4 py-4">
                <div className="flex flex-col space-y-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.key}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-ebmc-dark dark:text-white hover:bg-ebmc-primary/10 hover:text-ebmc-primary transition-colors"
                    >
                      {item.icon}
                      {t(item.key)}
                    </Link>
                  ))}
                  <hr className="my-2 border-gray-200 dark:border-gray-700" />
                  <Link
                    href={`/${locale}/connexion`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg bg-ebmc-primary text-white hover:bg-ebmc-primary-dark transition-colors"
                  >
                    <LogIn className="h-4 w-4" />
                    {t("login")}
                  </Link>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
