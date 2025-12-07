"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Search,
  Filter,
  MapPin,
  Briefcase,
  Mail,
  Linkedin,
  ArrowRight,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Spotlight } from "@/components/ui/spotlight";

// Mock data - will be replaced by API data from Boondmanager
const mockCandidates = [
  {
    id: "1",
    firstName: "Jean",
    lastName: "Dupont",
    title: "Consultant SAP FI/CO",
    experience: "8 ans",
    location: "Paris",
    skills: ["SAP FI", "SAP CO", "S/4HANA", "Migration"],
    available: true,
    department: "SAP",
  },
  {
    id: "2",
    firstName: "Marie",
    lastName: "Martin",
    title: "Développeur ABAP Senior",
    experience: "6 ans",
    location: "Lyon",
    skills: ["ABAP", "ABAP OO", "CDS Views", "Fiori"],
    available: true,
    department: "SAP",
  },
  {
    id: "3",
    firstName: "Pierre",
    lastName: "Bernard",
    title: "Architecte Cloud Azure",
    experience: "10 ans",
    location: "Paris",
    skills: ["Azure", "AWS", "Terraform", "Kubernetes"],
    available: false,
    department: "ICT",
  },
  {
    id: "4",
    firstName: "Sophie",
    lastName: "Leroy",
    title: "Analyste SOC Senior",
    experience: "5 ans",
    location: "Nantes",
    skills: ["SIEM", "Splunk", "Threat Intel", "MITRE ATT&CK"],
    available: true,
    department: "CYBER",
  },
  {
    id: "5",
    firstName: "Lucas",
    lastName: "Moreau",
    title: "Chef de projet SAP",
    experience: "12 ans",
    location: "Remote",
    skills: ["SAP Activate", "PMO", "Agile", "S/4HANA"],
    available: true,
    department: "SAP",
  },
  {
    id: "6",
    firstName: "Emma",
    lastName: "Petit",
    title: "Pentester",
    experience: "4 ans",
    location: "Paris",
    skills: ["Pentest", "OWASP", "Burp Suite", "Cobalt Strike"],
    available: true,
    department: "CYBER",
  },
];

const departments = ["Tous", "SAP", "ICT", "CYBER"];

export default function CandidatsPage() {
  const [search, setSearch] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("Tous");
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);

  const filteredCandidates = useMemo(() => {
    return mockCandidates.filter((candidate) => {
      const matchesSearch =
        search === "" ||
        candidate.firstName.toLowerCase().includes(search.toLowerCase()) ||
        candidate.lastName.toLowerCase().includes(search.toLowerCase()) ||
        candidate.title.toLowerCase().includes(search.toLowerCase()) ||
        candidate.skills.some((skill) =>
          skill.toLowerCase().includes(search.toLowerCase())
        );
      const matchesDepartment =
        selectedDepartment === "Tous" ||
        candidate.department === selectedDepartment;
      const matchesAvailability = !showAvailableOnly || candidate.available;

      return matchesSearch && matchesDepartment && matchesAvailability;
    });
  }, [search, selectedDepartment, showAvailableOnly]);

  const getDepartmentColor = (dept: string) => {
    switch (dept) {
      case "SAP":
        return "bg-blue-100 text-blue-600";
      case "ICT":
        return "bg-green-100 text-green-600";
      case "CYBER":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center bg-gradient-to-b from-purple-50 to-white overflow-hidden">
        <Spotlight className="top-0 left-0" fill="#8B5CF6" />
        <div className="container mx-auto px-6 py-24 relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full text-purple-600 text-sm font-medium mb-6"
            >
              <Users className="h-4 w-4" />
              {mockCandidates.filter((c) => c.available).length} talents disponibles
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-ebmc-black mb-6"
            >
              Nos talents
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-ebmc-gray max-w-2xl"
            >
              Découvrez nos consultants experts en SAP, ICT et Cybersécurité,
              prêts à intégrer vos projets.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-ebmc-gray" />
              <Input
                placeholder="Rechercher par nom, titre ou compétence..."
                className="pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                {departments.map((dept) => (
                  <button
                    key={dept}
                    onClick={() => setSelectedDepartment(dept)}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      selectedDepartment === dept
                        ? "bg-white shadow text-ebmc-black"
                        : "text-ebmc-gray hover:text-ebmc-black"
                    }`}
                  >
                    {dept}
                  </button>
                ))}
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showAvailableOnly}
                  onChange={(e) => setShowAvailableOnly(e.target.checked)}
                  className="rounded border-gray-300"
                />
                <span className="text-sm text-ebmc-gray">
                  Disponibles uniquement
                </span>
              </label>
            </div>
          </div>
        </div>
      </section>

      {/* Candidates Grid */}
      <section className="py-12 bg-muted min-h-[50vh]">
        <div className="container mx-auto px-6">
          {filteredCandidates.length === 0 ? (
            <div className="text-center py-16">
              <div className="h-16 w-16 mx-auto rounded-full bg-gray-200 flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-ebmc-gray" />
              </div>
              <h3 className="text-xl font-semibold text-ebmc-black mb-2">
                Aucun candidat trouvé
              </h3>
              <p className="text-ebmc-gray mb-6">
                Essayez de modifier vos critères de recherche
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearch("");
                  setSelectedDepartment("Tous");
                  setShowAvailableOnly(false);
                }}
              >
                Réinitialiser les filtres
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCandidates.map((candidate, index) => (
                <motion.div
                  key={candidate.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-semibold">
                            {candidate.firstName[0]}
                            {candidate.lastName[0]}
                          </div>
                          <div>
                            <h3 className="font-semibold text-ebmc-black">
                              {candidate.firstName} {candidate.lastName}
                            </h3>
                            <p className="text-sm text-ebmc-gray">
                              {candidate.title}
                            </p>
                          </div>
                        </div>
                        {candidate.available && (
                          <span className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs font-medium">
                            <span className="h-2 w-2 rounded-full bg-green-500"></span>
                            Disponible
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-sm text-ebmc-gray mb-4">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {candidate.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Briefcase className="h-4 w-4" />
                          {candidate.experience}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-medium ${getDepartmentColor(
                            candidate.department
                          )}`}
                        >
                          {candidate.department}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {candidate.skills.slice(0, 4).map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-1 bg-gray-100 rounded text-xs text-ebmc-gray"
                          >
                            {skill}
                          </span>
                        ))}
                        {candidate.skills.length > 4 && (
                          <span className="px-2 py-1 bg-gray-100 rounded text-xs text-ebmc-gray">
                            +{candidate.skills.length - 4}
                          </span>
                        )}
                      </div>

                      <Button variant="outline" className="w-full" asChild>
                        <Link href={`/contact?subject=candidat&id=${candidate.id}`}>
                          Contacter ce profil
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="bg-purple-50 rounded-3xl p-12 text-center">
            <h2 className="text-2xl font-bold text-ebmc-black mb-4">
              Vous recherchez un profil spécifique ?
            </h2>
            <p className="text-ebmc-gray mb-6 max-w-2xl mx-auto">
              Décrivez-nous votre besoin, notre équipe vous proposera les meilleurs
              candidats de notre vivier.
            </p>
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700" asChild>
              <Link href="/contact?subject=recrutement">
                Nous contacter
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
