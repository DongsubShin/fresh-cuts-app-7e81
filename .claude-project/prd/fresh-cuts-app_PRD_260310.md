# Fresh Cuts — Product Requirements Document

**Version:** 1.0
**Date:** October 26, 2023
**Status:** Draft

---

## 0. Project Overview

### Product

**Name:** fresh-cuts-app
**Type:** Web Application (Mobile-Responsive)
**Deadline:** December 31, 2023
**Status:** Draft

### Description

Fresh Cuts is a specialized barber shop management platform designed to replace the shop's reliance on Booksy. It provides a dual-stream entry system: a traditional appointment booking engine and a real-time digital walk-in queue. The app empowers the three-barber team to manage their schedules, track commissions, and maintain client relationships through an integrated CRM and SMS notification system.

### Goals

1. **Reduce Overhead:** Eliminate monthly Booksy subscription fees by moving to a self-hosted custom solution.
2. **Optimize Walk-ins:** Implement a transparent digital queue to manage shop traffic and reduce physical waiting room congestion.
3. **Automate Retention:** Use SMS reminders and a built-in loyalty program to increase re-booking rates.
4. **Financial Transparency:** Provide automated commission tracking for the 3 barbers to simplify end-of-week payouts.

### Target Audience

| Audience | Description |
|----------|-------------|
| **Primary** | Local clients looking for high-quality haircuts with the convenience of online booking or real-time waitlist updates. |
| **Secondary** | The 3 barbers (Staff) who need to manage their daily workflow and see their earnings. |
| **Admin** | The Shop Owner who manages the business operations, staff performance, and shop settings. |

### User Types

| Type | DB Value | Description | Key Actions |
|------|----------|-------------|-------------|
| **Client** | `0` | Regular customers | Book appointments, join walk-in queue, track loyalty points. |
| **Barber** | `1` | Shop staff (3 total) | Manage personal calendar, view commission, mark services as complete. |
| **Admin** | `99` | Shop Owner | Manage shop hours, adjust commission rates, view full shop analytics. |

### User Status

| Status | DB Value | Behavior |
|--------|----------|----------|
| **Active** | `0` | Full access to booking and profile features. |
| **Suspended** | `1` | Cannot book; show: "Please contact the shop regarding your account status." |
| **Withdrawn** | `2` | Account deactivated; data anonymized after 30 days for GDPR/Privacy compliance. |

### MVP Scope

**Included:**
- Appointment booking engine with barber-specific calendars.
- Digital walk-in queue with SMS "You're next" notifications.
- Client CRM with service history and loyalty point tracking.
- Commission tracking (percentage-based) for the 3 barbers.
- Basic analytics (Revenue, Top Services, Barber Performance).
- SMS reminders via Twilio integration.

**Excluded (deferred):**
- Inventory/Product sales management.
- Multi-location support (Phase 2).
- Advanced AI-based dynamic pricing.

---

## 1. Terminology

### Core Concepts

| Term | Definition |
|------|------------|
| **Fresh Cuts App** | The unified platform for clients, barbers, and the shop owner. |
| **The Queue** | The real-time list of walk-in clients currently waiting for the next available barber. |
| **Service** | A specific offering (e.g., "Skin Fade," "Beard Trim") with a set price and duration. |
| **Commission** | The percentage of a service price allocated to the barber (e.g., 60/40 split). |
| **Loyalty Stamp** | A digital credit earned per haircut; 10 stamps = 1 free haircut. |

### User Roles

| Role | Description |
|------|-------------|
| **Guest** | Unauthenticated user who can view the shop's services and current walk-in wait times. |
| **Client** | Authenticated user who can manage bookings and view their loyalty status. |
| **Barber** | Staff member who can manage their own schedule and see their specific earnings. |
| **Admin** | The owner with full access to financial reports and system configuration. |

### Status Values

| Enum | Values | Description |
|------|--------|-------------|
| **BookingStatus** | `PENDING`, `CONFIRMED`, `COMPLETED`, `NOSHOW`, `CANCELLED` | The lifecycle of an appointment. |
| **QueueStatus** | `WAITING`, `IN_CHAIR`, `FINISHED` | The lifecycle of a walk-in client. |
| **PaymentStatus** | `UNPAID`, `PAID`, `REFUNDED` | The status of the transaction. |

### Technical Terms

| Term | Definition |
|------|------------|
| **JWT** | JSON Web Token used for secure user authentication. |
| **Slug** | The unique URL identifier for a barber's profile (e.g., `/barber/john-doe`). |
| **Webhook** | A notification from Stripe or Twilio to update payment or SMS status. |

