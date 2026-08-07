# AITM Lost & Found - Project Development Rules

## Project Goal

Build a production-quality Lost & Found web application for the AITM Coding Club Assessment.

The objective is NOT just to make it work.

The application should feel like a real product that could actually be used inside AITM.

---

# Tech Stack (DO NOT CHANGE)

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Supabase
- Vercel

Do not introduce another framework.

Do not migrate to another stack.

---

# Architecture Rules

Keep the project modular.

Never put everything inside one file.

Use reusable components.

Separate:

- UI
- Business Logic
- Database Logic
- Types
- Constants

---

# Folder Rules

app/
Routing only

components/
Reusable UI Components

components/forms
Form Components

components/items
Lost Item Components

components/layout
Navbar, Footer etc.

components/ui
Buttons, Cards, Inputs etc.

lib/
Supabase Client

constants/
Reusable Constants

types/
TypeScript Interfaces

utils/
Helper Functions

---

# UI Rules

Modern.

Minimal.

Professional.

Mobile First.

Use whitespace properly.

Rounded corners.

Soft shadows.

Consistent spacing.

Responsive.

No ugly forms.

No giant buttons.

No unnecessary animations.

---

# Coding Rules

Use TypeScript properly.

Avoid "any".

Use meaningful variable names.

Keep components small.

Never duplicate code.

Comment only where necessary.

Prefer readable code over clever code.

---

# Database Rules

Supabase is the only database.

Never hardcode data that belongs in the database.

Images must be uploaded to Supabase Storage.

---

# Allowed Libraries

Only install libraries when absolutely necessary.

Prefer built-in Next.js functionality.

If adding a dependency, explain why.

---

# Things NOT to Change

Do not modify unrelated files.

Do not change project architecture.

Do not rename folders.

Do not introduce authentication unless specifically requested.

Do not create unnecessary API routes.

---

# Feature Development Process

Whenever implementing a feature:

1. Create reusable components.
2. Keep files organized.
3. Handle loading states.
4. Handle errors.
5. Validate inputs.
6. Make the UI responsive.

---

# Code Quality

Assume another developer will continue this project.

Write clean code.

Avoid hacks.

Avoid unnecessary complexity.

Prioritize maintainability.

---

# Git

Each feature should represent one meaningful Git commit.

Never generate code for multiple unrelated features in one step.

---

# Important

This project will later be reviewed by another developer.

Write code that is easy to understand.

Always preserve the existing project structure.