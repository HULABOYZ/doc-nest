import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
  documents: defineTable({
    title: v.string(),
    initialContent: v.optional(v.string()),
    ownerID: v.string(),
    roomID: v.optional(v.string()),
    organizationID: v.optional(v.string()),
  })
    .index("by_ownerID", ["ownerID"])
    .index("by_organizationID", ["organizationID"])
    .searchIndex("search_title", {
      searchField: "title",
      filterFields: ["ownerID", "organizationID"],
    }),
})
