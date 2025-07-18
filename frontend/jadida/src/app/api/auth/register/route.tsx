import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()

  const response = await fetch('http://localhost:3003/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  const data = await response.json()

  if (!response.ok) {
    return NextResponse.json({ error: data.message || 'Erreur register' }, { status: response.status })
  }

  return NextResponse.json(data)
}
