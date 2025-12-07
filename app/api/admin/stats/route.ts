import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { error: "Non authentifié" },
        { status: 401 }
      );
    }

    const [users, offers, candidates, contacts] = await Promise.all([
      prisma.user.count(),
      prisma.jobOffer.count(),
      prisma.candidate.count(),
      prisma.contact.count(),
    ]);

    return NextResponse.json({
      users,
      offers,
      candidates,
      contacts,
    });
  } catch (error) {
    console.error("Stats error:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
