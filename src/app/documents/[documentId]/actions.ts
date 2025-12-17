"use server"

import { auth, clerkClient } from "@clerk/nextjs/server"
import { ConvexHttpClient } from "convex/browser"
import { Id } from "../../../../convex/_generated/dataModel"
import { api } from "../../../../convex/_generated/api"

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

export async function getDocuments(ids: Id<"documents">[]) {
  return await convex.query(api.document.getByIds, { ids })
}

export async function getUsers() {
  const { sessionClaims } = await auth()

  // Safely extract orgId from Clerk session claims
  const orgId =
    typeof sessionClaims?.o === "object" && sessionClaims.o !== null ?
      (sessionClaims.o as { id?: string }).id
    : undefined

  if (!orgId) {
    return []
  }

  const clerk = await clerkClient()

  const response = await clerk.users.getUserList({
    organizationId: [orgId],
  })

  return response.data.map((user) => ({
    id: user.id,
    name:
      user.fullName ?? user.primaryEmailAddress?.emailAddress ?? "Anonymous",
    avatar: user.imageUrl ?? "",
    color: "",
  }))
}
