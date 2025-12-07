"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Mail,
  Phone,
  Linkedin,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

interface Candidate {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  linkedin: string | null;
  status: string;
  experience: string | null;
  createdAt: string;
}

const statuses = [
  "NEW",
  "CONTACTED",
  "INTERVIEW",
  "TECHNICAL_TEST",
  "OFFER",
  "HIRED",
  "REJECTED",
  "ARCHIVED",
];

const statusLabels: Record<string, string> = {
  NEW: "Nouveau",
  CONTACTED: "Contacté",
  INTERVIEW: "Entretien",
  TECHNICAL_TEST: "Test technique",
  OFFER: "Offre envoyée",
  HIRED: "Embauché",
  REJECTED: "Refusé",
  ARCHIVED: "Archivé",
};

export default function AdminCandidatesPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [editingCandidate, setEditingCandidate] = useState<Candidate | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    linkedin: "",
    experience: "",
    skills: "",
    notes: "",
    status: "NEW",
    source: "",
    boondId: "",
  });

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const res = await fetch("/api/admin/candidates");
      if (res.ok) {
        const data = await res.json();
        setCandidates(data.candidates);
      }
    } catch (error) {
      console.error("Error fetching candidates:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const url = editingCandidate
      ? `/api/admin/candidates/${editingCandidate.id}`
      : "/api/admin/candidates";
    const method = editingCandidate ? "PUT" : "POST";

    const payload = {
      ...formData,
      skills: formData.skills.split(",").map((s) => s.trim()).filter(Boolean),
    };

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        fetchCandidates();
        closeModal();
      }
    } catch (error) {
      console.error("Error saving candidate:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer ce candidat ?")) return;

    try {
      const res = await fetch(`/api/admin/candidates/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchCandidates();
      }
    } catch (error) {
      console.error("Error deleting candidate:", error);
    }
  };

  const openModal = async (candidate?: Candidate) => {
    if (candidate) {
      try {
        const res = await fetch(`/api/admin/candidates/${candidate.id}`);
        if (res.ok) {
          const data = await res.json();
          setEditingCandidate(candidate);
          setFormData({
            firstName: data.candidate.firstName,
            lastName: data.candidate.lastName,
            email: data.candidate.email,
            phone: data.candidate.phone || "",
            linkedin: data.candidate.linkedin || "",
            experience: data.candidate.experience || "",
            skills: data.candidate.skills?.join(", ") || "",
            notes: data.candidate.notes || "",
            status: data.candidate.status,
            source: data.candidate.source || "",
            boondId: data.candidate.boondId || "",
          });
        }
      } catch (error) {
        console.error("Error fetching candidate:", error);
      }
    } else {
      setEditingCandidate(null);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        linkedin: "",
        experience: "",
        skills: "",
        notes: "",
        status: "NEW",
        source: "",
        boondId: "",
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingCandidate(null);
  };

  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSearch =
      candidate.firstName.toLowerCase().includes(search.toLowerCase()) ||
      candidate.lastName.toLowerCase().includes(search.toLowerCase()) ||
      candidate.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || candidate.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "NEW":
        return "bg-blue-100 text-blue-600";
      case "CONTACTED":
        return "bg-yellow-100 text-yellow-600";
      case "INTERVIEW":
        return "bg-purple-100 text-purple-600";
      case "TECHNICAL_TEST":
        return "bg-orange-100 text-orange-600";
      case "OFFER":
        return "bg-cyan-100 text-cyan-600";
      case "HIRED":
        return "bg-green-100 text-green-600";
      case "REJECTED":
        return "bg-red-100 text-red-600";
      case "ARCHIVED":
        return "bg-gray-100 text-gray-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-ebmc-black">Candidats</h1>
          <p className="text-ebmc-gray">Gérez votre vivier de candidats</p>
        </div>
        <Button onClick={() => openModal()}>
          <Plus className="h-4 w-4 mr-2" />
          Ajouter
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-ebmc-gray" />
          <Input
            placeholder="Rechercher..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="px-3 py-2 border rounded-lg bg-white"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">Tous les statuts</option>
          {statuses.map((status) => (
            <option key={status} value={status}>
              {statusLabels[status]}
            </option>
          ))}
        </select>
      </div>

      {/* Candidates Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-medium text-ebmc-gray uppercase tracking-wider">
                    Candidat
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-ebmc-gray uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-ebmc-gray uppercase tracking-wider">
                    Expérience
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-ebmc-gray uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="text-right px-6 py-3 text-xs font-medium text-ebmc-gray uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-8 text-center text-ebmc-gray"
                    >
                      Chargement...
                    </td>
                  </tr>
                ) : filteredCandidates.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-8 text-center text-ebmc-gray"
                    >
                      Aucun candidat trouvé
                    </td>
                  </tr>
                ) : (
                  filteredCandidates.map((candidate) => (
                    <tr key={candidate.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-medium">
                            {candidate.firstName[0]}
                            {candidate.lastName[0]}
                          </div>
                          <div>
                            <p className="font-medium text-ebmc-black">
                              {candidate.firstName} {candidate.lastName}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <p className="text-sm text-ebmc-gray flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {candidate.email}
                          </p>
                          {candidate.phone && (
                            <p className="text-sm text-ebmc-gray flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {candidate.phone}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-ebmc-gray">
                          {candidate.experience || "-"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            candidate.status
                          )}`}
                        >
                          {statusLabels[candidate.status]}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openModal(candidate)}
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:bg-red-50"
                            onClick={() => handleDelete(candidate.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl max-w-2xl w-full p-6 my-8"
          >
            <h2 className="text-xl font-bold text-ebmc-black mb-4">
              {editingCandidate ? "Modifier le candidat" : "Nouveau candidat"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-ebmc-black mb-1">
                    Prénom
                  </label>
                  <Input
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ebmc-black mb-1">
                    Nom
                  </label>
                  <Input
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ebmc-black mb-1">
                    Email
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ebmc-black mb-1">
                    Téléphone
                  </label>
                  <Input
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ebmc-black mb-1">
                    LinkedIn
                  </label>
                  <Input
                    value={formData.linkedin}
                    onChange={(e) =>
                      setFormData({ ...formData, linkedin: e.target.value })
                    }
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ebmc-black mb-1">
                    Expérience
                  </label>
                  <Input
                    value={formData.experience}
                    onChange={(e) =>
                      setFormData({ ...formData, experience: e.target.value })
                    }
                    placeholder="5 ans"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ebmc-black mb-1">
                    Statut
                  </label>
                  <select
                    className="w-full px-3 py-2 border rounded-lg"
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {statusLabels[status]}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-ebmc-black mb-1">
                    Source
                  </label>
                  <Input
                    value={formData.source}
                    onChange={(e) =>
                      setFormData({ ...formData, source: e.target.value })
                    }
                    placeholder="LinkedIn, Candidature spontanée..."
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-ebmc-black mb-1">
                    Compétences (séparées par des virgules)
                  </label>
                  <Input
                    value={formData.skills}
                    onChange={(e) =>
                      setFormData({ ...formData, skills: e.target.value })
                    }
                    placeholder="SAP FI, SAP CO, S/4HANA"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-ebmc-black mb-1">
                    Notes
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border rounded-lg min-h-[100px]"
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ebmc-black mb-1">
                    ID Boondmanager
                  </label>
                  <Input
                    value={formData.boondId}
                    onChange={(e) =>
                      setFormData({ ...formData, boondId: e.target.value })
                    }
                    placeholder="Optionnel"
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <Button type="button" variant="outline" onClick={closeModal}>
                  Annuler
                </Button>
                <Button type="submit">
                  {editingCandidate ? "Modifier" : "Créer"}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
