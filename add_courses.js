const con = require("../database_connection");
const express = require("express");

const connection = con.getConnection();
const router = express.Router();

// Create Course
router.post("/", (req, res) => {
    const { course_id, instructor_id, name, max_seats, start_date } = req.body;
    const query = `INSERT INTO courses (course_id,instructor_id, name, max_seats, start_date) VALUES (${course_id}, ${instructor_id}, '${name}', ${max_seats}, '${start_date}')`;

    connection.query(query, (err) => {
        if (err) {
            console.log("Error creating course", err);
            return res.json({ error: "Internal Server Error" });
        }
        
        const data = { course_id, instructor_id, name, max_seats, start_date };
        console.log("Course created successfully");
        return res.json({ message: "Course created successfully", data });
    });
});

// Read Course List
router.get("/", (req, res) => {
    const query = "SELECT * FROM courses";

    connection.query(query, (err, results) => {
        if (err) {
            console.log("Error Reading Data:", err);
            return res.json({ error: "Internal Server Error" });
        }

        console.log("Successfully Readed" + results);
        return res.json({ message: "Course Read successfully", results });
    });
});

// Update Course Information
router.put("/", (req, res) => {
    const { course_id, instructor_id, name, max_seats, start_date } = req.body;

    if (!course_id) {
        return res.json({ error: "Course Id is required for updating" });
    }
    if (!instructor_id) {
        return res.json({ error: "Instructor Id is required for updating" });
    }
    
    let updateFields = "";
    
    if (name) {
        updateFields += `name = ${name}, `;
    }
    
    if (max_seats) {
        updateFields += `max_seats = '${max_seats}', `;
    }
    if (start_date) {
        updateFields += `start_date = '${start_date}', `;
    }
    
    updateFields = updateFields.replace(/,\s*$/, "");
    
    if (!updateFields) {
        console.log("No valid fields provided for updating")
        return res.json({ error: "No valid fields provided for updating" });
    }
    
    const query = `UPDATE courses SET ${updateFields} WHERE (instructor_id = '${instructor_id}') and (course_id = '${course_id}')`;
    
    connection.query(query, (err) => {
        if (err) {
            console.log("Error updating data:", err);
            return res.json({ error: "Internal Server Error" });
        }
        
        console.log("Course updated successfully" + updateFields);
        return res.json({ message: "Course updated successfully", updateFields });
    });
});

// Delete Course
router.delete("/", (req, res) => {
    const { course_id, instructor_id, name, max_seats, start_date } = req.body;
    if (!course_id) {
        return res.json({ error: "Course Id is required for deleting" });
    }
    if (!instructor_id) {
        return res.json({ error: "Instructor Id is required for deleting" });
    }
    query = `DELETE FROM courses WHERE (instructor_id = '${instructor_id}') and (course_id = '${course_id}')`;
    
    connection.query(query, (err) => {
        if (err) {
            console.log("Error deleting data", err);
            return res.json({ error: "Internal Server Error" });
        }
        
        console.log("Successfully Deleted");
        return res.json({ message: "Course deleted successfully" });
    });
});

module.exports = router;
