import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const settings = await prisma.siteSetting.findMany({
      orderBy: [{ category: "asc" }, { key: "asc" }],
    });

    return NextResponse.json({ settings });
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const { key, value, label, category } = await request.json();

    if (!key || !label) {
      return NextResponse.json(
        { error: "Champs requis manquants" },
        { status: 400 }
      );
    }

    // Check if key already exists
    const existing = await prisma.siteSetting.findUnique({ where: { key } });
    if (existing) {
      return NextResponse.json(
        { error: "Ce paramètre existe déjà" },
        { status: 400 }
      );
    }

    const setting = await prisma.siteSetting.create({
      data: {
        key,
        value: value || "",
        label,
        category: category || "general",
      },
    });

    return NextResponse.json({ setting }, { status: 201 });
  } catch (error) {
    console.error("Error creating setting:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
