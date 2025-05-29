# AgriFund

AgriFund is a comprehensive digital platform that connects farmers with loan lenders, streamlining agricultural financing through transparent credit evaluation, robust profile management, and a data-driven loan matching process.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [How It Works](#how-it-works)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Overview

AgriFund empowers farmers to access fair and timely credit by building detailed digital profiles and connecting with a network of formal and informal loan lenders. Lenders can efficiently evaluate farmers using transparent, data-driven metrics, reducing risk and increasing trust in agricultural lending.

---

## Features

- **Farmer Profiles:** Capture static and derived metrics (credit history, land productivity, repayment reliability, etc.).
- **Lender Profiles:** Showcase lending capacity, interest rates, approval criteria, and risk appetite.
- **Loan Request & Management:** Farmers can request loans directly from lender profiles; lenders can review, accept, or reject requests.
- **Credit Evaluation System:** Advanced scoring and eligibility checks based on multi-criteria decision models.
- **Repayment Tracking:** Monitor loan disbursement, repayment schedules, and loan application status.
- **Transparent Matching:** Both parties have visibility into eligibility and decision factors.
- **Modern UI:** Built with Next.js, [Tailwind CSS](https://tailwindcss.com/) , and [shadcn/ui](https://ui.shadcn.com/) for a fast, responsive, and accessible user experience.

---

## How It Works

1. **Farmer Registration:** Farmers create profiles with detailed static data (land, experience, credit history, productivity).
2. **Lender Registration:** Lenders set up profiles detailing lending policies, capital, and requirements.
3. **Loan Request:** Farmers browse lender profiles, check eligibility, and submit loan requests.
4. **Review & Decision:** Lenders evaluate requests using farmer metrics and either accept or reject applications.
5. **Loan Lifecycle:** Upon acceptance, loans are tracked for disbursement, repayment, and closure.

---

## Tech Stack

- **Frontend:** [Next.js](https://nextjs.org/) (React framework)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Authentication:** [Next Auth js](https://next-auth.js.org/)

---

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation
1. Go to the root folder and run this to install all the dependency:
```bsh
    npm install
```

2. Then create a .env.local file at the root directory to include the following environment details:
   ```bsh
       NEXT_PUBLIC_BACKEND_BASE_URL={backend_url}
       NEXTAUTH_SECRET={next_auth_secret}
   ```

3. Run the Project:
   ```bsh
       npm run dev
   ```

4. Then visit http://localhost:3000/ to experince thr Project.
   

