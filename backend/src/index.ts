import express from 'express';
import * as trpc from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express'

const app = express();

const appRouter = trpc.router().query('hello', {
    resolve: () => {
        return 'hello';
    }
})

export type AppRouter = typeof appRouter;

app.use('/trpc', trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext: () => null
}))

app.listen(3000);
