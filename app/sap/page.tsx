"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Database,
  Cloud,
  Layers,
  Code,
  BarChart3,
  Settings,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";

const services = [
  {
    icon: Database,
    title: "Migration S/4HANA",
    description:
      "Accompagnement complet pour votre transition vers S/4HANA.",
    features: [
      "Brownfield : migration technique avec continuité métier",
      "Greenfield : refonte totale des processus",
      "Selective Data Transition : approche hybride",
    ],
  },
  {
    icon: Cloud,
    title: "Cloud SAP & RISE",
    description:
      "Déployez SAP dans le cloud avec une architecture moderne.",
    features: [
      "RISE with SAP : transformation cloud complète",
      "Intégration AWS, Azure, Google Cloud",
      "Déploiement modulaire public/private",
    ],
  },
  {
    icon: Layers,
    title: "Modules fonctionnels",
    description:
      "Expertise sur l'ensemble des modules SAP.",
    features: [
      "Finance & Contrôle : FI / CO / TR",
      "Achats & Logistique : MM / SD / EWM",
      "RH & Talents : HCM / SuccessFactors",
    ],
  },
  {
    icon: Code,
    title: "Développement SAP",
    description:
      "Développements sur mesure pour étendre vos capacités.",
    features: [
      "ABAP / ABAP OO / CDS Views",
      "SAP Fiori / UI5 / UX Design",
      "SAP BTP : extensions cloud-native",
    ],
  },
  {
    icon: BarChart3,
    title: "Data & Analytics",
    description:
      "Exploitez la puissance de vos données SAP.",
    features: [
      "Intégration de données multi-sources",
      "SAP Analytics Cloud (SAC)",
      "SAP Datasphere & Data Warehouse",
    ],
  },
  {
    icon: Settings,
    title: "Méthodologie projet",
    description:
      "Une approche éprouvée pour garantir le succès.",
    features: [
      "SAP Activate : méthodologie agile",
      "Sprints courts et livrables réguliers",
      "Support post-go-live et TMA",
    ],
  },
];

export default function SAPPage() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center bg-gradient-to-b from-blue-50 to-white overflow-hidden">
        <Spotlight className="top-0 left-0" fill="#3B82F6" />
        <div className="container mx-auto px-6 py-24 relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full text-blue-600 text-sm font-medium mb-6"
            >
              <Database className="h-4 w-4" />
              SAP Silver Partner
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold text-ebmc-black mb-6"
            >
              L'excellence <span className="text-blue-600">SAP</span> au service
              de votre transformation
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-ebmc-gray mb-8 max-w-2xl"
            >
              Depuis 2006, nous accompagnons les entreprises dans leurs projets
              SAP les plus ambitieux. Migration S/4HANA, Cloud, modules
              fonctionnels : notre expertise est votre atout.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700" asChild>
                <Link href="/contact?subject=sap">
                  Discuter de votre projet
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
              Nos expertises SAP
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="text-ebmc-gray text-lg max-w-2xl mx-auto"
            >
              Une offre complète pour répondre à tous vos enjeux ERP
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
                    <div className="h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
                      <service.icon className="h-6 w-6 text-blue-600" />
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
                          <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
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
      <section className="py-16 bg-blue-600">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-5xl font-bold mb-2">19+</div>
              <div className="text-blue-100">années d'expertise</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">2500+</div>
              <div className="text-blue-100">consultants SAP</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">Silver</div>
              <div className="text-blue-100">SAP Partner</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">100%</div>
              <div className="text-blue-100">de satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-6">
          <div className="bg-white rounded-3xl p-12 text-center shadow-soft">
            <h2 className="text-3xl font-bold text-ebmc-black mb-4">
              Prêt à transformer votre SI avec SAP ?
            </h2>
            <p className="text-ebmc-gray mb-8 max-w-2xl mx-auto">
              Nos experts sont à votre disposition pour analyser vos besoins et
              vous proposer la meilleure approche.
            </p>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700" asChild>
              <Link href="/contact?subject=sap">
                Contactez-nous
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
