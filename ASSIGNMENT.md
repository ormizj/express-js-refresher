Here is a structured mock project and study guide you can implement over the next week. It is tailored specifically to Workiz's product offerings and technical challenges.

You can practice this by building out the Node.js project locally and using a whiteboard (or tools like Excalidraw) for the system design portions.

Practice Project: "Mini-Workiz Dispatch & Routing System"

Based on Workiz's platform, this project will touch on the exact domains their engineering team tackles daily. Workiz provides software for home service professionals to handle job scheduling, invoicing, a communication suite, and online payments.

Part 1: Practical Coding (Node.js / TypeScript)

The Scenario: You are building the core booking endpoint for home service businesses like HVAC, plumbing, or electrical companies. Workiz emphasizes dispatching the right tech to every job using a drag-and-drop calendar.

Your Task:
Create a small Express/Node.js API with an endpoint: POST /api/jobs/book

1. Define the Models: Create basic schemas for Technician, Job, and Customer.
2. Implement the Logic: The endpoint must accept a technicianId, startTime, and endTime.
3. The Interview Challenge (Race Conditions): Implement strict database transactions (using PostgreSQL, MySQL, or MongoDB) to ensure that if two customers try to book the same technician for the exact same time block simultaneously, one succeeds and the other receives a "Time slot unavailable" error.
4. Extra Credit: Integrate a mock service for calculating the route distance, mimicking their route planning features.
