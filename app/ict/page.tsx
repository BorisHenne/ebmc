"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Server,
  Cloud,
  Network,
  Shield,
  Headphones,
  Wrench,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";

const services = [
  {
    icon: Server,
    title: "Infrastructure IT",
    description:
      "Conception et déploiement d'infrastructures robustes et évolutives.",
    features: [
      "Architecture on-premise et hybride",
      "Virtualisation VMware, Hyper-V",
      "Stockage SAN/NAS haute performance",
    ],
  },
  {
    icon: Cloud,
    title: "Cloud Computing",
    description:
      "Migration et gestion de vos environnements cloud.",
    features: [
      "Microsoft Azure & AWS",
      "Migration cloud sécurisée",
      "Optimisation des coûts FinOps",
    ],
  },
  {
    icon: Network,
    title: "Réseaux & Télécoms",
    description:
      "Connectivité performante et sécurisée pour votre entreprise.",
    features: [
      "Architecture réseau LAN/WAN",
      "SD-WAN & VPN sécurisés",
      "WiFi entreprise haute densité",
    ],
  },
  {
    icon: Shield,
    title: "Sécurité IT",
    description:
      "Protection de vos systèmes et données sensibles.",
    features: [
      "Firewall nouvelle génération",
      "Protection endpoint (EDR/XDR)",
      "Sauvegarde & Plan de reprise",
    ],
  },
  {
    icon: Headphones,
    title: "Support & Helpdesk",
    description:
      "Assistance technique réactive pour vos utilisateurs.",
    features: [
      "Support niveau 1, 2 et 3",
      "Supervision proactive 24/7",
      "Gestion de parc ITSM",
    ],
  },
  {
    icon: Wrench,
    title: "Maintenance & TMA",
    description:
      "Maintien en condition opérationnelle de vos systèmes.",
    features: [
      "Contrats de maintenance sur mesure",
      "Mises à jour et patches",
      "Évolution continue de vos SI",
    ],
  },
];

export default function ICTPage() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center bg-gradient-to-b from-green-50 to-white overflow-hidden">
        <Spotlight className="top-0 left-0" fill="#10B981" />
        <div className="container mx-auto px-6 py-24 relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full text-green-600 text-sm font-medium mb-6"
            >
              <Server className="h-4 w-4" />
              Infrastructure & Cloud
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold text-ebmc-black mb-6"
            >
              Votre partenaire{" "}
              <span className="text-green-600">ICT</span> de confiance
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-ebmc-gray mb-8 max-w-2xl"
            >
              Infrastructure, cloud, réseaux et support : nous concevons,
              déployons et maintenons les systèmes d'information qui portent
              votre activité.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Button size="lg" className="bg-green-600 hover:bg-green-700" asChild>
                <Link href="/contact?subject=ict">
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
              Nos services ICT
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="text-ebmc-gray text-lg max-w-2xl mx-auto"
            >
              Une offre complète pour moderniser et sécuriser votre SI
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
                    <div className="h-12 w-12 rounded-xl bg-green-50 flex items-center justify-center mb-4">
                      <service.icon className="h-6 w-6 text-green-600" />
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
      <section className="py-16 bg-green-600">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-5xl font-bold mb-2">500+</div>
              <div className="text-green-100">clients accompagnés</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">99.9%</div>
              <div className="text-green-100">de disponibilité</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">24/7</div>
              <div className="text-green-100">supervision</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">15min</div>
              <div className="text-green-100">temps de réponse</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-6">
          <div className="bg-white rounded-3xl p-12 text-center shadow-soft">
            <h2 className="text-3xl font-bold text-ebmc-black mb-4">
              Modernisez votre infrastructure IT
            </h2>
            <p className="text-ebmc-gray mb-8 max-w-2xl mx-auto">
              Nos experts analysent votre existant et vous proposent des
              solutions adaptées à vos enjeux métier et budgétaires.
            </p>
            <Button size="lg" className="bg-green-600 hover:bg-green-700" asChild>
              <Link href="/contact?subject=ict">
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
