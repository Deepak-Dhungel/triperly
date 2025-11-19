import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import admin from "firebase-admin";
import { encrypt } from "@/service/session";
import serviceAcc from "./sa.json";

const serviceAccount = {
  projectId: serviceAcc.project_id,
  privateKey: serviceAcc.private_key,
  clientEmail: serviceAcc.client_email,
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log("admin initialized...");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const idToken = body?.idToken;
    if (!idToken) {
      return NextResponse.json({ error: "Missing idToken" }, { status: 400 });
    }
    console.log("id token received...");
    try {
      const decoded = await admin.auth().verifyIdToken(idToken);
      console.log("decoded...");
      const sessionJwt = await encrypt({
        uid: decoded.uid,
        email: decoded.email,
      });
      console.log("session jwt created..");
      const res = NextResponse.json({ ok: true });
      console.log("res", res);
      // Max-Age 7 days -> 7 * 24 * 60 * 60 = 604800
      res.headers.set(
        "Set-Cookie",
        `session=${sessionJwt}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${604800}`
      );
      console.log("Session cookie set", res.headers.get("Set-Cookie"));
      return res;
    } catch (error) {
      console.error("decode error", error);
    }
  } catch (err) {
    console.error("session create error", err);
    return NextResponse.json(
      { error: "Unable to create session" },
      { status: 401 }
    );
  }
}
