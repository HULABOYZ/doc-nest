// import { Liveblocks } from "@liveblocks/node"
// import { ConvexHttpClient } from "convex/browser"
// import { auth, currentUser } from "@clerk/nextjs/server"
// import { api } from "../../../../convex/_generated/api"

// const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

// const liveblocks = new Liveblocks({
//   secret: process.env.LIVEBLOCKS_SECRET_KEY!,
// })

// export async function POST(req: Request) {
//   const { sessionClaims } = await auth()

//   if (!sessionClaims) {
//     return new Response("Unauthorized", { status: 401 })
//   }

//   const user = await currentUser()

//   if (!user) {
//     return new Response("Unauthorized", { status: 401 })
//   }

//   const { room } = await req.json()

//   const document = await convex.query(api.document.getById, { id: room })

//   if (!document) {
//     throw new Response("Document not found", { status: 401 })
//   }

//   const isOwner = document.ownerID === user.id
//   const isOrganizationMember = !!(
//     document.organizationID && document.organizationID === sessionClaims.org_id
//   )

//   if (!isOwner && !isOrganizationMember) {
//     throw new Response("Document not found", { status: 401 })
//   }

//   const session = liveblocks.prepareSession(user.id, {
//     userInfo: {
//       name: user.fullName || "Annoymous",
//       avatar: user.imageUrl || undefined,
//     },
//   })

//   session.allow(room, session.FULL_ACCESS)

//   const { body, status } = await session.authorize()

//   return new Response(body, { status })
// }

import { Liveblocks } from "@liveblocks/node"
import { ConvexHttpClient } from "convex/browser"
import { auth, currentUser } from "@clerk/nextjs/server"
import { api } from "../../../../convex/_generated/api"

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)
const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
})

export async function POST(req: Request) {
  const { sessionClaims } = await auth()
  if (!sessionClaims) {
    return new Response("Unauthorized", { status: 401 })
  }

  const user = await currentUser()
  if (!user) {
    return new Response("Unauthorized", { status: 401 })
  }

  const { room } = await req.json()
  const document = await convex.query(api.document.getById, { id: room })

  if (!document) {
    return new Response("Not found", { status: 404 })
  }

  const org =
    typeof sessionClaims?.o === "object" && sessionClaims.o !== null ?
      (sessionClaims.o as { id?: string; role?: string })
    : null

  const orgId = org?.id ?? null

  const isOwner = document.ownerID === user.id
  const isOrgMember =
    !!document.organizationID && document.organizationID === orgId

  if (!isOwner && !isOrgMember) {
    return new Response("Forbidden", { status: 403 })
  }

  const name =
    user.fullName ?? user.primaryEmailAddress?.emailAddress ?? "Anonymous"
  const nameToNumber = name
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const hue = Math.abs(nameToNumber) % 360
  const color = `hsl(${hue}, 80%, 60%)`

  const session = liveblocks.prepareSession(user.id, {
    userInfo: {
      name,
      avatar: user.imageUrl,
      color,
    },
  })

  session.allow(room, session.FULL_ACCESS)

  const { body, status } = await session.authorize()
  return new Response(body, { status })
}
