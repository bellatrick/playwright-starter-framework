import { z } from "zod";


export const postSchema= z.object({
    userId: z.number().int().positive(),
    id: z.number().int().positive(),
    title: z.string().min(1,"Title cannot be empty"),
    body: z.string().min(1,"Body cannot be empty")
})

export const postsArraySchema = z.array(postSchema);