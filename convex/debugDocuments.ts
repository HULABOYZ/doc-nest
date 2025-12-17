import { query } from "./_generated/server"

export const debugDocuments = query({
  handler: async (ctx) => {
    const docs = await ctx.db.query("documents").collect()

    return docs.map((d) => ({
      id: d._id,
      title: d.title,
      ownerID: d.ownerID,
      organizationID: d.organizationID ?? null,
    }))
  },
})
