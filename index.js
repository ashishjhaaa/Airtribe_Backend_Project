const express = require('express');

// Routes
const create_instructor_account_router = require('./routes/create_instructor_account');         // for instructor
const add_courses_router = require('./routes/add_courses');                                     // for instructor

const create_learner_account_router = require('./routes/create_learner_account');               // for students
const apply_for_course_router=require("./routes/apply_for_course");                             // for students    
  
const check_new_learners_router=require("./routes/check_new_learners");                         // for instructor      

var app = express();
app.use(express.json());

// Use the routes
app.use('/api/create_instructor_account', create_instructor_account_router);            // for instructor
app.use('/api/add_courses', add_courses_router);                                        // for instructor
app.use('/api/create_learner_account', create_learner_account_router);                  // for students
app.use('/api/apply_for_course', apply_for_course_router);                              // for students
app.use('/api/check_new_learners', check_new_learners_router);                          // for instructor

// Start the server
app.listen(3000, () => {
  console.log(`Listening on port 3000`);
});