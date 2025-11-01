#!/usr/bin/env node

/**
 * Test Database Connection
 * Verifies that all 13 tables were created successfully
 */

import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load environment variables from .env.local
config({ path: join(__dirname, '..', '.env.local') })

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Missing Supabase credentials')
  process.exit(1)
}

console.log('🔍 Testing Database Connection...\n')
console.log(`📍 Project URL: ${SUPABASE_URL}\n`)

// Create Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Expected tables
const expectedTables = [
  'clients',
  'campaign_settings',
  'datasets',
  'leads',
  'conversations',
  'messages',
  'lessons',
  'prompt_templates',
  'prompts',
  'prompt_versions',
  'users',
  'sophie_insights',
  'uploads'
]

console.log('📊 Checking tables...\n')

let allTablesExist = true

// Test each table
for (const table of expectedTables) {
  try {
    const { data, error, count } = await supabase
      .from(table)
      .select('*', { count: 'exact', head: true })

    if (error) {
      console.log(`  ❌ ${table.padEnd(25)} - ERROR: ${error.message}`)
      allTablesExist = false
    } else {
      console.log(`  ✅ ${table.padEnd(25)} - OK (${count || 0} rows)`)
    }
  } catch (err) {
    console.log(`  ❌ ${table.padEnd(25)} - ERROR: ${err.message}`)
    allTablesExist = false
  }
}

console.log('\n' + '='.repeat(50))

if (allTablesExist) {
  console.log('\n✅ SUCCESS! All 13 tables exist and are accessible!')
  console.log('\n📋 Next steps:')
  console.log('   1. Configure shadcn/ui components')
  console.log('   2. Set up PWA configuration')
  console.log('   3. Build dashboard UI components')
  console.log('   4. Create sample data for testing')
  process.exit(0)
} else {
  console.log('\n❌ FAILED! Some tables are missing or inaccessible.')
  console.log('\n🔧 Troubleshooting:')
  console.log('   1. Check the SQL Editor for any error messages')
  console.log('   2. Make sure the migration ran completely')
  console.log('   3. Check Row Level Security policies')
  process.exit(1)
}
