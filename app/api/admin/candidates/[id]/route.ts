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

    const candidate = await prisma.candidate.findUnique({
      where: { id },
      include: {
        applications: {
          include: {
            jobOffer: {
              select: {
                id: true,
                title: true,
                department: true,
              },
            },
          },
        },
      },
    });

    if (!candidate) {
      return NextResponse.json(
        { error: "Candidat non trouvé" },
        { status: 404 }
      );
    }

    return NextResponse.json({ candidate });
  } catch (error) {
    console.error("Error fetching candidate:", error);
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

    if (body.firstName !== undefined) updateData.firstName = body.firstName;
    if (body.lastName !== undefined) updateData.lastName = body.lastName;
    if (body.email !== undefined) updateData.email = body.email;
    if (body.phone !== undefined) updateData.phone = body.phone || null;
    if (body.linkedin !== undefined) updateData.linkedin = body.linkedin || null;
    if (body.experience !== undefined) updateData.experience = body.experience || null;
    if (body.skills !== undefined) updateData.skills = body.skills;
    if (body.notes !== undefined) updateData.notes = body.notes || null;
    if (body.status !== undefined) updateData.status = body.status;
    if (body.source !== undefined) updateData.source = body.source || null;
    if (body.boondId !== undefined) updateData.boondId = body.boondId || null;
    if (body.resumeUrl !== undefined) updateData.resumeUrl = body.resumeUrl || null;

    const candidate = await prisma.candidate.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ candidate });
  } catch (error) {
    console.error("Error updating candidate:", error);
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

    await prisma.candidate.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting candidate:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
