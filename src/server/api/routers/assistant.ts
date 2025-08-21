import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const assistantRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ name: z.string(), instructions: z.string().optional() }))
    .mutation(async ({ ctx, input }) => {
      const assistant = await ctx.openai.createAssistant(
        input.name,
        input.instructions ?? ""
      );
      return assistant;
    }),
});

