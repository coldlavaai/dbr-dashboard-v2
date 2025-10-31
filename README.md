# DBR V2 - AI-Powered Database Reactivation Platform

**"The functionality of HighLevel and MORE, with the simplicity of an iPhone."**

Built by **Cold Lava AI** for **Greenstar Solar** (and future clients)

---

## 🎯 What Is This?

An intelligent CRM that automates lead reactivation using:
- **Automated SMS campaigns** (M1/M2/M3 sequences)
- **AI-powered conversations** (Claude 3.5 Sonnet responds to leads)
- **Sophie Intelligence** (AI that improves the AI by analyzing conversations and learning)
- **Real-time dashboard** (beautiful, intuitive, just works)

### The Unique Advantage: **Sophie**

Sophie is an AI conversation coach that:
1. Analyzes every message in real-time
2. Identifies issues and opportunities
3. Learns from your feedback
4. Evolves the AI agent's prompts automatically
5. Continuously improves conversion rates

**No competitor has this.**

---

## 📚 Complete Documentation

### Architecture & Design
1. **[Database Schema](DBR_V2_DATABASE_SCHEMA.md)** - Complete Supabase/PostgreSQL structure
2. **[Component Architecture](DBR_V2_COMPONENT_ARCHITECTURE.md)** - UI components and frontend structure
3. **[Sophie Intelligence](DBR_V2_SOPHIE_INTELLIGENCE.md)** - AI coaching system design
4. **[API Routes](DBR_V2_API_ROUTES.md)** - All backend endpoints and data flows

### Build Plan
5. **[4-Week Build Plan](DBR_V2_BUILD_PLAN.md)** - Day-by-day development schedule

---

## 🛠️ Tech Stack

**Frontend:**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- React Hook Form + Zod

**Backend:**
- Next.js API Routes (serverless)
- Supabase (PostgreSQL + Auth + Realtime + Storage)

**AI:**
- Claude 3.5 Sonnet (Anthropic) - Main AI agent
- Claude 3.5 Sonnet (Anthropic) - Sophie analysis

**Integrations:**
- Twilio (SMS sending/receiving)
- Cal.com (call booking)

**Deployment:**
- Vercel (hosting + cron jobs)

---

## 📊 System Architecture Overview

```
┌─────────────────────────────────────────────┐
│           DASHBOARD (Next.js)               │
│                                             │
│  ┌───────────────────────────────────┐    │
│  │  Datasets → Leads → Conversations  │    │
│  │  Sophie Intelligence Dashboard     │    │
│  │  Analytics & Reporting             │    │
│  └───────────────────────────────────┘    │
└─────────────────┬───────────────────────────┘
                  │
         ┌────────┴────────┐
         │                 │
    ┌────▼────┐      ┌────▼────┐
    │ Supabase│      │   APIs  │
    │   DB    │      │ External│
    └────┬────┘      └────┬────┘
         │                │
         │           ┌────▼────┐
         │           │ Twilio  │ (SMS)
         │           │ Claude  │ (AI)
         │           │ Cal.com │ (Booking)
         │           └─────────┘
         │
    ┌────▼────────────────────────┐
    │  Data Flow:                 │
    │                             │
    │  CSV Upload → Leads         │
    │  M1/M2/M3 → Twilio → Lead   │
    │  Lead Replies → AI Response │
    │  Every Message → Sophie     │
    │  Sophie → Insights          │
    │  Insights → Lessons         │
    │  Lessons → Improved Prompts │
    └─────────────────────────────┘
```

---

## 🚀 Quick Start (Once Built)

### For Development

```bash
# Clone repository
git clone https://github.com/coldlavaai/dashboardproject.git
cd dashboardproject

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API keys

# Run development server
npm run dev
```

Visit: `http://localhost:3000`

### For Production Deployment

```bash
# Build for production
npm run build

# Deploy to Vercel
vercel --prod
```

---

## 📋 Current Status

**Phase:** Architecture & Planning ✅
**Next Phase:** Week 1 - Foundation

### ✅ Completed
- [x] Complete database schema designed
- [x] UI component architecture mapped
- [x] Sophie intelligence system designed
- [x] All API routes documented
- [x] 4-week build plan created

### 🔨 Next Steps (Week 1)
- [ ] Day 1: Set up Supabase database
- [ ] Day 2: Implement authentication
- [ ] Day 3: Build dashboard shell
- [ ] Day 4: Dataset management UI
- [ ] Day 5: CSV upload & column mapping

---

## 💡 Key Features

### For End Users (Sales Teams)
- ✅ Upload leads via CSV (drag & drop, column mapping)
- ✅ Automated M1/M2/M3 campaigns (customizable timing)
- ✅ AI responds to every lead reply (within 60 seconds)
- ✅ Manual mode (toggle AI off, respond yourself)
- ✅ Click-to-call, click-to-email, clickable postcodes
- ✅ Book calls directly via Cal.com integration
- ✅ Real-time dashboard updates (Supabase Realtime)
- ✅ Beautiful analytics (conversion funnel, trends, etc.)

