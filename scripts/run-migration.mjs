#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Read environment variables
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Missing Supabase credentials in environment variables')
  console.error('Make sure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in .env.local')
  process.exit(1)
}

console.log('🚀 Starting database migration...')
console.log(`📍 Project: ${SUPABASE_URL}`)

// Create Supabase client with service role key (bypasses RLS)
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Read migration file
const migrationPath = join(__dirname, '..', 'supabase', 'migrations', '001_initial_schema.sql')
const sql = readFileSync(migrationPath, 'utf-8')

console.log('📄 Migration file loaded:', migrationPath)
console.log(`📊 SQL size: ${(sql.length / 1024).toFixed(2)} KB`)

// Split SQL into individual statements (rough split on semicolons)
// This is a simple approach - for production you'd want a proper SQL parser
const statements = sql
  .split(';')
  .map(s => s.trim())
  .filter(s => s.length > 0 && !s.startsWith('--'))

console.log(`🔧 Found ${statements.length} SQL statements to execute\n`)

let successCount = 0
let errorCount = 0

// Execute each statement
for (let i = 0; i < statements.length; i++) {
  const statement = statements[i] + ';'

  // Skip comments and empty statements
  if (statement.trim() === ';' || statement.trim().startsWith('--')) {
    continue
  }

  // Show progress for major operations
  const isTableCreate = statement.includes('CREATE TABLE')
  const isIndexCreate = statement.includes('CREATE INDEX')
  const isTriggerCreate = statement.includes('CREATE TRIGGER')
  const isFunctionCreate = statement.includes('CREATE FUNCTION') || statement.includes('CREATE OR REPLACE FUNCTION')
  const isPolicyCreate = statement.includes('CREATE POLICY')

  if (isTableCreate || isIndexCreate || isTriggerCreate || isFunctionCreate || isPolicyCreate) {
    const match = statement.match(/CREATE (?:TABLE|INDEX|TRIGGER|FUNCTION|POLICY|OR REPLACE FUNCTION) (?:IF NOT EXISTS )?(\w+)/i)
    const name = match ? match[1] : 'unknown'

    let type = 'statement'
    if (isTableCreate) type = 'table'
    else if (isIndexCreate) type = 'index'
    else if (isTriggerCreate) type = 'trigger'
    else if (isFunctionCreate) type = 'function'
    else if (isPolicyCreate) type = 'policy'

    process.stdout.write(`  Creating ${type}: ${name}...`)
  }

  try {
    const { error } = await supabase.rpc('exec_sql', { sql_query: statement })

    // If rpc doesn't work, try direct query (though this won't work for DDL)
    if (error && error.message.includes('not found')) {
      // Fallback: This won't work for most DDL statements, but let's try
      const { error: queryError } = await supabase.from('_').select('*').limit(0)
      throw new Error('Direct SQL execution not available via Supabase client. Please run migration via Supabase dashboard.')
    }

    if (error) {
      console.log(' ❌')
      console.error(`    Error: ${error.message}`)
      errorCount++
    } else {
      if (isTableCreate || isIndexCreate || isTriggerCreate || isFunctionCreate || isPolicyCreate) {
        console.log(' ✅')
      }
      successCount++
    }
  } catch (err) {
    if (isTableCreate || isIndexCreate || isTriggerCreate || isFunctionCreate || isPolicyCreate) {
      console.log(' ❌')
    }
    console.error(`    Error: ${err.message}`)
    errorCount++
  }
}

console.log(`\n📊 Migration Summary:`)
console.log(`   ✅ Successful: ${successCount}`)
console.log(`   ❌ Errors: ${errorCount}`)

if (errorCount > 0) {
  console.log(`\n⚠️  Some statements failed. This is expected because:`)
  console.log(`   - Supabase JS client cannot execute DDL statements directly`)
  console.log(`   - You need to run the migration via Supabase SQL Editor`)
  console.log(`\n📋 Next steps:`)
  console.log(`   1. Open https://ngkjfehvoeymjoqppthy.supabase.co/project/ngkjfehvoeymjoqppthy/sql`)
  console.log(`   2. Click "New Query"`)
  console.log(`   3. Copy the contents of: supabase/migrations/001_initial_schema.sql`)
  console.log(`   4. Paste and click "Run"`)
  process.exit(1)
} else {
  console.log(`\n✅ Migration completed successfully!`)
  process.exit(0)
}
