import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Journey data validation schema (matching frontend types)
const JourneyDataValidator = v.object({
  profile: v.union(
    v.literal("small-medium"),
    v.literal("large-enterprise"),
    v.null()
  ),
  channels: v.array(v.union(
    v.literal("website"),
    v.literal("social-media"), 
    v.literal("ecommerce")
  )),
  challenges: v.array(v.union(
    v.literal("cart-abandonment"),
    v.literal("slow-checkout"),
    v.literal("global-scaling"),
    v.literal("payment-reliability"),
    v.literal("social-commerce"),
    v.literal("fraud-chargebacks")
  )),
  solution: v.optional(v.union(
    v.literal("complete-payments"),
    v.literal("braintree")
  )),
  contact: v.optional(v.object({
    fullName: v.optional(v.string()),
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
    company: v.optional(v.string()),
  })),
  startedAt: v.number(),
  completedAt: v.optional(v.number()),
});

// Sync a journey from tablet to cloud
export const syncJourney = mutation({
  args: {
    tabletId: v.string(),
    localId: v.string(),
    journeyData: JourneyDataValidator,
  },
  handler: async (ctx, args) => {
    // Check if journey already exists by localId
    const existingJourney = await ctx.db
      .query("journeys")
      .withIndex("by_local_id", (q) => q.eq("localId", args.localId))
      .first();

    if (existingJourney) {
      // Update existing journey
      await ctx.db.patch(existingJourney._id, {
        ...args.journeyData,
        syncStatus: "synced" as const,
        syncedAt: Date.now(),
        syncAttempts: (existingJourney.syncAttempts || 0) + 1,
      });
      return existingJourney._id;
    }

    // Create new journey
    const duration = args.journeyData.completedAt 
      ? args.journeyData.completedAt - args.journeyData.startedAt 
      : undefined;

    const journeyId = await ctx.db.insert("journeys", {
      tabletId: args.tabletId,
      localId: args.localId,
      ...args.journeyData,
      duration,
      syncStatus: "synced" as const,
      syncedAt: Date.now(),
      syncAttempts: 1,
    });

    return journeyId;
  },
});

// Batch sync multiple journeys
export const batchSyncJourneys = mutation({
  args: {
    tabletId: v.string(),
    journeys: v.array(v.object({
      localId: v.string(),
      journeyData: JourneyDataValidator,
    })),
  },
  handler: async (ctx, args) => {
    const results = {
      succeeded: 0,
      failed: 0,
      errors: [] as string[],
    };

    for (const journey of args.journeys) {
      try {
        await ctx.db.insert("journeys", {
          tabletId: args.tabletId,
          localId: journey.localId,
          ...journey.journeyData,
          duration: journey.journeyData.completedAt 
            ? journey.journeyData.completedAt - journey.journeyData.startedAt 
            : undefined,
          syncStatus: "synced" as const,
          syncedAt: Date.now(),
          syncAttempts: 1,
        });
        results.succeeded++;
      } catch (error) {
        results.failed++;
        results.errors.push(`${journey.localId}: ${error}`);
      }
    }

    // Log the sync operation
    await ctx.db.insert("syncLogs", {
      tabletId: args.tabletId,
      operation: "batch_sync" as const,
      status: results.failed === 0 ? "success" as const : 
              results.succeeded === 0 ? "error" as const : "partial" as const,
      recordsProcessed: args.journeys.length,
      recordsSucceeded: results.succeeded,
      recordsFailed: results.failed,
      error: results.errors.length > 0 ? results.errors.join("; ") : undefined,
      timestamp: Date.now(),
    });

    return results;
  },
});

// Get journeys for a tablet
export const getByTablet = query({
  args: { tabletId: v.string() },
  handler: async (ctx, args) => {
    const journeys = await ctx.db
      .query("journeys")
      .withIndex("by_tablet", (q) => q.eq("tabletId", args.tabletId))
      .order("desc")
      .collect();

    return journeys;
  },
});

// Get pending sync journeys for a tablet
export const getPendingSync = query({
  args: { tabletId: v.string() },
  handler: async (ctx, args) => {
    const pendingJourneys = await ctx.db
      .query("journeys")
      .withIndex("by_sync_status", (q) => q.eq("syncStatus", "pending"))
      .filter((q) => q.eq(q.field("tabletId"), args.tabletId))
      .collect();

    return pendingJourneys;
  },
});

// Get journey statistics for analytics
export const getStats = query({
  args: { 
    tabletId: v.optional(v.string()),
    dateFrom: v.optional(v.number()),
    dateTo: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const journeys = args.tabletId 
      ? await ctx.db
          .query("journeys")
          .withIndex("by_tablet", (q) => q.eq("tabletId", args.tabletId!))
          .collect()
      : await ctx.db.query("journeys").collect();

    // Filter by date range if provided
    const filteredJourneys = journeys.filter(journey => {
      if (args.dateFrom && journey.startedAt < args.dateFrom) return false;
      if (args.dateTo && journey.startedAt > args.dateTo) return false;
      return true;
    });

    const completed = filteredJourneys.filter(j => j.completedAt);
    const total = filteredJourneys.length;

    const stats = {
      total,
      completed: completed.length,
      conversionRate: total > 0 ? (completed.length / total) * 100 : 0,
      avgDuration: completed.length > 0 
        ? completed.reduce((sum, j) => sum + (j.duration || 0), 0) / completed.length
        : 0,
      
      // Profile breakdown
      profiles: {
        'small-medium': filteredJourneys.filter(j => j.profile === 'small-medium').length,
        'large-enterprise': filteredJourneys.filter(j => j.profile === 'large-enterprise').length,
        'not-selected': filteredJourneys.filter(j => !j.profile).length,
      },
      
      // Solution breakdown
      solutions: {
        'complete-payments': filteredJourneys.filter(j => j.solution === 'complete-payments').length,
        'braintree': filteredJourneys.filter(j => j.solution === 'braintree').length,
        'not-selected': filteredJourneys.filter(j => !j.solution).length,
      }
    };

    return stats;
  },
}); 

// Get all journeys (admin/export)
export const getAllJourneys = query({
  handler: async (ctx) => {
    const journeys = await ctx.db
      .query("journeys")
      .order("desc")
      .collect();
    return journeys;
  },
}); 