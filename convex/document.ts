import { v } from "convex/values"
import { query } from "./_generated/server"
import { mutation } from "./_generated/server"
import { ConvexError } from "convex/values"
import { paginationOptsValidator } from "convex/server"

export const create = mutation({
  args: {
    title: v.optional(v.string()),
    initialContent: v.optional(v.string()),
  },

  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity()

    if (!user) {
      throw new ConvexError("Unauthorized")
    }

    const organizationid = (user.organization_id ?? undefined) as
      | string
      | undefined

    return await ctx.db.insert("documents", {
      title: args.title ?? "Untitled document",
      ownerID: user.subject,
      organizationID: organizationid,
      initialContent: args.initialContent ?? "",
    })
  },
})

export const get = query({
  args: {
    paginationOpts: paginationOptsValidator,
    search: v.optional(v.string()),
  },
  handler: async (ctx, { search, paginationOpts }) => {
    const user = await ctx.auth.getUserIdentity()

    if (!user) {
      throw new ConvexError("Unauthorized")
    }

    const organizationid = (user.organization_id ?? undefined) as
      | string
      | undefined

    // Search within user's organization
    if (search && organizationid) {
      return await ctx.db
        .query("documents")
        .withSearchIndex("search_title", (query) =>
          query.search("title", search).eq("organizationID", organizationid)
        )
        .paginate(paginationOpts)
    }

    // Search within user's own documents
    if (search) {
      return await ctx.db
        .query("documents")
        .withSearchIndex("search_title", (query) =>
          query.search("title", search).eq("ownerID", user.subject)
        )
        .paginate(paginationOpts)
    }

    // All documents in the user's organization
    if (organizationid) {
      return await ctx.db
        .query("documents")
        .withIndex("by_organizationID", (query) =>
          query.eq("organizationID", organizationid)
        )
        .paginate(paginationOpts)
    }

    // All documents owned by the user
    return await ctx.db
      .query("documents")
      .withIndex("by_ownerID", (query) => query.eq("ownerID", user.subject))
      .paginate(paginationOpts)
  },
})

export const removeById = mutation({
  args: { id: v.id("documents") },

  handler: async (ctx, args) => {
    const user = (await ctx.auth.getUserIdentity()) as {
      organization_role?: string
      organization_id?: string
      subject: string
    }

    if (!user) throw new ConvexError("Unauthorized")

    const document = await ctx.db.get(args.id)
    if (!document) throw new ConvexError("Document not found")

    const isPersonalDoc = !document.organizationID
    const isOwner = document.ownerID === user.subject

    const isOrgAdmin =
      user.organization_role === "org:admin" &&
      user.organization_id === document.organizationID

    if (!(isPersonalDoc && isOwner) && !isOrgAdmin) {
      throw new ConvexError("Forbidden")
    }

    return await ctx.db.delete(args.id)
  },
})

export const updateById = mutation({
  args: { id: v.id("documents"), title: v.string() },

  handler: async (ctx, args) => {
    const user = (await ctx.auth.getUserIdentity()) as {
      organization_role?: string
      organization_id?: string
      subject: string
    }

    if (!user) throw new ConvexError("Unauthorized")

    const document = await ctx.db.get(args.id)
    if (!document) throw new ConvexError("Document not found")

    const isPersonalDoc = !document.organizationID
    const isOwner = document.ownerID === user.subject

    const isOrgAdmin =
      user.organization_role === "org:admin" &&
      user.organization_id === document.organizationID

    if (!(isPersonalDoc && isOwner) && !isOrgAdmin) {
      throw new ConvexError("Forbidden")
    }

    return await ctx.db.patch(args.id, { title: args.title })
  },
})

export const getById = query({
  args: { id: v.id("documents") },

  handler: async (ctx, { id }) => {
    const document = await ctx.db.get(id)

    if (!document) {
      throw new ConvexError("Document not found")
    }

    return document
  },
})

export const getByIds = query({
  args: { ids: v.array(v.id("documents")) },

  handler: async (ctx, { ids }) => {
    const documents = []

    for (const id of ids) {
      const document = await ctx.db.get(id)

      if (document) {
        documents.push({ id: document._id, name: document.title })
      } else {
        documents.push({ id, name: "Deleted document" })
      }
    }

    return documents
  },
})
