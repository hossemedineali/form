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
        id:true,
        name:true,
        email:true,
        phone:true
      }
    })
  }),
  deletAll:publicProcedure.mutation(({ctx})=>{
    return ctx.prisma.form.deleteMany()
  }),
  deleteOne:publicProcedure
  .input(z.object({id:z.string()}))
  .mutation(({ctx,input})=>{
    return ctx.prisma.form.delete({
      where:{
        id:input.id
      }
    })
  }),
  update:publicProcedure.input(z.object({id:z.string(),name:z.string(),email:z.string(),phone:z.string().optional(),}))
  .mutation(({ctx,input})=>{
      return ctx.prisma.form.update({
        where:{id:input.id},
        data:{email:input.email,phone:input.phone,name:input.name}
      })
  })
});
