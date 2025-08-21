import { createTRPCRouter } from "@/server/api/trpc";
import { gptRouter } from "@/server/api/routers/gpt";
import { assistantRouter } from "./routers/assistant";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  gpt: gptRouter,
  assistant: assistantRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
