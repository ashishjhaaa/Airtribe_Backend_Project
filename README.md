**Problem statement:**

Design database and APIs for application based courses on Airtribe.

Database relations:

- There are multiple instructors on Airtribe.
- Every instructor can start multiple courses.
- Multiple learners can apply for a course using application form (Leads)
- Instructor can add comments against every lead

1. Design the above relationships on any SQL database.
2. Create a server in any of your favourite framework using Node.js and add the following APIs
    1. Create course API
    2. Update course details API (name, max_seats, start_date etc)
    3. Course registration API (A user can apply for a course by sharing their name, email, phone number and LinkedIn profile)
    4. Lead update API (Instructor can change status of the lead (Accept / Reject / Waitlist))
    5. Lead search API (Instructor can search leads by name or email)
    6. Add comment API



I have broken the project in parts and explained below: 

**Part 1**
Routes and Basic Server Setup

This repository includes the initial setup for the backend of Airtribe's course management system. 
The server is implemented in Node.js using the Express framework, and it includes routes for handling instructor and student actions.

Project Structure
The project structure follows a modular approach, with routes separated into different files for better organization:

api/create_instructor_account.js:       API route for creating an instructor account.
api/add_courses.js:                     API route for instructors to add courses.
api/create_learner_account.js:          API route for creating a learner account.
api/apply_for_course.js:                API route for learners to apply for a course.
api/check_new_learners.js:              API route for instructors to check new learner applications.


**Part 2**
Create, Update, and Delete Instructor APIs                                // Admins can only know the private data of instructor

This section outlines the APIs responsible for managing instructor data, including creating, updating, and deleting instructor accounts. 
These APIs are implemented in the create_instructor_account.js route file.

1. Create Instructor API
Endpoint: create_instructor_account

POST /api/create_instructor_account
Request Body:
{
  "instructor_id": 1,
  "name": "John Doe",
  "email": "john.doe@example.com"
}

Description:
This API creates a new instructor account by inserting the provided information into the Instructor table in the database.

2. Update Instructor Details API
Endpoint: create_instructor_account

PUT /api/create_instructor_account
Request Body:
{
  "instructor_id": 1,
  "name": "Updated Name",
  "email": "updated.email@example.com"
}

Description:
This API updates the details of an existing instructor account. It requires the instructor's unique ID (instructor_id) and allows updating the name and email.

3. Delete Instructor API
Endpoint:create_instructor_account

DELETE /api/create_instructor_account
Request Body:
{
  "instructor_id": 1
}

Description:
This API deletes an instructor account based on the provided instructor_id. It also deletes associated courses.

Implementation Details
The route file create_instructor_account.js uses Express to define the APIs. It interacts with the MySQL database using the provided database_connection module.

Usage
To create an instructor account, make a POST request to /api/create_instructor_account with the required information in the request body. 
Similarly, use the PUT and DELETE methods for updating and deleting instructor accounts, respectively.


**Part 3**
Course Management APIs for Instructors

This section introduces APIs for instructors to manage courses, including creating, reading, updating, and deleting courses. The APIs are implemented in the add_courses.js route file.

1. Create Course API
Endpoint: add_courses
POST /api/add_courses
Request Body:
{
  "course_id": 1,
  "instructor_id": 101,
  "name": "Introduction to Web Development",
  "max_seats": 20,
  "start_date": "2024-04-01"
}
Description:
This API allows instructors to create a new course. The provided information is inserted into the courses table in the database.

2. Read Course List API
Endpoint: add_courses
GET /api/add_courses
Description:
This API retrieves the list of all courses from the courses table in the database.

3. Update Course Information API
Endpoint: add_courses
PUT /api/add_courses
Request Body:
{
  "course_id": 1,
  "instructor_id": 101,
  "name": "Updated Web Development Course",
  "max_seats": 25,
  "start_date": "2024-05-01"
}
Description:
Instructors can use this API to update information about an existing course. The course is identified by both course_id and instructor_id.

4. Delete Course API
Endpoint: add_courses
DELETE /api/add_courses
Request Body:
{
  "course_id": 1,
  "instructor_id": 101
}
Description:
Instructors can delete a course using this API. The course is identified by both course_id and instructor_id.

Implementation Details
The add_courses.js route file uses Express to define the APIs. It interacts with the MySQL database through the provided database_connection module.

Usage
To create a course, make a POST request to /api/add_courses with the required information in the request body. Use GET, PUT, and DELETE methods for reading, updating, and deleting courses, respectively.


**Part 4**
Learner Account Management APIs

This section introduces APIs for managing learner accounts. Instructors can use these APIs to create, read, update, and delete learner accounts. The APIs are implemented in the create_learner_account.js route file.

