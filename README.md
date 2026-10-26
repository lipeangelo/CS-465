# CS 465: Full Stack Development I
## Travlr Getaways — Full Stack Web Application

**Student:** Filipe Angelo  
**Course:** CS 465 — Full Stack Development I  
**Institution:** Southern New Hampshire University

### Project Overview

Travlr Getaways is a full stack travel booking application developed using the MEAN stack (MongoDB, Express.js, Angular, and Node.js). The application includes a customer-facing website for browsing travel packages and an administrative single-page application (SPA) for managing trip information.

Throughout the course, I developed and improved both sides of the application, implemented RESTful API endpoints, connected the application to MongoDB, and added JWT authentication to protect administrative operations.

## Architecture

### Frontend Development

Throughout this project, I worked with different approaches to frontend development, including Express HTML templates, JavaScript, and an Angular single-page application (SPA).

The customer-facing website uses Express.js with Handlebars templates to generate HTML pages. This approach separates page layouts and reusable elements while allowing the server to render content. JavaScript adds functionality and supports communication between different parts of the application.

The Angular SPA provides a more interactive experience for administrators. Unlike traditional server-rendered pages, Angular updates the interface dynamically without requiring a full page reload for every action. I used Angular components and services to organize the application and support administrative features such as adding, editing, and deleting trips.

Both approaches have advantages. Express templates are useful for delivering straightforward customer-facing pages, while Angular is better suited for an interactive administrative dashboard.

### Why MongoDB?

The backend uses MongoDB, a NoSQL database, to store travel package information and user authentication data. MongoDB stores information in flexible, document-based structures that work well with JSON-style data.

This made it easier to manage trip information and connect the database to the Express API using Mongoose. MongoDB also fits naturally into the MEAN stack because JavaScript-based applications can work with similar data structures across the frontend and backend.

## Functionality

### JSON and JavaScript

JavaScript is a programming language used to build application logic and interactive features. JSON (JavaScript Object Notation), on the other hand, is a lightweight data format used to represent and exchange information.

In Travlr Getaways, JSON connects the frontend and backend through API requests and responses. For example, when an administrator updates a trip, Angular sends the trip information to the Express API, which processes the request and updates the MongoDB database. The API then returns a response that Angular can use to update the interface.

This communication allows the frontend and backend to work together while remaining separate parts of the application.

### Refactoring and Reusable Components

Throughout development, I refactored the application to improve organization, functionality, and maintainability.

One example was separating the Express application into routes, controllers, and views using the MVC architecture. This made the code easier to understand and maintain.

Another example was developing reusable Angular components, including components for displaying trip information and managing the trip list. I also used Angular services to centralize API communication and authentication logic instead of repeating the same code across multiple components.

Reusable UI components improve consistency, reduce duplicated code, simplify debugging, and make future updates easier. These improvements became especially useful as the application grew and additional features were introduced.

## Testing

### API Methods, Endpoints, and Security

Testing was an important part of developing Travlr Getaways because the frontend, backend, and database needed to communicate correctly.

I worked with RESTful API endpoints and HTTP methods, including GET, POST, PUT, and DELETE. GET retrieves trip information, POST creates new records, PUT updates existing records, and DELETE removes records.

I used Postman and other API testing methods to check requests and responses. Testing helped verify that endpoints returned the expected results and that information could be retrieved and modified correctly.

During Module Seven, I implemented authentication using Passport.js and JSON Web Tokens (JWTs). Administrative endpoints were protected so that requests to add, edit, or delete trips required a valid authentication token.

Adding authentication also introduced new testing challenges. I verified that valid login credentials generated a token and that requests without a token were rejected with a 401 Unauthorized response. I also tested administrative functionality through the Angular interface, including logging in, updating trip information, adding and deleting trips, and logging out.

This process helped me understand that hiding administrative controls in the frontend does not provide actual security. The backend must independently validate authentication before allowing protected operations.

## Reflection

Completing CS 465 helped me develop a better understanding of how full stack applications are designed, developed, tested, and maintained. Before this course, I had experience working with different programming languages and software development projects, but Travlr Getaways gave me the opportunity to connect several technologies into one working application.

I strengthened my skills in JavaScript, Node.js, Express.js, Angular, MongoDB, RESTful APIs, and GitHub. I also gained experience with MVC architecture, reusable components, debugging, API testing, and authentication using JWTs.

One of the most valuable lessons was understanding how the frontend and backend work together while having different responsibilities. I also learned the importance of organizing code, testing functionality, and considering security throughout development.

My professional goal is to become a software engineer, and this project has helped me build practical skills that are relevant to full stack development positions. It also gives me a completed application that I can include in my GitHub portfolio to demonstrate my ability to develop and maintain a full stack web application.
