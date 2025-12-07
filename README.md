# Internship Tracker Malaysia

**Internship Tracker Malaysia** is a responsive, front end web application designed to help students organize, track, and analyze their internship job applications. Featuring a Malaysian context (with local top companies), this dashboard offers visual analytics, application management, and a robust dark mode.

## 🚀 Features

### 📊 Dashboard & Analytics

  * **Visual Overview:** Interactive charts (Donut, Line, and Bar charts) visualizing application statuses and monthly trends.
  * **Quick Stats:** Summary cards for Total Applications, Interviews, Offers, and Pending statuses.
  * **Recent Activity:** A quick-glance table of the most recent applications.

### 📝 Application Management (CRUD)

  * **My Internships:** A dedicated page to view all applications.
  * **Add/Edit/Delete:** Fully functional forms to add new applications, update statuses (Applied, Interview, Offer, Rejected), or remove entries.
  * **Local Storage:** Data is persisted in the browser's `localStorage`, meaning your data remains saved even after refreshing the page.
  * **Filtering:** Filter applications by Status, Company Name, or Date.

### 🏢 Company Directory

  * **Malaysian Focus:** Pre-populated with top Malaysian companies (Petronas, Grab, Maybank, AirAsia, Shopee, Celcom).
  * **Category Filtering:** Filter companies by industry (Energy, Tech, Finance, Aviation, Telecom).
  * **Direct Links:** Quick access to official career pages.

### 🎨 UI/UX & Customization

  * **Dark/Light Mode:** A global theme toggle that persists preference. Includes specific overrides for charts and components.
  * **Responsive Design:** Built with Bootstrap 5, ensuring full functionality on mobile and desktop.
  * **Animations:** Smooth transitions using Animate.css and custom CSS (e.g., floating rocket animation).
  * **Settings:** Customize appearance (background overlay opacity) and notification preferences.

-----

## 🛠️ Technologies Used

  * **HTML5**
  * **CSS3** (Custom variables + CSS Grid/Flexbox)
  * **JavaScript** (ES6+)
  * **Framework:** [Bootstrap 5.3](https://getbootstrap.com/)
  * **Icons:** [Font Awesome 6.4](https://fontawesome.com/)
  * **Charts:** \* [Chart.js](https://www.chartjs.org/)
      * [ApexCharts](https://apexcharts.com/)
  * **Animations:** [Animate.css](https://animate.style/)

-----

## 📂 File Structure

```text
/
├── index.html          # Login/Register Landing Page
├── dashboard.html      # Main Analytics Dashboard
├── internships.html    # CRUD Application Tracker
├── companies.html      # Company Directory
├── profile.html        # User Profile Page
├── settings.html       # Application Settings
├── css/
│   ├── style.css       # Main custom styling
│   └── theme.css       # CSS Variables for Dark/Light themes
└── js/
    └── script.js       # Core logic, Auth simulation, LocalStorage handling
```

-----

## ⚡ How to Run

1.  Download the source code.
2.  Ensure you have an internet connection (to load the CDN links for Bootstrap, FontAwesome, and Chart libraries).
3.  Open `index.html` in any modern web browser.

### 🔐 Demo Credentials

The application uses a simulated authentication system. Use the following credentials to log in:

  * **Username:** `student`
  * **Password:** `12345`

-----

## 📸 Page Overview

### 1\. Login Page (`index.html`)

Features a simulated login/registration system with validation and password visibility toggles. It uses a unique background distinct from the internal dashboard.

### 2\. Dashboard (`dashboard.html`)

The command center. It greets the user (Placeholder: *Zizan Razak*) and displays data visualization regarding current application progress.

### 3\. My Internships (`internships.html`)

The core tracking engine. Users can add details such as Company Name, Position, Status, Next Steps, and Notes. Toast notifications appear upon successful actions.

### 4\. Settings (`settings.html`)

Allows users to toggle notification types, change passwords (simulation), and adjust the intensity of the background overlay for both Light and Dark modes.

-----

## 🎨 Customization

### Changing the Theme

The application handles theming via `css/theme.css`. You can adjust the color variables in the `:root` (Light Mode) and `.dark-mode` classes to change the color scheme.

### Local Storage Data

To reset the application data to defaults:

1.  Open your browser's Developer Tools (F12).
2.  Go to the **Application** tab.
3.  Select **Local Storage**.
4.  Clear the keys `internships`, `theme`, and `it_notifications_v1`.
5.  Refresh the page.

-----

## 📝 License

This project is open-source and available for educational purposes.

© 2025 Internship Tracker Malaysia.