1. Create Learner Account API
Endpoint: create_learner_account
POST /api/create_learner_account
Request Body:
{
  "learner_id": 1,
  "name": "Alice Doe",
  "email": "alice.doe@example.com",
  "phone": "1234567890",
  "linkedin": "linkedin.com/in/alicedoe",
  "course": "Introduction to Web Development"
}
Description:
Instructors can use this API to create a new learner account. The provided information is inserted into the learners table in the database.

2. Read Learner Account API
Endpoint: create_learner_account
GET /api/create_learner_account

Description:
This API retrieves the names and enrolled courses of all learners from the learners table in the database.

4. Update Learner Account API
Endpoint: create_learner_account
PUT /api/create_learner_account
Request Body:
{
  "learner_id": 1,
  "name": "Updated Alice Doe",
  "email": "updated.alice.doe@example.com",
  "phone": "9876543210",
  "linkedin": "linkedin.com/in/updatedalicedoe",
  "course": "Updated Web Development Course"
}

Description:
Instructors can update details of an existing learner account using this API. The learner is identified by their unique learner_id.

5. Delete Learner Account API
Endpoint: create_learner_account
DELETE /api/create_learner_account
Request Body:
{
  "learner_id": 1
}

Description:
Instructors can use this API to delete a learner account based on the provided learner_id.

Implementation Details
The create_learner_account.js route file uses Express to define the APIs. It interacts with the MySQL database through the provided database_connection module.

Usage
To create a learner account, make a POST request to /api/create_learner_account with the required information in the request body. Use GET, PUT, and DELETE methods for reading, updating, and deleting learner accounts, respectively.


**Part 5**
Learner Enrollment and Lead Management APIs

This section introduces APIs for learner enrollment and lead management. Instructors can use these APIs to handle learner applications, update lead statuses, and manage course enrollments. The APIs are implemented in the apply_for_course.js route file.

1. Apply For Course API
Endpoint: apply_for_course
POST /api/apply_for_course
Request Body:
{
  "lead_id": 1,
  "course_id": 101,
  "learner_id": 1,
  "status": "Pending"
}
Description:
Learners can use this API to apply for a course by submitting a lead form. The provided information is inserted into the leads table in the database.

2. See All Forms API
Endpoint: apply_for_course
GET /api/apply_for_course

Description:
Instructors can use this API to retrieve information about all submitted lead forms from the leads table in the database.

4. Update Form Information API
Endpoint: apply_for_course
PUT /api/apply_for_course
Request Body:
{
  "lead_id": 1,
  "course_id": 101,
  "learner_id": 1,
  "status": "Accepted"
}
Description:
Instructors can use this API to update the status of a lead form. The lead is identified by its unique lead_id.

6. Delete Form Information API
Endpoint: apply_for_course
DELETE /api/apply_for_course
Request Body:
{
  "lead_id": 1
}
Description:
Instructors can use this API to delete a lead form based on the provided lead_id.

Implementation Details
The apply_for_course.js route file uses Express to define the APIs. It interacts with the MySQL database through the provided database_connection module.

Usage
To apply for a course, make a POST request to /api/apply_for_course with the required information in the request body. Use GET, PUT, and DELETE methods for viewing, updating, and deleting lead forms, respectively.


**Part 6**
Instructor Actions on Leads and Learner Enrollment APIs

This section introduces APIs for instructors to take actions on leads and enroll learners into courses. The APIs are implemented in the check_new_learners.js route file.

1. Create Lead API
Endpoint: check_new_learners
POST /api/check_new_learners
Request Body:
{
  "lead_id": 1,
  "course_id": 101,
  "learner_id": 1,
  "status": "Pending"
}
Description:
Instructors can use this API to create a lead for a learner who has applied for a course. The lead information is stored in the leads table.

2. See All Leads API
Endpoint: check_new_learners
GET /api/check_new_learners
Description:
Instructors can use this API to retrieve information about all leads from the leads table.

3. Update Lead Status API
Endpoint: check_new_learners
PUT /api/check_new_learners
Request Body:
{
  "lead_id": 1,
  "status": "Accepted"
}
Description:
Instructors can use this API to update the status of a lead. The lead is identified by its unique lead_id.

4. Enroll Learner API
Endpoint: check_new_learners
PUT /api/check_new_learners/enroll
Request Body:
{
  "lead_id": 1
}
Description:
Instructors can use this API to enroll a learner into a course based on the lead information. The lead is identified by its unique lead_id.

Implementation Details
The check_new_learners.js route file uses Express to define the APIs. It interacts with the MySQL database through the provided database_connection module.

Usage
Use the POST request to /api/check_new_learners to create leads for learners who have applied for a course.
Use the GET request to /api/check_new_learners to see information about all leads.
Use the PUT request to /api/check_new_learners to update the status of a lead.
Use the PUT request to /api/check_new_learners/enroll to enroll a learner based on the lead information.



This is the complete Backend Project of Airtribe.
Thanks!
