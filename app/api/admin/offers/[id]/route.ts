import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

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

    const offer = await prisma.jobOffer.findUnique({
      where: { id },
    });

    if (!offer) {
      return NextResponse.json({ error: "Offre non trouvée" }, { status: 404 });
    }

    return NextResponse.json({ offer });
  } catch (error) {
    console.error("Error fetching offer:", error);
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
    const body = await request.json();

    const updateData: Record<string, unknown> = {};

    if (body.title !== undefined) updateData.title = body.title;
    if (body.description !== undefined) updateData.description = body.description;
    if (body.department !== undefined) updateData.department = body.department;
    if (body.location !== undefined) updateData.location = body.location;
    if (body.type !== undefined) updateData.type = body.type;
    if (body.experience !== undefined) updateData.experience = body.experience || null;
    if (body.salary !== undefined) updateData.salary = body.salary || null;
    if (body.skills !== undefined) updateData.skills = body.skills;
    if (typeof body.published === "boolean") updateData.published = body.published;
    if (body.boondId !== undefined) updateData.boondId = body.boondId || null;

    const offer = await prisma.jobOffer.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ offer });
  } catch (error) {
    console.error("Error updating offer:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const { id } = await params;

    await prisma.jobOffer.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting offer:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
