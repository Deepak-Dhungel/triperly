export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { adminAuth, adminDB } from "@/service/firebaseAdmin";
import admin from "firebase-admin";

export async function POST(req: Request) {
  try {
    const { userId, trip } = await req.json();

    if (!userId || !trip) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    const docRef = adminDB.collection("trips").doc();

    await docRef.set({
      ...trip,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      userId,
    });

    return NextResponse.json({ success: true, tripId: docRef.id });
  } catch (error) {
    console.error("Error saving trip:", error);
    return NextResponse.json({ error: "Error saving trip" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json(
        { error: "Missing authorization header" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];

    // verify the token
    const decodeToken = await adminAuth.verifyIdToken(token);

    if (!decodeToken) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // get user id from token after verification
    const userId = decodeToken.uid;

    // get all trips from user matching the user id
    const tripsSnapshot = await adminDB
      .collection("trips")
      .where("userId", "==", userId)
      .get();

    const trips = tripsSnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));

    return NextResponse.json({ trips });
  } catch (error) {
    console.log(" Error while fetching trips", error);
    return NextResponse.json(
      { error: "Error fetching trips" },
      { status: 500 }
    );
  }
}
