#!/bin/bash

# Load environment variables
source .env.local

# Read migration SQL
SQL_FILE="supabase/migrations/001_initial_schema.sql"

echo "🚀 Running database migration..."
echo "📍 Project: $NEXT_PUBLIC_SUPABASE_URL"
echo "📄 Migration file: $SQL_FILE"
echo ""

# Use Supabase REST API to execute SQL
# Note: This uses the postgREST API endpoint
curl -X POST "${NEXT_PUBLIC_SUPABASE_URL}/rest/v1/rpc/exec_sql" \
  -H "apikey: ${SUPABASE_SERVICE_ROLE_KEY}" \
  -H "Authorization: Bearer ${SUPABASE_SERVICE_ROLE_KEY}" \
  -H "Content-Type: application/json" \
  -H "Prefer: return=representation" \
  -d "{\"sql_query\": $(cat $SQL_FILE | jq -Rs .)}"

echo ""
echo "✅ Migration request sent!"
