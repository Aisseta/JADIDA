import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const body = await request.json()

  // Appelle le backend NestJS
  const res = await fetch("http://localhost:3003/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })

  const data = await res.json()

  // Rejette la requête si erreur côté backend
  if (!res.ok) {
    return NextResponse.json(data, { status: res.status })
  }

  // Renvoie la réponse succès au frontend
  return NextResponse.json(data)
}