---

## 2. System Modules

### Module 1 — Booking & Scheduling Engine

This module handles the complex logic of matching client requests with barber availability and shop hours.

#### Main Features

1. **Dynamic Availability** — Calculates free slots based on existing bookings and barber shifts.
2. **Buffer Management** — Automatically adds 10-minute "cleanup" periods between appointments.
3. **SMS Reminders** — Sends automated texts 24 hours and 2 hours before the appointment.

#### Technical Flow

##### Appointment Booking Flow

1. User selects a Service and a Barber.
2. App queries the `AvailabilityService` for available blocks of time.
3. Backend checks `Bookings` table for conflicts and `BarberShifts` for working hours.
4. On selection, the system creates a `Booking` record with status `PENDING`.
5. On payment/confirmation:
   - Status updates to `CONFIRMED`.
   - Twilio API is triggered to send a confirmation SMS.
   - Calendar event is synced to the Barber's dashboard.
6. On failure:
   - Show: "This slot was just taken. Please select another time."

---

### Module 2 — Walk-in Queue Management

Manages non-appointment traffic, providing a digital "take a number" experience.

#### Main Features

1. **Wait Time Estimation** — Calculates wait time based on average service duration and current queue length.
2. **Remote Check-in** — Allows clients to join the queue via their phone before arriving.
3. **"You're Next" Alerts** — Automated SMS when the client is #2 in line.

#### Technical Flow

1. Client clicks "Join Queue" and selects a service.
2. System calculates `EstimatedWait = (PeopleInQueue * 30 mins) / ActiveBarbers`.
3. Client record added to `Queue` table with `WAITING` status.
4. When a Barber marks a previous client as `FINISHED`:
   - The next client in the `Queue` receives an SMS: "You're up next! Please head to the shop."
   - Status updates to `IN_CHAIR`.

---

### Module 3 — Commission & Financials

Tracks the revenue split between the shop and the 3 barbers.

#### Main Features

1. **Automated Split** — Calculates barber's cut based on a per-barber percentage (e.g., 50% or 60%).
2. **Payout Reporting** — Generates weekly summaries for the owner to process payments.

#### Technical Flow

1. Barber marks booking as `COMPLETED`.
2. System triggers `CommissionCalculator`:
   - `BarberEarnings = ServicePrice * BarberCommissionRate`.
   - `ShopEarnings = ServicePrice - BarberEarnings`.
3. A `Transaction` record is created linking the Barber, Client, and Service.
4. Admin Dashboard updates the "Total Revenue" and "Pending Payouts" charts in real-time.

---

## 3. User Application

### 3.1 Page Architecture

**Stack:** React, React Router, Tailwind CSS, Lucide React (Icons).

#### Route Groups

| Group | Access |
|-------|--------|
| Public | Anyone (Landing, Services, Wait Times) |
| Auth | Unauthenticated (Login, Register) |
| Protected | Logged-in Clients (My Bookings, Loyalty) |
| Staff | Barbers & Admin (Daily Schedule, Earnings) |

#### Page Map

**Public**
| Route | Page |
|-------|------|
| `/` | Home (Shop Info + Current Wait Time) |
| `/services` | Service Menu & Pricing |
| `/book` | Booking Flow (Step-by-step) |

**Auth**
| Route | Page |
|-------|------|
| `/login` | Login |
| `/register` | Create Account |

**Protected (Client)**
| Route | Page |
|-------|------|
| `/dashboard` | Client Overview (Next Appt, Loyalty Points) |
| `/bookings` | Booking History |
| `/profile` | Account Settings |

**Staff (Barber/Admin)**
| Route | Page |
|-------|------|
| `/staff/schedule` | Daily Appointment List |
| `/staff/queue` | Walk-in Queue Management |
| `/staff/earnings` | Personal Commission Report |

---

### 3.2 Feature List by Page

#### `/` — Home
- **Live Wait Time Display:** Shows "Current Wait: 45 mins" based on queue logic.
- **Quick Actions:** "Book Appointment" and "Join Walk-in Queue" buttons.
- **Shop Status:** Displays if the shop is currently Open/Closed.

#### `/book` — Booking Flow
- **Barber Selection:** View profiles of the 3 barbers.
- **Service Selection:** Choose from Haircut, Beard, or Combo.
- **Date/Time Picker:** Calendar view with available slots only.
- **Summary:** Review price and time before confirming.

#### `/dashboard` — Client Dashboard
- **Upcoming Appointment Card:** Shows time, barber, and "Cancel" button (if > 24h).
- **Loyalty Tracker:** Visual progress bar (e.g., "7/10 cuts until your free one!").
- **Quick Re-book:** One-click button to book the same service as last time.

