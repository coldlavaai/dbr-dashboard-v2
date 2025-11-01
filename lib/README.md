# Library Utilities

This directory contains shared utilities, configurations, and helper functions.

## Supabase Clients

### Client-Side (Browser)

Use `lib/supabase/client.ts` in React components and client-side code:

```typescript
'use client'

import { getSupabaseClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'

export function LeadsList() {
  const supabase = getSupabaseClient()
  const [leads, setLeads] = useState([])

  useEffect(() => {
    async function fetchLeads() {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .limit(10)

      if (data) setLeads(data)
    }

    fetchLeads()
  }, [])

  return <div>{/* Render leads */}</div>
}
```

### Server-Side (API Routes & Server Components)

Use `lib/supabase/server.ts` in server components and API routes:

```typescript
import { createClient } from '@/lib/supabase/server'

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: leads } = await supabase
    .from('leads')
    .select('*')
    .limit(10)

  return <div>{/* Render leads */}</div>
}
```

### API Routes

```typescript
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('leads')
    .select('*')

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data })
}
```

### Service Role Client (Admin)

**WARNING:** The service role client bypasses Row Level Security. Only use for:
- Background jobs
- Admin operations
- Data migrations
- System tasks

```typescript
import { createServiceRoleClient } from '@/lib/supabase/server'

export async function POST() {
  const supabase = createServiceRoleClient()

  // This bypasses RLS - use with caution!
  const { data, error } = await supabase
    .from('leads')
    .insert({
      first_name: 'Test',
      last_name: 'User',
      // ...
    })

  return NextResponse.json({ data, error })
}
```

## Type Safety

The `lib/supabase/types.ts` file contains TypeScript types generated from your database schema.

### Regenerating Types

After making database schema changes:

```bash
npx supabase gen types typescript --project-id YOUR_PROJECT_ID > lib/supabase/types.ts
```

### Using Types

```typescript
import type { Database, Client, ClientInsert } from '@/lib/supabase/types'

const newClient: ClientInsert = {
  company_name: 'Acme Solar',
  industry: 'solar',
  // TypeScript will autocomplete and validate!
}
```

## Authentication

The middleware (`middleware.ts`) automatically:
- Refreshes auth sessions
- Protects authenticated routes
- Redirects unauthenticated users to login

### Getting Current User

```typescript
// Server-side
const supabase = await createClient()
const { data: { user } } = await supabase.auth.getUser()

// Client-side
const supabase = getSupabaseClient()
const { data: { user } } = await supabase.auth.getUser()
```

### Sign In

```typescript
const supabase = getSupabaseClient()

const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password',
})
```

### Sign Out

```typescript
const supabase = getSupabaseClient()
await supabase.auth.signOut()
```

## Real-time Subscriptions

Subscribe to database changes in real-time:

```typescript
const supabase = getSupabaseClient()

const channel = supabase
  .channel('leads_changes')
  .on(
    'postgres_changes',
    {
      event: '*',
      schema: 'public',
      table: 'leads',
    },
    (payload) => {
      console.log('Change received!', payload)
    }
  )
  .subscribe()

// Don't forget to unsubscribe!
return () => {
  supabase.removeChannel(channel)
}
```

## Row Level Security (RLS)

All database queries automatically respect RLS policies. Users can only access data from their own client/organization.

### Testing RLS

```typescript
// This will only return leads for the current user's client
const { data } = await supabase
  .from('leads')
  .select('*')

// No need to filter by client_id - RLS handles it automatically!
```

## Best Practices

1. **Client vs Server**
   - Use client-side for interactive UI
   - Use server-side for initial data loading and SEO

2. **Error Handling**
   ```typescript
   const { data, error } = await supabase.from('leads').select('*')

   if (error) {
     console.error('Database error:', error.message)
     // Handle error appropriately
   }
   ```

3. **Type Safety**
   - Always use the generated types
   - Let TypeScript catch errors at compile time

4. **Performance**
   - Use `.select()` to specify only needed columns
   - Use `.limit()` for pagination
   - Create indexes for frequently queried columns

## Next Steps

1. Set up your Supabase project
2. Run the migration: `supabase/migrations/001_initial_schema.sql`
3. Generate types: `npx supabase gen types typescript...`
4. Update `.env.local` with your Supabase credentials
5. Start building features!
