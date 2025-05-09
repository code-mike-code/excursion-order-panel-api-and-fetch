# Excursions Order Panel – API & Fetch

See the live version of [Excursions order panel](https://code-mike-code.github.io/excursions-order-panel/).

This project is part of my learning journey at devmentor.pl and represents a modernized version of the travel ordering system. The core focus is integrating RESTful API communication using the native fetch() function and structuring the project to support both client and admin panels.


## 🧭 Project Overview
The app is now split into two fully independent interfaces:

   • Client Panel – for end users to browse, select, and book excursions
   
   • Admin Panel – for administrators to manage excursions in real time
   
This modular structure improves scalability, separation of concerns, and maintainability.

&nbsp;

## 🧑‍💼 Client Panel
Located at /src/index.html

## 🔑 Key Features
• Trip selection with form-based quantity input
• Real-time cart updates and price calculation
• Customer form validation (name, surname, email)
• Order submission via fetch() to local API (JSON Server)
• UI reset after successful order

## 🧪 Tech Details
• Input validation with native JS
• UI built from hidden HTML prototypes (.*--prototype)
• Order and trip data managed using structured JavaScript objects
• API communication encapsulated in ExcursionsAPI.js

&nbsp;

## 🛠 Admin Panel
Located at /src/admin.html

## ✏️ Functionality
• Add new excursions (name, description, prices)
• Edit or delete existing excursions
• All changes persist through JSON Server and affect the client view

## 🔧 Backend API Endpoints
• GET /excursions – fetch all trips
• POST /excursions – add new trip
• PATCH /excursions/:id – modify trip
• DELETE /excursions/:id – delete trip

&nbsp;

## 📡 JSON Server – Local API
Run the API backend locally with:
```
json-server --watch ./data/excursions.json
```

Accessible at:

• http://localhost:3000/excursions – for managing trips
• http://localhost:3000/orders – for managing orders

Make sure this is running in parallel with your Webpack dev server.

&nbsp;

## 🧰 Webpack Integration
Webpack handles:

• ES6+ JavaScript bundling
• Splitting client.js and admin.js into separate chunks
• CSS loading via style-loader & css-loader
• Live reloading during development

To start the project:
```
npm install
npm run start
```

Client: http://localhost:8080/index.html
Admin: http://localhost:8080/admin.html

Make sure source maps are enabled in DevTools to debug easily.

&nbsp;

## 🧠 Core Logic in ExcursionsAPI.js
Located in /src/js/ExcursionsAPI.js, this class encapsulates all communication with the JSON API, providing reusable methods across both panels. It follows the principle of single responsibility and helps avoid duplicated fetch logic.


## 💡 Technologies
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-grey?style=for-the-badge&logo=javascript)


&nbsp;
 
## 🔗 See also

Are you interested in **SCSS** and **JavaScript**? See my other project [Landing Page MGUU](https://code-mike-code.github.io/landing_page_project/).

&nbsp;

## 📌 Lessons Learned
• API abstraction with classes improves code clarity and reusability
• Form validation ensures user input is reliable before hitting the backend
• Fetch with error handling is essential for robust apps
• Modular file separation and chunking improve performance and scalability
• Source-controlled UI prototypes (using display: none) speed up templating

&nbsp;

## 🙋‍♂️ Feel free to Reach Out!
If you have questions, ideas, or just want to chat about code (or the meaning of life), don’t hesitate to contact me. Open an issue, drop me a pull request, or send a message—carrier pigeon works too, but GitHub might be faster. Let’s build something awesome together! 🚀


&nbsp;

## 👏 Thanks / Special thanks / Credits
Thanks to my [Mentor - devmentor.pl](https://devmentor.pl/) – for providing me with this task and for code review.

