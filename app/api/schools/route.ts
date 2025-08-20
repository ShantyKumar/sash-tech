// app/api/schools/route.ts
import { NextResponse } from "next/server";
// import { getPool, sql } from "@/lib/db";
import { getPool, sql } from "@/app/lib/db";

// GET all schools
export async function GET() {
    debugger;   
  try {
    const pool = await getPool();
    const result = await pool.request().execute("sp_GetAllSchools");
    return NextResponse.json(result.recordset);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST insert new school
export async function POST(req: Request) {
    debugger;
  try {
    const body = await req.json();
    const { name, addressId, contactNumber, email } = body;

    const pool = await getPool();
    const request = pool.request();
    request.input("Name", sql.NVarChar(255), name);
    request.input("AddressId", sql.Int, addressId);
    request.input("ContactNumber", sql.NVarChar(20), contactNumber);
    request.input("Email", sql.NVarChar(100), email);

    const result = await request.execute("sp_InsertSchool");
    const newId = result.recordset?.[0]?.NewSchoolId;

    return NextResponse.json({ id: newId });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
