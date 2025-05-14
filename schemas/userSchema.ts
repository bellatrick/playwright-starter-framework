// schemas/userSchema.ts
import { z } from 'zod';

export const addressSchema = z.object({
    street: z.string(),
    suite: z.string(),
    city: z.string(),
    zipcode: z.string().regex(/^\d{5}(-\d{4})?$/, 'Invalid zipcode format'),
    geo: z.object({
        lat: z.string(),
        lng: z.string(),
    }),
});

export const companySchema = z.object({
    name: z.string(),
    catchPhrase: z.string(),
    bs: z.string(),
});

export const userSchema = z.object({
    id: z.number().int().positive(),
    name: z.string(),
    username: z.string(),
    email: z.string().email('Invalid email address'),
    address: addressSchema,
    phone: z.string(),
    website: z.string().url().optional(), 
    company: companySchema,
});

export const usersArraySchema = z.array(userSchema);