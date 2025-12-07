"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Briefcase,
  UserCheck,
  Mail,
  TrendingUp,
  Calendar,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Stats {
  users: number;
  offers: number;
  candidates: number;
  contacts: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    users: 0,
    offers: 0,
    candidates: 0,
    contacts: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/admin/stats");
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Utilisateurs",
      value: stats.users,
      icon: Users,
      color: "blue",
      href: "/admin/users",
    },
    {
      title: "Offres d'emploi",
      value: stats.offers,
      icon: Briefcase,
      color: "green",
      href: "/admin/offers",
    },
    {
      title: "Candidats",
      value: stats.candidates,
      icon: UserCheck,
      color: "purple",
      href: "/admin/candidates",
    },
    {
      title: "Messages",
      value: stats.contacts,
      icon: Mail,
      color: "orange",
      href: "/admin/contacts",
    },
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case "blue":
        return "bg-blue-50 text-blue-600";
      case "green":
        return "bg-green-50 text-green-600";
      case "purple":
        return "bg-purple-50 text-purple-600";
      case "orange":
        return "bg-orange-50 text-orange-600";
      default:
        return "bg-gray-50 text-gray-600";
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-ebmc-black">Dashboard</h1>
        <p className="text-ebmc-gray">Vue d'ensemble de votre application</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-ebmc-gray">{stat.title}</p>
                    <p className="text-3xl font-bold text-ebmc-black mt-1">
                      {loading ? "..." : stat.value}
                    </p>
                  </div>
                  <div
                    className={`h-12 w-12 rounded-xl flex items-center justify-center ${getColorClasses(
                      stat.color
                    )}`}
                  >
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-ebmc-teal" />
              Actions rapides
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <a
              href="/admin/offers"
              className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <Briefcase className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-ebmc-black">
                Gérer les offres d'emploi
              </span>
            </a>
            <a
              href="/admin/candidates"
              className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <UserCheck className="h-5 w-5 text-purple-600" />
              <span className="text-sm font-medium text-ebmc-black">
                Voir les candidats
              </span>
            </a>
            <a
              href="/admin/users"
              className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <Users className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-ebmc-black">
                Gérer les utilisateurs
              </span>
            </a>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-ebmc-teal" />
              Activité récente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span className="text-ebmc-gray">
                  Nouvelle candidature reçue
                </span>
                <span className="text-xs text-ebmc-gray ml-auto">
                  Il y a 2h
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                <span className="text-ebmc-gray">
                  Offre "Consultant SAP" publiée
                </span>
                <span className="text-xs text-ebmc-gray ml-auto">
                  Il y a 4h
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                <span className="text-ebmc-gray">
                  Nouveau contact via le formulaire
                </span>
                <span className="text-xs text-ebmc-gray ml-auto">
                  Il y a 1j
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
