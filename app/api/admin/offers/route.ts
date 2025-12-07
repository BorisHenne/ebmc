import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function GET() {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const offers = await prisma.jobOffer.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        department: true,
        location: true,
        type: true,
        experience: true,
        published: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ offers });
  } catch (error) {
    console.error("Error fetching offers:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const {
      title,
      description,
      department,
      location,
      type,
      experience,
      salary,
      skills,
      published,
      boondId,
    } = await request.json();

    if (!title || !description || !location) {
      return NextResponse.json(
        { error: "Champs requis manquants" },
        { status: 400 }
      );
    }

    // Generate unique slug
    let slug = generateSlug(title);
    const existingSlug = await prisma.jobOffer.findUnique({ where: { slug } });
    if (existingSlug) {
      slug = `${slug}-${Date.now()}`;
    }

    const offer = await prisma.jobOffer.create({
      data: {
        title,
        slug,
        description,
        department: department || "OTHER",
        location,
        type: type || "CDI",
        experience: experience || null,
        salary: salary || null,
        skills: skills || [],
        published: published ?? false,
        boondId: boondId || null,
      },
    });

    return NextResponse.json({ offer }, { status: 201 });
  } catch (error) {
    console.error("Error creating offer:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
