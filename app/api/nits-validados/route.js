import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const nitsResult = await sql`SELECT nit, valido, mensaje FROM nits ORDER BY created_at DESC LIMIT 10`;
 
    if (nitsResult.rows.length === 0) {
      return NextResponse.json({ error: 'No se encontraron nits' }, { status: 404 });
    }
    const nits = nitsResult.rows;   

    return NextResponse.json(nits);
  } catch (error) {
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
} 

export const revalidate = 0;