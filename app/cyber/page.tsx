"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Shield,
  Lock,
  Eye,
  AlertTriangle,
  FileCheck,
  GraduationCap,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";

const services = [
  {
    icon: Shield,
    title: "Audit & Conformité",
    description:
      "Évaluez votre niveau de sécurité et respectez les réglementations.",
    features: [
      "Audit de sécurité (ISO 27001, NIS2)",
      "Tests d'intrusion (Pentest)",
      "Analyse de vulnérabilités",
    ],
  },
  {
    icon: Lock,
    title: "Protection des données",
    description:
      "Sécurisez vos données sensibles contre les menaces.",
    features: [
      "Chiffrement & DLP",
      "Gestion des identités (IAM)",
      "Protection endpoint (EDR/XDR)",
    ],
  },
  {
    icon: Eye,
    title: "SOC & Surveillance",
    description:
      "Détection et réponse aux incidents en temps réel.",
    features: [
      "SOC managé 24/7",
      "SIEM & analyse comportementale",
      "Threat Intelligence",
    ],
  },
  {
    icon: AlertTriangle,
    title: "Réponse aux incidents",
    description:
      "Intervention rapide en cas de cyberattaque.",
    features: [
      "Cellule de crise cyber",
      "Forensic & investigation",
      "Plan de remédiation",
    ],
  },
  {
    icon: FileCheck,
    title: "GRC & Gouvernance",
    description:
      "Structurez votre approche de la cybersécurité.",
    features: [
      "Politique de sécurité (PSSI)",
      "Gestion des risques cyber",
      "Conformité RGPD & LPM",
    ],
  },
  {
    icon: GraduationCap,
    title: "Sensibilisation",
    description:
      "Formez vos collaborateurs aux bonnes pratiques.",
    features: [
      "Campagnes de phishing simulé",
      "Formation cybersécurité",
      "Exercices de crise",
    ],
  },
];

export default function CyberPage() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center bg-gradient-to-b from-red-50 to-white overflow-hidden">
        <Spotlight className="top-0 left-0" fill="#EF4444" />
        <div className="container mx-auto px-6 py-24 relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 rounded-full text-red-600 text-sm font-medium mb-6"
            >
              <Shield className="h-4 w-4" />
              Cybersécurité
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold text-ebmc-black mb-6"
            >
              Protégez votre entreprise{" "}
              <span className="text-red-600">contre les cybermenaces</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-ebmc-gray mb-8 max-w-2xl"
            >
              Audit, protection, détection et réponse : notre équipe d'experts
              en cybersécurité vous accompagne face à l'évolution constante
              des menaces.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Button size="lg" className="bg-red-600 hover:bg-red-700" asChild>
                <Link href="/contact?subject=cyber">
                  Évaluer ma sécurité
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-ebmc-black mb-4"
            >
              Nos expertises Cybersécurité
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="text-ebmc-gray text-lg max-w-2xl mx-auto"
            >
              Une approche globale pour sécuriser votre entreprise
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-xl bg-red-50 flex items-center justify-center mb-4">
                      <service.icon className="h-6 w-6 text-red-600" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-ebmc-gray mb-4">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2 text-sm text-ebmc-gray"
                        >
                          <CheckCircle2 className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-red-600">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-5xl font-bold mb-2">200+</div>
              <div className="text-red-100">audits réalisés</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">0</div>
              <div className="text-red-100">brèche chez nos clients</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">SOC</div>
              <div className="text-red-100">24/7 managé</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">PASSI</div>
              <div className="text-red-100">certification ANSSI</div>
            </div>
          </div>
        </div>
      </section>

      {/* Alert Banner */}
      <section className="py-12 bg-yellow-50 border-y border-yellow-200">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="font-semibold text-ebmc-black">
                  Victime d'une cyberattaque ?
                </h3>
                <p className="text-ebmc-gray text-sm">
                  Notre équipe d'intervention est disponible 24h/24
                </p>
              </div>
            </div>
            <Button variant="outline" className="border-yellow-600 text-yellow-700 hover:bg-yellow-100" asChild>
              <Link href="tel:+33100000000">
                Appeler la hotline cyber
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-6">
          <div className="bg-white rounded-3xl p-12 text-center shadow-soft">
            <h2 className="text-3xl font-bold text-ebmc-black mb-4">
              Évaluez votre niveau de cybersécurité
            </h2>
            <p className="text-ebmc-gray mb-8 max-w-2xl mx-auto">
              Demandez un diagnostic gratuit pour identifier vos vulnérabilités
              et définir un plan d'action adapté à votre contexte.
            </p>
            <Button size="lg" className="bg-red-600 hover:bg-red-700" asChild>
              <Link href="/contact?subject=cyber">
                Demander un audit
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
