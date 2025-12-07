"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  MapPin,
  Clock,
  Filter,
  Search,
  ArrowRight,
  Building,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Spotlight } from "@/components/ui/spotlight";

// Mock data - will be replaced by API data from Boondmanager
const mockOffers = [
  {
    id: "1",
    title: "Consultant SAP FI/CO Senior",
    slug: "consultant-sap-fico-senior",
    department: "SAP",
    location: "Paris",
    type: "CDI",
    experience: "5+ ans",
    skills: ["SAP FI", "SAP CO", "S/4HANA"],
    published: true,
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    title: "Développeur ABAP",
    slug: "developpeur-abap",
    department: "SAP",
    location: "Lyon",
    type: "CDI",
    experience: "3+ ans",
    skills: ["ABAP", "ABAP OO", "CDS Views"],
    published: true,
    createdAt: new Date("2024-01-10"),
  },
  {
    id: "3",
    title: "Ingénieur Cloud Azure",
    slug: "ingenieur-cloud-azure",
    department: "ICT",
    location: "Paris",
    type: "CDI",
    experience: "3+ ans",
    skills: ["Azure", "Terraform", "Kubernetes"],
    published: true,
    createdAt: new Date("2024-01-08"),
  },
  {
    id: "4",
    title: "Analyste SOC",
    slug: "analyste-soc",
    department: "CYBER",
    location: "Nantes",
    type: "CDI",
    experience: "2+ ans",
    skills: ["SIEM", "Threat Intel", "Incident Response"],
    published: true,
    createdAt: new Date("2024-01-05"),
  },
  {
    id: "5",
    title: "Chef de projet SAP",
    slug: "chef-projet-sap",
    department: "SAP",
    location: "Remote",
    type: "CDI",
    experience: "7+ ans",
    skills: ["SAP Activate", "PMO", "S/4HANA"],
    published: true,
    createdAt: new Date("2024-01-03"),
  },
  {
    id: "6",
    title: "Pentester",
    slug: "pentester",
    department: "CYBER",
    location: "Paris",
    type: "CDI",
    experience: "3+ ans",
    skills: ["Pentest", "OWASP", "Burp Suite"],
    published: true,
    createdAt: new Date("2024-01-01"),
  },
];

const departments = ["Tous", "SAP", "ICT", "CYBER"];
const locations = ["Toutes", "Paris", "Lyon", "Nantes", "Bordeaux", "Remote"];
const contractTypes = ["Tous", "CDI", "CDD", "Freelance", "Stage", "Alternance"];

function OffresContent() {
  const searchParams = useSearchParams();
  const initialDepartment = searchParams.get("department")?.toUpperCase() || "Tous";

  const [search, setSearch] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState(initialDepartment === "TOUS" ? "Tous" : initialDepartment);
  const [selectedLocation, setSelectedLocation] = useState("Toutes");
  const [selectedType, setSelectedType] = useState("Tous");

  const filteredOffers = useMemo(() => {
    return mockOffers.filter((offer) => {
      const matchesSearch =
        search === "" ||
        offer.title.toLowerCase().includes(search.toLowerCase()) ||
        offer.skills.some((skill) =>
          skill.toLowerCase().includes(search.toLowerCase())
        );
      const matchesDepartment =
        selectedDepartment === "Tous" || offer.department === selectedDepartment;
      const matchesLocation =
        selectedLocation === "Toutes" || offer.location === selectedLocation;
      const matchesType =
        selectedType === "Tous" || offer.type === selectedType;

      return matchesSearch && matchesDepartment && matchesLocation && matchesType;
    });
  }, [search, selectedDepartment, selectedLocation, selectedType]);

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
      <section className="relative min-h-[40vh] flex items-center bg-gradient-to-b from-ebmc-teal/10 to-white overflow-hidden">
        <Spotlight className="top-0 left-0" fill="#2AA198" />
        <div className="container mx-auto px-6 py-24 relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-ebmc-teal/20 rounded-full text-ebmc-teal text-sm font-medium mb-6"
            >
              <Briefcase className="h-4 w-4" />
              {mockOffers.length} offres disponibles
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-ebmc-black mb-6"
            >
              Nos offres d'emploi
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-ebmc-gray max-w-2xl"
            >
              Trouvez le poste qui correspond à vos compétences et aspirations.
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
                placeholder="Rechercher par titre ou compétence..."
                className="pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
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
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="px-3 py-2 rounded-lg border bg-white text-sm"
            >
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc === "Toutes" ? "Toutes les villes" : loc}
                </option>
              ))}
            </select>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 rounded-lg border bg-white text-sm"
            >
              {contractTypes.map((type) => (
                <option key={type} value={type}>
                  {type === "Tous" ? "Tous les contrats" : type}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Offers List */}
      <section className="py-12 bg-muted min-h-[50vh]">
        <div className="container mx-auto px-6">
          {filteredOffers.length === 0 ? (
            <div className="text-center py-16">
              <div className="h-16 w-16 mx-auto rounded-full bg-gray-200 flex items-center justify-center mb-4">
                <Briefcase className="h-8 w-8 text-ebmc-gray" />
              </div>
              <h3 className="text-xl font-semibold text-ebmc-black mb-2">
                Aucune offre trouvée
              </h3>
              <p className="text-ebmc-gray mb-6">
                Essayez de modifier vos critères de recherche
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearch("");
                  setSelectedDepartment("Tous");
                  setSelectedLocation("Toutes");
                  setSelectedType("Tous");
                }}
              >
                Réinitialiser les filtres
              </Button>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredOffers.map((offer, index) => (
                <motion.div
                  key={offer.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getDepartmentColor(
                                offer.department
                              )}`}
                            >
                              {offer.department}
                            </span>
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                              {offer.type}
                            </span>
                          </div>
                          <h3 className="text-xl font-semibold text-ebmc-black mb-2">
                            {offer.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-ebmc-gray">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {offer.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {offer.experience}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-3">
                            {offer.skills.map((skill) => (
                              <span
                                key={skill}
                                className="px-2 py-1 bg-gray-100 rounded text-xs text-ebmc-gray"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button asChild>
                            <Link href={`/offres/${offer.slug}`}>
                              Voir l'offre
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
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
          <div className="bg-ebmc-teal/10 rounded-3xl p-12 text-center">
            <h2 className="text-2xl font-bold text-ebmc-black mb-4">
              Vous ne trouvez pas l'offre idéale ?
            </h2>
            <p className="text-ebmc-gray mb-6 max-w-2xl mx-auto">
              Envoyez-nous votre candidature spontanée, nous étudions chaque profil
              avec attention.
            </p>
            <Button size="lg" asChild>
              <Link href="/contact?subject=candidature">
                Candidature spontanée
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function OffresPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Chargement...</div>}>
      <OffresContent />
    </Suspense>
  );
}
