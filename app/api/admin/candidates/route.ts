import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const candidates = await prisma.candidate.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        linkedin: true,
        status: true,
        experience: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ candidates });
  } catch (error) {
    console.error("Error fetching candidates:", error);
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
      firstName,
      lastName,
      email,
      phone,
      linkedin,
      experience,
      skills,
      notes,
      status,
      source,
      boondId,
    } = await request.json();

    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { error: "Champs requis manquants" },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existing = await prisma.candidate.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "Ce candidat existe déjà" },
        { status: 400 }
      );
    }

    const candidate = await prisma.candidate.create({
      data: {
        firstName,
        lastName,
        email,
        phone: phone || null,
        linkedin: linkedin || null,
        experience: experience || null,
        skills: skills || [],
        notes: notes || null,
        status: status || "NEW",
        source: source || null,
        boondId: boondId || null,
      },
    });

    return NextResponse.json({ candidate }, { status: 201 });
  } catch (error) {
    console.error("Error creating candidate:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
