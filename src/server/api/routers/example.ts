import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const exampleRouter = createTRPCRouter({
  save: publicProcedure
    .input(z.object({ name:z.string(),email:z.string(),phone:z.string().optional(), }))
    .mutation(async({ input,ctx }) => {
      return ctx.prisma.form.create({
        data:{...input}
      })
    }),
  load: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.form.findMany({
      select:{
        id:false,
        name:true,
        email:true,
        phone:true
      }
    })
  }),
  deletAll:publicProcedure.mutation(({ctx})=>{
    return ctx.prisma.form.deleteMany()
  })
});
