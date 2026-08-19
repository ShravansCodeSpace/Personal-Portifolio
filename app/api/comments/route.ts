import { NextRequest, NextResponse } from "next/server";
import { getPortfolioDb } from "@/lib/mongodb";
import { caseStudies } from "@/lib/data/caseStudies";

export const dynamic = "force-dynamic";

interface CommentDocument {
  caseStudyId: string;
  displayName: string;
  context: string;
  message: string;
  createdAt: Date;
}

const recentPosts = new Map<string, number>();

function cleanText(value: unknown, maxLength: number) {
  return String(value ?? "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function countUrls(value: string) {
  return (value.match(/https?:\/\//gi) || []).length;
}

function getRequestKey(request: NextRequest, caseStudyId: string) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const fallback = request.headers.get("x-real-ip") || "local";
  return `${forwarded || fallback}:${caseStudyId}`;
}

async function commentsCollection() {
  const db = await getPortfolioDb();
  const collection = db.collection<CommentDocument>("case_comments");
  await collection.createIndex({ caseStudyId: 1, createdAt: -1 });
  return collection;
}

export async function GET(request: NextRequest) {
  const caseStudyId = request.nextUrl.searchParams.get("caseStudyId") || "";
  const exists = caseStudies.some((study) => study.id === caseStudyId);

  if (!exists) {
    return NextResponse.json({ comments: [] });
  }

  try {
    const collection = await commentsCollection();
    const comments = await collection
      .find({ caseStudyId })
      .sort({ createdAt: 1 })
      .limit(75)
      .map((comment) => ({
        id: comment._id.toString(),
        displayName: comment.displayName,
        context: comment.context,
        message: comment.message,
        createdAt: comment.createdAt.toISOString()
      }))
      .toArray();

    return NextResponse.json({ comments });
  } catch {
    return NextResponse.json({ comments: [], unavailable: true }, { status: 503 });
  }
}

export async function POST(request: NextRequest) {
  let payload: Record<string, unknown>;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid comment payload." }, { status: 400 });
  }

  const caseStudyId = cleanText(payload.caseStudyId, 120);
  const exists = caseStudies.some((study) => study.id === caseStudyId);

  if (!exists) {
    return NextResponse.json({ error: "Unknown case study." }, { status: 404 });
  }

  if (cleanText(payload.website, 120)) {
    return NextResponse.json({ error: "Comment could not be accepted." }, { status: 400 });
  }

  const requestKey = getRequestKey(request, caseStudyId);
  const now = Date.now();
  const lastPost = recentPosts.get(requestKey) || 0;

  if (now - lastPost < 30_000) {
    return NextResponse.json({ error: "Please wait a moment before posting again." }, { status: 429 });
  }

  const displayName = cleanText(payload.displayName, 48) || "Anonymous reviewer";
  const context = cleanText(payload.context, 64);
  const message = cleanText(payload.message, 800);

  if (message.length < 12) {
    return NextResponse.json({ error: "Please add a little more detail before posting." }, { status: 400 });
  }

  if (countUrls(message) > 1) {
    return NextResponse.json({ error: "Please keep links to a minimum." }, { status: 400 });
  }

  try {
    const collection = await commentsCollection();
    const createdAt = new Date();
    const result = await collection.insertOne({
      caseStudyId,
      displayName,
      context,
      message,
      createdAt
    });

    recentPosts.set(requestKey, now);

    return NextResponse.json(
      {
        comment: {
          id: result.insertedId.toString(),
          displayName,
          context,
          message,
          createdAt: createdAt.toISOString()
        }
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json({ error: "Comments are temporarily unavailable." }, { status: 503 });
  }
}
