import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Register or update a tablet
export const registerTablet = mutation({
  args: {
    tabletId: v.string(),
    name: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Check if tablet already exists
    const existingTablet = await ctx.db
      .query("tablets")
      .withIndex("by_tablet_id", (q) => q.eq("tabletId", args.tabletId))
      .first();

    if (existingTablet) {
      // Update existing tablet
      await ctx.db.patch(existingTablet._id, {
        name: args.name || existingTablet.name,
        lastActiveAt: Date.now(),
      });
      return existingTablet._id;
    }

    // Create new tablet
    const tabletDocId = await ctx.db.insert("tablets", {
      tabletId: args.tabletId,
      name: args.name,
      createdAt: Date.now(),
      lastActiveAt: Date.now(),
    });

    return tabletDocId;
  },
});

// Get tablet by tablet ID
export const getByTabletId = query({
  args: { tabletId: v.string() },
  handler: async (ctx, args) => {
    const tablet = await ctx.db
      .query("tablets")
      .withIndex("by_tablet_id", (q) => q.eq("tabletId", args.tabletId))
      .first();

    return tablet;
  },
});

// Update last active timestamp
export const updateLastActive = mutation({
  args: { tabletId: v.string() },
  handler: async (ctx, args) => {
    const tablet = await ctx.db
      .query("tablets")
      .withIndex("by_tablet_id", (q) => q.eq("tabletId", args.tabletId))
      .first();

    if (tablet) {
      await ctx.db.patch(tablet._id, {
        lastActiveAt: Date.now(),
      });
    }
  },
});

// Get all tablets (for admin dashboard)
export const getAllTablets = query({
  handler: async (ctx) => {
    const tablets = await ctx.db
      .query("tablets")
      .order("desc")
      .collect();

    return tablets;
  },
});

// Update tablet info
export const updateTablet = mutation({
  args: {
    tabletId: v.string(),
    name: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const tablet = await ctx.db
      .query("tablets")
      .withIndex("by_tablet_id", (q) => q.eq("tabletId", args.tabletId))
      .first();

    if (tablet) {
      const updates: any = { lastActiveAt: Date.now() };
      if (args.name !== undefined) {
        updates.name = args.name;
      }

      await ctx.db.patch(tablet._id, updates);
    }
  },
}); 