---
app_name: "Pulse"
app_description: "Pulse is a social media management application that allows creators to schedule, publish, and measure engagement across Instagram, Facebook, and LinkedIn from a single dashboard. It features AI-assisted caption generation and visual analytics to track performance."
core_flows:
  - feature: "Post Composition & Scheduling"
    description: "The core interface for creating social media posts with text, images, and platform-specific settings."
    mission: "Successfully create, preview, and schedule or save a social media post for multiple platforms."
    core: true
    coreReason: "If users cannot create or schedule posts, the primary value proposition of the app is lost."
  - feature: "Account Integration"
    description: "Connecting and managing social media profiles via OAuth for Instagram, Facebook, and LinkedIn."
    mission: "Securely link and unlink social media accounts to enable publishing capabilities."
    core: true
    coreReason: "Without connected accounts, the app cannot perform its main function of publishing content."
  - feature: "Dashboard & Analytics"
    description: "A centralized view of social media performance metrics and upcoming/recent activity."
    mission: "Provide accurate, real-time data on post performance and scheduling status."
    core: false
  - feature: "Post Management"
    description: "Viewing, filtering, and deleting scheduled, drafted, or published posts."
    mission: "Allow users to effectively organize and manage their content queue."
    core: false
  - feature: "AI Caption Generation"
    description: "Using AI to generate punchy, on-brand social media captions based on a topic and tone."
    mission: "Generate relevant and high-quality captions that match the user's selected tone and platform."
    core: false
  - feature: "Calendar View"
    description: "A visual calendar interface to see the distribution of posts over time."
    mission: "Show all scheduled and published posts accurately on their respective dates."
    core: false
  - feature: "User Authentication"
    description: "Signup and login functionality to protect user data and social integrations."
    mission: "Ensure secure access to the platform and maintain user sessions."
    core: true
    coreReason: "Authentication is the gatekeeper to all user-specific data and social media connections."
feature_count: 7
pages:
  - page: "/signup"
    description: "Account creation page with name, email, and password fields."
  - page: "/login"
    description: "Secure entry point for returning users."
  - page: "/"
    description: "Public landing page showcasing features and call-to-actions."
  - page: "/app/dashboard"
    description: "The main overview page showing status summaries and engagement totals."
  - page: "/app/compose"
    description: "The multi-platform post editor with media upload and AI tools."
  - page: "/app/posts"
    description: "A library of all posts with status filters (Draft, Scheduled, Published)."
  - page: "/app/calendar"
    description: "Visual schedule showing posts mapped to specific dates."
  - page: "/app/analytics"
    description: "Detailed performance charts and platform-specific breakdown."
  - page: "/app/accounts"
    description: "Integration management for social media account connections."
---

# Pulse Social App

Pulse is a "brutalist" social media scheduler built for creators who want to ship content across multiple platforms without the bloat of traditional enterprise tools. It focuses on speed, AI assistance, and clear performance signals.

## User Roles

- **Creator**: The primary user who connects social accounts, composes content, and monitors performance. There is only one user tier identified in the current codebase.

## Entry Point

Users typically arrive at the **Landing Page (/)**, which directs them to either **Login (/login)** or **Signup (/signup)**. After authentication, users are redirected to the **Dashboard (/app/dashboard)**.

## Navigation Structure

The application uses a sidebar navigation layout (defined in `AppLayout.jsx`) available at all `/app/*` routes:

- **Dashboard**: High-level overview of activity.
- **Compose**: Create new content.
- **Calendar**: Visual timeline of posts.
- **Posts**: List and manage all content.
- **Analytics**: Deep dive into performance data.
- **Accounts**: Manage integrations.

## Core Flows

### Post Composition & Scheduling
The heartbeat of Pulse. Users enter the **Compose** page to:
1.  **Write Content**: Enter text in a large textarea.
2.  **AI Assistance**: Input a topic and select a tone (energetic, professional, playful, etc.) to generate a caption using Claude.
3.  **Platform Selection**: Toggle between Instagram, Facebook, and LinkedIn.
4.  **Media Upload**: Attach images (handled via `/upload` API).
5.  **Scheduling**: Use a calendar and time picker to set a future date/time.
6.  **Persistence**: Save as a "Draft" or commit to "Scheduled".

### Account Integration
Found in the **Accounts** page, this flow is critical for functionality:
-   **Discovery**: View which platforms (Instagram, Facebook, LinkedIn) are currently connected.
-   **OAuth Flow**: Clicking "Connect" redirects the user to the platform's official authorization page (e.g., Facebook Login).
-   **Confirmation**: After successful OAuth, the user is redirected back to Pulse with a success toast and the account handle visible.
-   **Disconnection**: Users can revoke permissions and remove accounts at any time.

### User Authentication
-   **Signup**: New users register with name, email, and password.
-   **Login**: Returning users authenticate to access their private dashboard.
-   **Persistence**: Handled via `AuthContext`, ensuring the user remains logged in across sessions.

## Other Features

### Dashboard & Analytics
-   **Stat Cards**: Quick counts of total, scheduled, published, and draft posts.
-   **Engagement Totals**: Aggregated sums of impressions, likes, comments, shares, and clicks.
-   **Recent/Upcoming**: Lists the next 5 scheduled posts and last 5 published posts for quick access.
-   **Visual Analytics**: Recharts-powered line and bar graphs showing engagement trends over the last 14 days and platform-specific breakdowns.

### Post Management & Calendar
-   **Status Filtering**: The **Posts** page allows filtering by "Drafts", "Scheduled", and "Published".
-   **Direct Actions**: Users can "Publish Now" (skip the queue) or "Delete" posts directly from the list.
-   **Calendar Interaction**: Selecting a day on the calendar shows a filtered list of posts for that specific date.

## UI Patterns

-   **Brutalist Design**: High-contrast colors (Neon yellow, Blue, Red), thick black borders, and heavy typography (font-black, uppercase).
-   **Feedback**: Sonner-based toast messages for all actions (success/error).
-   **Modals/Popovers**: Used for date pickers and dropdown menus (shadcn/ui).
-   **Loading States**: Skeleton-like text or "Loading..." indicators during data fetching.

## Preferences
-   **Date/Time**: Handled in ISO format; displayed in the UI using local date/time strings (Medium date, Short time).
-   **Timezone**: Uses the user's browser timezone for display and scheduling.
-   **Platforms**: Fixed set of Instagram, Facebook, and LinkedIn.
