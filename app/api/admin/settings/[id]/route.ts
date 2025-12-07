import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession, isAdmin } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const { id } = await params;

    const setting = await prisma.siteSetting.findUnique({
      where: { id },
    });

    if (!setting) {
      return NextResponse.json(
        { error: "Paramètre non trouvé" },
        { status: 404 }
      );
    }

    return NextResponse.json({ setting });
  } catch (error) {
    console.error("Error fetching setting:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const { id } = await params;
    const { value, label, category } = await request.json();

    const updateData: Record<string, unknown> = {};

    if (value !== undefined) updateData.value = value;
    if (label !== undefined) updateData.label = label;
    if (category !== undefined) updateData.category = category;

    const setting = await prisma.siteSetting.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ setting });
  } catch (error) {
    console.error("Error updating setting:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();

    if (!session || !(await isAdmin())) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 403 });
    }

    const { id } = await params;

    await prisma.siteSetting.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting setting:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
