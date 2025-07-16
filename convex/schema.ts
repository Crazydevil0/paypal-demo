import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Tablets - simple tablet tracking
  tablets: defineTable({
    tabletId: v.string(), // Unique identifier for the tablet
    name: v.optional(v.string()), // Optional display name
    lastActiveAt: v.number(),
    createdAt: v.number(),
  }).index("by_tablet_id", ["tabletId"]),

  // Customer journeys - each complete flow through the demo
  journeys: defineTable({
    tabletId: v.string(), // Which tablet this came from
    
    // Customer journey data (matching frontend types)
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
    
    // Contact information
    contact: v.optional(v.object({
      fullName: v.optional(v.string()),
      email: v.optional(v.string()),
      phone: v.optional(v.string()),
      company: v.optional(v.string()),
    })),
    
    // Journey metadata
    startedAt: v.number(),
    completedAt: v.optional(v.number()),
    duration: v.optional(v.number()), // in milliseconds
    
    // Sync metadata
    syncStatus: v.union(
      v.literal("pending"),
      v.literal("synced"),
      v.literal("failed")
    ),
    localId: v.string(), // UUID generated on tablet for offline tracking
    syncedAt: v.optional(v.number()),
    syncAttempts: v.optional(v.number()),
    lastSyncError: v.optional(v.string()),
  }).index("by_tablet", ["tabletId"])
    .index("by_sync_status", ["syncStatus"])
    .index("by_local_id", ["localId"])
    .index("by_completed", ["completedAt"]),

  // Sync logs - track sync operations for debugging
  syncLogs: defineTable({
    tabletId: v.string(),
    operation: v.union(
      v.literal("journey_sync"),
      v.literal("batch_sync")
    ),
    status: v.union(
      v.literal("success"),
      v.literal("error"),
      v.literal("partial")
    ),
    recordsProcessed: v.number(),
    recordsSucceeded: v.number(),
    recordsFailed: v.number(),
    error: v.optional(v.string()),
    timestamp: v.number(),
    duration: v.optional(v.number()),
  }).index("by_tablet", ["tabletId"])
    .index("by_timestamp", ["timestamp"])
    .index("by_status", ["status"]),

  // Analytics - aggregated data for reporting
  analytics: defineTable({
    date: v.string(), // YYYY-MM-DD format
    tabletId: v.string(),
    
    // Daily metrics
    journeysStarted: v.number(),
    journeysCompleted: v.number(),
    conversionRate: v.number(),
    avgDuration: v.number(),
    
    // Profile breakdown
    smallMediumBusinessCount: v.number(),
    largeEnterpriseCount: v.number(),
    
    // Solution breakdown
    completePaymentsCount: v.number(),
    braintreeCount: v.number(),
    
    // Channel breakdown
    websiteCount: v.number(),
    socialMediaCount: v.number(),
    ecommerceCount: v.number(),
    
    updatedAt: v.number(),
  }).index("by_date", ["date"])
    .index("by_tablet_date", ["tabletId", "date"]),
}); 