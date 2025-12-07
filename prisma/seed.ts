import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create default admin user
  const adminPassword = await bcrypt.hash("admin123", 12);

  const admin = await prisma.user.upsert({
    where: { email: "admin@ebmc-group.com" },
    update: {},
    create: {
      email: "admin@ebmc-group.com",
      password: adminPassword,
      name: "Administrateur",
      role: "SUPER_ADMIN",
      active: true,
    },
  });

  console.log("Created admin user:", admin.email);

  // Create default site settings
  const defaultSettings = [
    {
      key: "company_name",
      value: "EBMC GROUP",
      label: "Nom de l'entreprise",
      category: "general",
    },
    {
      key: "company_address",
      value: "Paris, France",
      label: "Adresse",
      category: "general",
    },
    {
      key: "company_phone",
      value: "+33 1 00 00 00 00",
      label: "Téléphone",
      category: "general",
    },
    {
      key: "company_email",
      value: "contact@ebmc-group.com",
      label: "Email de contact",
      category: "general",
    },
    {
      key: "social_linkedin",
      value: "https://linkedin.com/company/ebmc-group",
      label: "LinkedIn",
      category: "social",
    },
    {
      key: "seo_title",
      value: "EBMC GROUP - Expertise SAP, ICT & Cybersécurité",
      label: "Titre SEO par défaut",
      category: "seo",
    },
    {
      key: "seo_description",
      value:
        "EBMC GROUP accompagne les entreprises dans leurs projets SAP, ICT et Cybersécurité depuis 2006.",
      label: "Description SEO",
      category: "seo",
    },
  ];

  for (const setting of defaultSettings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: {},
      create: setting,
    });
  }

  console.log("Created default settings");

  // Create sample job offers
  const sampleOffers = [
    {
      title: "Consultant SAP FI/CO Senior",
      slug: "consultant-sap-fico-senior",
      description:
        "Nous recherchons un consultant SAP FI/CO senior pour accompagner nos clients dans leurs projets de transformation.",
      department: "SAP" as const,
      location: "Paris",
      type: "CDI" as const,
      experience: "5+ ans",
      skills: ["SAP FI", "SAP CO", "S/4HANA"],
      published: true,
    },
    {
      title: "Développeur ABAP",
      slug: "developpeur-abap",
      description:
        "Rejoignez notre équipe de développement SAP pour travailler sur des projets innovants.",
      department: "SAP" as const,
      location: "Lyon",
      type: "CDI" as const,
      experience: "3+ ans",
      skills: ["ABAP", "ABAP OO", "CDS Views", "Fiori"],
      published: true,
    },
    {
      title: "Ingénieur Cloud Azure",
      slug: "ingenieur-cloud-azure",
      description:
        "Participez à la conception et au déploiement d'architectures cloud pour nos clients.",
      department: "ICT" as const,
      location: "Paris",
      type: "CDI" as const,
      experience: "3+ ans",
      skills: ["Azure", "Terraform", "Kubernetes", "Docker"],
      published: true,
    },
    {
      title: "Analyste SOC",
      slug: "analyste-soc",
      description:
        "Intégrez notre équipe SOC pour surveiller et protéger les systèmes de nos clients.",
      department: "CYBER" as const,
      location: "Nantes",
      type: "CDI" as const,
      experience: "2+ ans",
      skills: ["SIEM", "Splunk", "Threat Intel"],
      published: true,
    },
  ];

  for (const offer of sampleOffers) {
    await prisma.jobOffer.upsert({
      where: { slug: offer.slug },
      update: {},
      create: offer,
    });
  }

  console.log("Created sample job offers");

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
