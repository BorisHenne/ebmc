"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

interface JobOffer {
  id: string;
  title: string;
  slug: string;
  department: string;
  location: string;
  type: string;
  experience: string | null;
  published: boolean;
  createdAt: string;
}

const departments = ["SAP", "ICT", "CYBER", "OTHER"];
const contractTypes = ["CDI", "CDD", "FREELANCE", "STAGE", "ALTERNANCE"];

export default function AdminOffersPage() {
  const [offers, setOffers] = useState<JobOffer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingOffer, setEditingOffer] = useState<JobOffer | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    department: "SAP",
    location: "",
    type: "CDI",
    experience: "",
    salary: "",
    skills: "",
    published: false,
    boondId: "",
  });

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      const res = await fetch("/api/admin/offers");
      if (res.ok) {
        const data = await res.json();
        setOffers(data.offers);
      }
    } catch (error) {
      console.error("Error fetching offers:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const url = editingOffer
      ? `/api/admin/offers/${editingOffer.id}`
      : "/api/admin/offers";
    const method = editingOffer ? "PUT" : "POST";

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
        fetchOffers();
        closeModal();
      }
    } catch (error) {
      console.error("Error saving offer:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer cette offre ?")) return;

    try {
      const res = await fetch(`/api/admin/offers/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchOffers();
      }
    } catch (error) {
      console.error("Error deleting offer:", error);
    }
  };

  const togglePublish = async (offer: JobOffer) => {
    try {
      const res = await fetch(`/api/admin/offers/${offer.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !offer.published }),
      });

      if (res.ok) {
        fetchOffers();
      }
    } catch (error) {
      console.error("Error toggling publish:", error);
    }
  };

  const openModal = async (offer?: JobOffer) => {
    if (offer) {
      // Fetch full offer details
      try {
        const res = await fetch(`/api/admin/offers/${offer.id}`);
        if (res.ok) {
          const data = await res.json();
          setEditingOffer(offer);
          setFormData({
            title: data.offer.title,
            description: data.offer.description || "",
            department: data.offer.department,
            location: data.offer.location,
            type: data.offer.type,
            experience: data.offer.experience || "",
            salary: data.offer.salary || "",
            skills: data.offer.skills?.join(", ") || "",
            published: data.offer.published,
            boondId: data.offer.boondId || "",
          });
        }
      } catch (error) {
        console.error("Error fetching offer:", error);
      }
    } else {
      setEditingOffer(null);
      setFormData({
        title: "",
        description: "",
        department: "SAP",
        location: "",
        type: "CDI",
        experience: "",
        salary: "",
        skills: "",
        published: false,
        boondId: "",
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingOffer(null);
  };

  const filteredOffers = offers.filter((offer) =>
    offer.title.toLowerCase().includes(search.toLowerCase())
  );

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
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-ebmc-black">Offres d'emploi</h1>
          <p className="text-ebmc-gray">Gérez les offres de recrutement</p>
        </div>
        <Button onClick={() => openModal()}>
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle offre
        </Button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-ebmc-gray" />
          <Input
            placeholder="Rechercher..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Offers Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-medium text-ebmc-gray uppercase tracking-wider">
                    Offre
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-ebmc-gray uppercase tracking-wider">
                    Département
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-ebmc-gray uppercase tracking-wider">
                    Contrat
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
                    <td colSpan={5} className="px-6 py-8 text-center text-ebmc-gray">
                      Chargement...
                    </td>
                  </tr>
                ) : filteredOffers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-ebmc-gray">
                      Aucune offre trouvée
                    </td>
                  </tr>
                ) : (
                  filteredOffers.map((offer) => (
                    <tr key={offer.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-ebmc-black">
                            {offer.title}
                          </p>
                          <p className="text-sm text-ebmc-gray flex items-center gap-1 mt-1">
                            <MapPin className="h-3 w-3" />
                            {offer.location}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getDepartmentColor(
                            offer.department
                          )}`}
                        >
                          {offer.department}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-ebmc-gray">
                          {offer.type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => togglePublish(offer)}
                          className={`flex items-center gap-1 text-sm ${
                            offer.published
                              ? "text-green-600"
                              : "text-gray-400"
                          }`}
                        >
                          {offer.published ? (
                            <>
                              <Eye className="h-4 w-4" />
                              Publiée
                            </>
                          ) : (
                            <>
                              <EyeOff className="h-4 w-4" />
                              Brouillon
                            </>
                          )}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openModal(offer)}
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:bg-red-50"
                            onClick={() => handleDelete(offer.id)}
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
              {editingOffer ? "Modifier l'offre" : "Nouvelle offre"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-ebmc-black mb-1">
                    Titre
                  </label>
                  <Input
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ebmc-black mb-1">
                    Département
                  </label>
                  <select
                    className="w-full px-3 py-2 border rounded-lg"
                    value={formData.department}
                    onChange={(e) =>
                      setFormData({ ...formData, department: e.target.value })
                    }
                  >
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-ebmc-black mb-1">
                    Type de contrat
                  </label>
                  <select
                    className="w-full px-3 py-2 border rounded-lg"
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                  >
                    {contractTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-ebmc-black mb-1">
                    Localisation
                  </label>
                  <Input
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    required
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
                    placeholder="3+ ans"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ebmc-black mb-1">
                    Salaire
                  </label>
                  <Input
                    value={formData.salary}
                    onChange={(e) =>
                      setFormData({ ...formData, salary: e.target.value })
                    }
                    placeholder="45-55k€"
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
                    Description
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border rounded-lg min-h-[150px]"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.published}
                      onChange={(e) =>
                        setFormData({ ...formData, published: e.target.checked })
                      }
                    />
                    <span className="text-sm text-ebmc-black">
                      Publier l'offre
                    </span>
                  </label>
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <Button type="button" variant="outline" onClick={closeModal}>
                  Annuler
                </Button>
                <Button type="submit">
                  {editingOffer ? "Modifier" : "Créer"}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
