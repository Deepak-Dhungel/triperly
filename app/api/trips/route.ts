import { NextResponse } from "next/server";
import { adminDB } from "@/service/firebaseAdmin";
import admin from "firebase-admin";

export async function POST(req: Request) {
  try {
    const { userId, trip } = await req.json();

    if (!userId || !trip) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    const docRef = adminDB
      .collection("users")
      .doc(userId)
      .collection("trips")
      .doc();

    await docRef.set({
      ...trip,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return NextResponse.json({ success: true, tripId: docRef.id });
  } catch (error) {
    console.error("Error saving trip:", error);
    return NextResponse.json({ error: "Error saving trip" }, { status: 500 });
  }
}