#### `/staff/schedule` — Daily Schedule (Barber View)
- **Timeline View:** Vertical list of the day's appointments.
- **Status Toggle:** Mark client as "Arrived," "Completed," or "No-Show."
- **Client Notes:** View specific preferences (e.g., "Uses #2 guard on sides").

---

## 4. Admin Dashboard

### 4.1 Page Architecture

**Access:** Admin role only (Shop Owner)

| Route | Page |
|-------|------|
| `/admin` | Overview (Revenue & Traffic) |
| `/admin/barbers` | Staff Management |
| `/admin/services` | Service & Price Management |
| `/admin/clients` | CRM / Client List |
| `/admin/reports` | Financial & Commission Reports |
| `/admin/settings` | Shop Hours & SMS Config |

---

### 4.2 Feature List by Page

#### `/admin` — Overview
- **Revenue Charts:** Daily, Weekly, and Monthly income.
- **Barber Performance:** Comparison of bookings vs. walk-ins per barber.
- **Queue Stats:** Average wait time and "abandonment rate" (people who leave the queue).

#### `/admin/barbers` — Staff Management
- **Profile CRUD:** Edit barber names, photos, and bios.
- **Commission Rates:** Set individual percentage splits for each of the 3 barbers.
- **Shift Management:** Set weekly working hours and vacation days.

#### `/admin/services` — Service Management
- **Service Editor:** Add/Edit services (Name, Price, Duration in minutes).
- **Category Toggles:** Group services (e.g., "Hair," "Beard," "Extras").

#### `/admin/clients` — CRM
- **Searchable List:** Find clients by name or phone number.
- **Service History:** View every past visit, barber seen, and amount spent.
- **Manual Loyalty Adjustment:** Admin can manually add/remove loyalty stamps.

#### `/admin/reports` — Financial Reports
- **Payout Calculator:** Generate a report for "Barber A" showing total earned and shop's cut for a date range.
- **Export:** Download CSV/PDF for accounting.

---

## 5. Tech Stack

### Architecture

The application follows a modern monolithic API approach with a decoupled frontend.

```
fresh-cuts-app/
├── backend/    ← NestJS API (Node.js)
├── frontend/   ← React (Vite) User & Staff App
└── shared/     ← Shared Types & Constants
```

### Technologies

| Layer | Technology | Version | Purpose |
|-------|------------|---------|---------|
| Backend | NestJS | 10.x | Scalable API architecture |
| Language | TypeScript | 5.x | Type safety across the stack |
| ORM | TypeORM | 0.3.x | Database mapping and migrations |
| Database | PostgreSQL | 15.x | Relational data for bookings/users |
| Frontend | React | 18.x | UI Library |
| Routing | React Router | 6.x | Client-side navigation |
| State | TanStack Query | 5.x | Server state management & caching |
| CSS | Tailwind CSS | 3.x | Utility-first styling |
| Build | Vite | 4.x | Fast frontend bundling |

### Third-Party Integrations

| Service | Purpose |
|---------|---------|
| **Twilio** | Sending SMS reminders and queue notifications. |
| **Stripe** | Processing deposits (optional) and final payments. |
| **Cloudinary** | Hosting barber profile photos and shop gallery. |

### Key Decisions

| Decision | Rationale |
|----------|-----------|
| **PostgreSQL** | Required for complex relational queries between Barbers, Services, and Bookings. |
| **NestJS** | Provides a structured framework that makes commission logic easy to test and maintain. |
| **Tailwind CSS** | Allows for rapid UI development and ensures the app is mobile-responsive for clients on the go. |

### Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | Connection string for PostgreSQL. |
| `JWT_SECRET` | Secret key for signing authentication tokens. |
| `TWILIO_AUTH_TOKEN` | API key for SMS services. |
| `COMMISSION_DEFAULT` | Default shop commission rate (e.g., 0.4 for 40%). |

---

## 6. Open Questions

| # | Question | Context / Impact | Owner | Status |
|:-:|----------|-----------------|-------|--------|
| 1 | Should we require a deposit? | Reduces no-shows but might lower booking conversion. | Client | ⏳ Open |
| 2 | Migration from Booksy? | Do we need to import historical client data or start fresh? | Admin | ⏳ Open |
| 3 | Walk-in Hardware? | Will there be a tablet at the front desk for manual check-ins? | Admin | ⏳ Open |
| 4 | SMS Costs? | Twilio charges per SMS; do we need a cap on notifications? | PM | ⏳ Open |