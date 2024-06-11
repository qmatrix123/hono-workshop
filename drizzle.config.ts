import { defineConfig } from 'drizzle-kit'

export default defineConfig({
    schema: './db/schema.ts',
    out: './drizzle',
    dialect: 'postgresql', // 'postgresql' | 'mysql' | 'sqlite'
    dbCredentials: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'postgres',
        database: 'postgres',
        ssl: false
    },
    verbose: true,
    strict: true
})
