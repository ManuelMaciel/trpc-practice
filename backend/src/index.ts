import express from 'express';
import cors from 'cors';
import * as trpc from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import { z } from 'zod';

import { products } from './mocks';

const app = express();

const appRouter = trpc.router()
    .query('hello', {
        resolve: () => {
            return 'hello';
        }
    })
    .query('getProducts', {
        resolve: () => {
            return products;
        }
    })
    .mutation('createProduct', {
        input: z.string(),
        resolve: ({ input }) => {
            products.push({
                id: products.length + 1,
                name: input,
                description: `Description ${input}`
            })
            return `${input} created`;
        }
    })

export type AppRouter = typeof appRouter;

app.use(cors());
app.use('/trpc', trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext: () => null
}))

app.listen(3000);
