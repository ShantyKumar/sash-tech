// app/api/schools/[id]/route.ts
import { NextResponse } from "next/server";
// import { getPool, sql } from "@/lib/db";
import { getPool, sql } from "@/app/lib/db";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const pool = await getPool();
    const request = pool.request();
    request.input("Id", sql.Int, Number(params.id));
    const result = await request.execute("sp_GetSchoolById");
    return NextResponse.json(result.recordset[0] ?? null);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const pool = await getPool();
    const request = pool.request();
    request.input("Id", sql.Int, Number(params.id));
    await request.execute("sp_DeleteSchool");
    return new NextResponse(null, { status: 204 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
