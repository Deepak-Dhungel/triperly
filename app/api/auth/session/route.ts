import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import admin from "firebase-admin";

const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log("admin initialized...");
}

export async function POST(req: NextRequest) {
  try {
    const { idToken } = await req.json();

    //verify token
    await admin.auth().verifyIdToken(idToken);

    //create session cookie
    const sessionCookie = await admin
      .auth()
      .createSessionCookie(idToken, { expiresIn: 7 * 24 * 60 * 60 * 1000 });

    // set cookie
    const res = NextResponse.json({ ok: true });
    res.cookies.set("session", sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
      path: "/",
    });

    return res;
  } catch (err) {
    console.error("session create error", err);
    return NextResponse.json(
      { error: "Unable to create session" },
      { status: 401 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const sessionCookie = req.cookies.get("session")?.value;

  if (sessionCookie) {
    try {
      //revoke firebase session
      const decodedClaims = await admin
        .auth()
        .verifySessionCookie(sessionCookie);
      await admin.auth().revokeRefreshTokens(decodedClaims.sub);
    } catch (err) {
      console.error("Error revoking session:", err);
    }
  }

  // clear session cookie
  const res = NextResponse.json({ success: true });
  res.cookies.delete("session");

  console.log("cookies cleared");
  return res;
}
