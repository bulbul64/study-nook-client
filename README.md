Markdown
# StudyNook – Library Study Room Booking Platform

StudyNook is a fully responsive, full-stack single-page web application (SPA) designed for students and library users to seamlessly list, discover, and book private study rooms. The platform handles real-time booking calculations, eliminates over-allocations using custom server-side time-conflict detection, and secures user data using JWT stored inside HTTP-only cookies.

**Live Site URL:** [https://study-nook-client-dun.vercel.app/](https://study-nook-client-dun.vercel.app/)

---

## 🚀 Key Features

* **Advanced Room Conflict Detection & Scheduling:** Prevents overlapping or double-bookings by executing server-side time checks ($gte and $lte logic). It automatically computes total costs in real-time based on the selected hours and the room's hourly rate.
* **Secure JWT Auth via HTTP-Only Cookies:** Implements robust user authentication (Email/Password and Google OAuth) with tokens stored safely in HTTP-only cookies to mitigate XSS risks. Users remain securely logged in even after browser reloads on private routes.
* **Full Room Asset CRUD Management:** Authenticated room owners have exclusive permissions to dynamically create, pre-fill/update, or delete their listings. Forms include checkboxes for interactive amenities, floor inputs, and individual seat capacities.
* **Dynamic Search & Multi-Criteria Filtering:** Offers an optimized search and filter architecture on the "All Rooms" page. Users can query spaces instantly by name regex matches, structural floors, or array-based amenity inclusions ($in operator).
* **Personalized User Dashboards & Clean Workflows:** Features dedicated `My Listings` and `My Bookings` views. Users can track booking frequencies, view status badges (confirmed/cancelled), and drop future bookings seamlessly using transactional MongoDB $pull operations.

---

## 🛠️ Technologies Used

**Client-Side:**
* **React.js** (Functional Components & Context API)
* **React Router DOM** (Private Route Protection & State Persistence)
* **Tailwind CSS** (Unique & Mobile-First Responsive Design)
* **React Hot Toast / Sonner** (Clean interactive toast engine without native alerts)
* **Lucide React** (Modern, minimalist iconography pack)

**Server-Side & Database:**
* **Node.js & Express.js** (REST API Architecture)
* **MongoDB & Mongoose ODM** (Document-based storage with structural validation)
* **JSON Web Token (JWT) & Cookie Parser** (Secure token issuance and validation state)
* **Cors & Dotenv** (Isolated environment variable safeguarding)

---

## 📦 Local Installation & Setup

Follow these steps to run the client-side configuration locally:

1. **Clone the repository:**
   
```bash
   git clone [https://github.com/your-username/studynook-client.git](https://github.com/your-username/studynook-client.git)
   cd studynook-client
Install dependencies:

Bash
   npm install
Configure Environment Variables:
Create a .env file in your client-side root directory and hook up your backend endpoint:

Code snippet
   VITE_API_URL=http://localhost:5000
Start the local server:

Bash
   npm run dev
