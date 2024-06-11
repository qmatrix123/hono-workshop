import { Hono, Context } from 'hono'
import { handle } from 'hono/vercel'
import {
    authHandler,
    initAuthConfig,
    verifyAuth,
    AuthConfig
} from '@hono/auth-js'

import GitHub from '@auth/core/providers/github'
import Credentials from 'next-auth/providers/credentials'

import todos from './todos'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { db } from '@/db/drizzle'
import { users } from '@/db/schema'

// export const runtime = 'edge'

const app = new Hono().basePath('/api')

app.use('*', initAuthConfig(getAuthConfig))
app.use('/auth/*', authHandler())

app.get('/protected', verifyAuth(), (c) => {
    const auth = c.get('authUser')
    return c.json({ auth })
})

app.route('/todos', todos)

function getAuthConfig(c: Context): AuthConfig {
    return {
        adapter: DrizzleAdapter(db),
        secret: process.env.AUTH_SECRET,
        session: {
            strategy: 'jwt'
        },
        providers: [
            // GitHub({
            //     clientId: process.env.GITHUB_ID,
            //     clientSecret: process.env.GITHUB_SECRET
            // }),
            Credentials({
                async authorize(credentials) {
                    console.log({
                        credentials
                    })

                    const result = await db.select().from(users)

                    console.log(result.length)

                    return {
                        name: 'liulin'
                    }
                }
            })
        ]
    }
}

export const GET = handle(app)
export const POST = handle(app)
