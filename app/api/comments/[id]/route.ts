import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import { getPortfolioDb } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

interface CommentRouteProps {
  params: Promise<{ id: string }>;
}

export async function DELETE(request: NextRequest, { params }: CommentRouteProps) {
  const ownerToken = process.env.COMMENT_DELETE_TOKEN;
  const providedToken = request.headers.get("x-owner-token") || "";

  if (!ownerToken) {
    return NextResponse.json({ error: "Owner delete is not configured." }, { status: 503 });
  }

  if (providedToken !== ownerToken) {
    return NextResponse.json({ error: "Owner token is invalid." }, { status: 401 });
  }

  const { id } = await params;

  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid comment id." }, { status: 400 });
  }

  try {
    const db = await getPortfolioDb();
    const result = await db.collection("case_comments").deleteOne({ _id: new ObjectId(id) });

    if (!result.deletedCount) {
      return NextResponse.json({ error: "Comment not found." }, { status: 404 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Comment could not be deleted." }, { status: 503 });
  }
}
