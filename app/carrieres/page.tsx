"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Users,
  Rocket,
  Heart,
  GraduationCap,
  MapPin,
  Briefcase,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";

const benefits = [
  {
    icon: Rocket,
    title: "Évolution de carrière",
    description:
      "Des parcours personnalisés et des opportunités de progression.",
  },
  {
    icon: GraduationCap,
    title: "Formation continue",
    description:
      "Accès à des certifications et formations pour développer vos compétences.",
  },
  {
    icon: Heart,
    title: "Bien-être au travail",
    description:
      "Télétravail, flexibilité horaire et environnement bienveillant.",
  },
  {
    icon: Users,
    title: "Esprit d'équipe",
    description:
      "Une communauté soudée avec des événements réguliers.",
  },
];

const departments = [
  {
    name: "SAP",
    color: "blue",
    roles: ["Consultant fonctionnel", "Développeur ABAP", "Chef de projet", "Architecte S/4HANA"],
  },
  {
    name: "ICT",
    color: "green",
    roles: ["Ingénieur système", "Admin cloud", "Technicien support", "Architecte réseau"],
  },
  {
    name: "Cybersécurité",
    color: "red",
    roles: ["Analyste SOC", "Pentester", "Consultant GRC", "Ingénieur sécurité"],
  },
];

export default function CarrieresPage() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center bg-gradient-to-b from-ebmc-teal/10 to-white overflow-hidden">
        <Spotlight className="top-0 left-0" fill="#2AA198" />
        <div className="container mx-auto px-6 py-24 relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-ebmc-teal/20 rounded-full text-ebmc-teal text-sm font-medium mb-6"
            >
              <Users className="h-4 w-4" />
              Rejoignez-nous
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold text-ebmc-black mb-6"
            >
              Construisez votre{" "}
              <span className="text-ebmc-teal">carrière</span> avec nous
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-ebmc-gray mb-8 max-w-2xl"
            >
              EBMC GROUP recherche des talents passionnés pour accompagner
              nos clients dans leurs projets de transformation digitale.
              Rejoignez une équipe dynamique et bienveillante.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Button size="lg" asChild>
                <Link href="/offres">
                  Voir nos offres
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/candidature-spontanee">
                  Candidature spontanée
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-ebmc-black mb-4"
            >
              Pourquoi nous rejoindre ?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="text-ebmc-gray text-lg max-w-2xl mx-auto"
            >
              Nous investissons dans nos collaborateurs pour qu'ils s'épanouissent
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="h-14 w-14 mx-auto rounded-2xl bg-ebmc-teal/10 flex items-center justify-center mb-4">
                      <benefit.icon className="h-7 w-7 text-ebmc-teal" />
                    </div>
                    <CardTitle className="text-lg">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-ebmc-gray text-sm">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-ebmc-black mb-4"
            >
              Nos pôles d'expertise
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="text-ebmc-gray text-lg max-w-2xl mx-auto"
            >
              Trouvez votre place dans l'un de nos trois domaines d'excellence
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {departments.map((dept, index) => (
              <motion.div
                key={dept.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <div
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-4 ${
                        dept.color === "blue"
                          ? "bg-blue-100 text-blue-600"
                          : dept.color === "green"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      <Briefcase className="h-4 w-4" />
                      Pôle {dept.name}
                    </div>
                    <CardTitle className="text-xl">Métiers {dept.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {dept.roles.map((role) => (
                        <li
                          key={role}
                          className="flex items-center gap-2 text-sm text-ebmc-gray"
                        >
                          <CheckCircle2
                            className={`h-4 w-4 ${
                              dept.color === "blue"
                                ? "text-blue-500"
                                : dept.color === "green"
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          />
                          <span>{role}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      variant="outline"
                      className="w-full mt-6"
                      asChild
                    >
                      <Link href={`/offres?department=${dept.name.toLowerCase()}`}>
                        Voir les offres {dept.name}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-ebmc-black mb-4"
            >
              Nos implantations
            </motion.h2>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {["Paris", "Lyon", "Nantes", "Bordeaux", "Lille", "Remote"].map(
              (city, index) => (
                <motion.div
                  key={city}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-ebmc-gray"
                >
                  <MapPin className="h-4 w-4 text-ebmc-teal" />
                  <span>{city}</span>
                </motion.div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-ebmc-teal">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-5xl font-bold mb-2">2500+</div>
              <div className="text-white/80">collaborateurs</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">6</div>
              <div className="text-white/80">bureaux en France</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">92%</div>
              <div className="text-white/80">de satisfaction</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">50+</div>
              <div className="text-white/80">recrutements/an</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-6">
          <div className="bg-white rounded-3xl p-12 text-center shadow-soft">
            <h2 className="text-3xl font-bold text-ebmc-black mb-4">
              Prêt à relever de nouveaux défis ?
            </h2>
            <p className="text-ebmc-gray mb-8 max-w-2xl mx-auto">
              Consultez nos offres d'emploi ou envoyez-nous votre candidature
              spontanée. Notre équipe RH vous répondra sous 48h.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/offres">
                  Voir toutes les offres
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact?subject=candidature">
                  Candidature spontanée
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
