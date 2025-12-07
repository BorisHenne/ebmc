"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, Linkedin } from "lucide-react";

const footerLinks = {
  services: [
    { name: "SAP", href: "/sap" },
    { name: "ICT", href: "/ict" },
    { name: "Cybersécurité", href: "/cyber" },
  ],
  company: [
    { name: "À propos", href: "/about" },
    { name: "Carrières", href: "/carrieres" },
    { name: "Contact", href: "/contact" },
  ],
  legal: [
    { name: "Mentions légales", href: "/legal" },
    { name: "Confidentialité", href: "/privacy" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-ebmc-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold tracking-tight">
                <span className="text-white">EBM</span>
                <span className="text-ebmc-teal">C</span>
              </span>
              <span className="text-sm font-semibold text-gray-400 tracking-widest">
                GROUP
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Votre partenaire européen pour la transformation digitale.
              Expertise SAP, ICT et Cybersécurité.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://linkedin.com/company/ebmcgroup"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-ebmc-teal transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-ebmc-teal transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Entreprise</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-ebmc-teal transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <MapPin className="h-4 w-4 text-ebmc-teal flex-shrink-0" />
                <span>Bascharage, Luxembourg</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <Mail className="h-4 w-4 text-ebmc-teal flex-shrink-0" />
                <a
                  href="mailto:contact@ebmcgroup.eu"
                  className="hover:text-ebmc-teal transition-colors"
                >
                  contact@ebmcgroup.eu
                </a>
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <Phone className="h-4 w-4 text-ebmc-teal flex-shrink-0" />
                <a
                  href="tel:+352000000"
                  className="hover:text-ebmc-teal transition-colors"
                >
                  +352 XX XXX XXX
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} EBMC GROUP. Tous droits réservés.
          </p>
          <div className="flex gap-6">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-400 hover:text-ebmc-teal transition-colors text-sm"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
