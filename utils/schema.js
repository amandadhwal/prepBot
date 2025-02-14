import { serial, text, varchar, timestamp, pgTable } from "drizzle-orm/pg-core";

export const MockInterview = pgTable('mockInterview', {
    id: serial('id').primaryKey(),
    jsonMockResp: text('jsonMockResp').notNull(),
    jobPosition: text('jobPosition').notNull(),
    jobDesc: text('jobDesc').notNull(),
    jobExperience: text('jobExperience').notNull(),
    createdBy: text('createdBy').notNull(),
    createdAt: timestamp('createdAt').defaultNow(),
    mockId: text('mockId').notNull(),
});
