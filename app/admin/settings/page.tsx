"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Save, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Setting {
  id: string;
  key: string;
  value: string;
  label: string;
  category: string;
}

const defaultSettings = [
  { key: "company_name", label: "Nom de l'entreprise", category: "general" },
  { key: "company_address", label: "Adresse", category: "general" },
  { key: "company_phone", label: "Téléphone", category: "general" },
  { key: "company_email", label: "Email de contact", category: "general" },
  { key: "social_linkedin", label: "LinkedIn", category: "social" },
  { key: "social_twitter", label: "Twitter/X", category: "social" },
  { key: "seo_title", label: "Titre SEO par défaut", category: "seo" },
  { key: "seo_description", label: "Description SEO", category: "seo" },
];

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/admin/settings");
      if (res.ok) {
        const data = await res.json();
        setSettings(data.settings);

        // Initialize form data
        const initial: Record<string, string> = {};
        data.settings.forEach((s: Setting) => {
          initial[s.key] = s.value;
        });
        setFormData(initial);
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);

    try {
      // Update each setting
      for (const setting of defaultSettings) {
        const value = formData[setting.key] || "";
        const existing = settings.find((s) => s.key === setting.key);

        if (existing) {
          await fetch(`/api/admin/settings/${existing.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ value }),
          });
        } else if (value) {
          await fetch("/api/admin/settings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              key: setting.key,
              value,
              label: setting.label,
              category: setting.category,
            }),
          });
        }
      }

      fetchSettings();
    } catch (error) {
      console.error("Error saving settings:", error);
    } finally {
      setSaving(false);
    }
  };

  const groupedSettings = defaultSettings.reduce(
    (acc, setting) => {
      if (!acc[setting.category]) {
        acc[setting.category] = [];
      }
      acc[setting.category].push(setting);
      return acc;
    },
    {} as Record<string, typeof defaultSettings>
  );

  const categoryLabels: Record<string, string> = {
    general: "Informations générales",
    social: "Réseaux sociaux",
    seo: "SEO / Référencement",
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-ebmc-gray">Chargement...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-ebmc-black">Paramètres</h1>
          <p className="text-ebmc-gray">Configurez les paramètres du site</p>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          <Save className="h-4 w-4 mr-2" />
          {saving ? "Enregistrement..." : "Enregistrer"}
        </Button>
      </div>

      <div className="space-y-6">
        {Object.entries(groupedSettings).map(([category, categorySettings]) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>{categoryLabels[category] || category}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {categorySettings.map((setting) => (
                  <div key={setting.key}>
                    <label className="block text-sm font-medium text-ebmc-black mb-1">
                      {setting.label}
                    </label>
                    {setting.key === "seo_description" ? (
                      <textarea
                        className="w-full px-3 py-2 border rounded-lg min-h-[100px]"
                        value={formData[setting.key] || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [setting.key]: e.target.value,
                          })
                        }
                        placeholder={`Entrez ${setting.label.toLowerCase()}`}
                      />
                    ) : (
                      <Input
                        value={formData[setting.key] || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [setting.key]: e.target.value,
                          })
                        }
                        placeholder={`Entrez ${setting.label.toLowerCase()}`}
                      />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        ))}

        {/* Danger Zone */}
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="text-red-600">Zone de danger</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-ebmc-gray mb-4">
              Actions irréversibles. À utiliser avec précaution.
            </p>
            <div className="flex gap-4">
              <Button
                variant="outline"
                className="text-red-600 border-red-200 hover:bg-red-50"
                onClick={() => {
                  if (
                    confirm(
                      "Êtes-vous sûr de vouloir réinitialiser tous les paramètres ?"
                    )
                  ) {
                    setFormData({});
                  }
                }}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Réinitialiser les paramètres
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