### For Admins
- ✅ Multi-user access with role-based permissions
- ✅ Sophie insights dashboard (AI coaching)
- ✅ Lessons library (build institutional knowledge)
- ✅ Prompt management (edit AI behavior)
- ✅ User management (invite, permissions, roles)
- ✅ Client settings (branding, integrations)

### For Sophie (The Secret Sauce)
- ✅ Analyzes every message in real-time
- ✅ Flags critical issues instantly (compliance, errors)
- ✅ Suggests improvements based on patterns
- ✅ Learns from human feedback (agree/disagree/teach)
- ✅ Builds lessons library automatically
- ✅ Evolves AI prompts continuously
- ✅ Measures impact (before/after Sophie metrics)

---

## 📈 Success Metrics

### Technical KPIs
- **Uptime:** 99%+
- **API Response:** < 500ms
- **Page Load:** < 3s
- **Message Queue:** < 5 min to send all M1s

### Business KPIs (Greenstar - First Client)
- **Leads Imported:** 975
- **Reply Rate:** Target 10-15%
- **Call Booking Rate:** Target 5-10%
- **AI Response Rate:** 100% (all replies answered)
- **Sophie Insights Generated:** 10+ per day

### Sophie KPIs
- **Lessons Created:** 50+ in first month
- **Insight Approval Rate:** > 70%
- **Performance Improvement:** +20% booking rate after Sophie

---

## 🎨 Design Philosophy

### Simplicity (iPhone)
- Intuitive UI - no training required
- One-click actions throughout
- Beautiful, modern design
- Mobile-first responsive

### Power (HighLevel +)
- Full CRM functionality
- Advanced automation
- Real-time everything
- Comprehensive analytics

### Intelligence (Unique)
- Sophie learns and improves
- AI that teaches AI
- Pattern recognition
- Continuous optimization

---

## 🔐 Security

- **Authentication:** Supabase Auth (email/password, SSO ready)
- **Authorization:** Row Level Security (RLS) on all tables
- **Data Isolation:** Multi-tenant architecture
- **API Keys:** Stored in Vercel environment variables
- **Webhooks:** Validated signatures (Twilio, Cal.com)

---

## 💰 Cost Structure

### Development
- **Time:** 4 weeks (160 hours)
- **Cost:** Your time

### Monthly Operating Costs
```
Supabase:   £20-50   (Pro plan)
Vercel:     £20      (Pro plan)
Anthropic:  £50-150  (Claude API usage)
Twilio:     £50-200  (SMS costs)
Cal.com:    £0-15    (Free or Pro)
────────────────────
Total:      £150-450/month
```

### Revenue Potential (When Selling)
```
Starter:     £99/month  (1 dataset, 1,000 leads)
Pro:         £299/month (5 datasets, 10,000 leads)
Enterprise:  £999/month (unlimited)

Break-even: 2-3 Pro clients
Profit:     Scales rapidly
```

---

## 🗺️ Roadmap

### V2.0 (Current - 4 Weeks)
- ✅ Full CRM (datasets, leads, conversations)
- ✅ M1/M2/M3 automation
- ✅ AI responses (Claude)
- ✅ Sophie intelligence
- ✅ Cal.com integration
- ✅ Analytics dashboard

### V2.1 (Month 2)
- WhatsApp integration
- Voice calling (Retell AI)
- Advanced reporting (PDF exports)
- Email campaigns

### V2.2 (Month 3)
- Multi-client fully operational
- White-label branding
- Billing/subscriptions
- Client portal

### V2.3 (Month 4+)
- Predictive lead scoring
- A/B testing framework
- Automatic lesson creation
- CRM integrations (HubSpot, etc.)

---

## 👥 Team

**Built by:** Cold Lava AI
**For:** Greenstar Solar (first client)
**With help from:** Claude Code (Anthropic)

**Contact:**
- Email: oliver@coldlava.ai
- Website: https://coldlava.ai
- GitHub: https://github.com/coldlavaai

---

## 📝 License

Private - Cold Lava AI Proprietary

(Will be white-labeled for clients)

---

## 🎉 Vision

**We're building the future of sales automation.**

Not just a CRM. Not just AI automation. But an **intelligent system that learns and improves itself.**

Sophie is the breakthrough - an AI that analyzes conversations, learns from feedback, and continuously evolves the customer-facing AI to be more effective.

**This is revolutionary.**

---

**Ready to start building?**

Next step: [Day 1 - Database Setup](DBR_V2_BUILD_PLAN.md#day-1-project-setup--database-8-hours)

---

**Powered by Cold Lava** 🌋

