const con = require("../database_connection");
const express = require("express");

const connection = con.getConnection();
const router = express.Router();

// Create - Apply For Course
router.post("/", (req, res) => {
    const { lead_id, course_id, learner_id, status } = req.body;
    const query = `INSERT INTO leads (lead_id,course_id, learner_id, status ) VALUES (${lead_id}, ${course_id}, ${learner_id}, '${status}')`;

    connection.query(query, (err) => {
        if (err) {
            console.log("Error applying for course", err);
            return res.json({ error: "Internal Server Error" });
        }

        const data = { lead_id, course_id, learner_id, status };
        console.log("Course created successfully" + data);
        return res.json({ message: "Course created successfully", data });
    });
});

// Read - See all the Forms
router.get("/", (req, res) => {
    const query = "SELECT * FROM leads";

    connection.query(query, (err, results) => {
        if (err) {
            console.log("Error Reading Data:", err);
            return res.json({ error: "Internal Server Error" });
        }

        console.log("Forms Successfully Readed" + results);
        return res.json({ message: "Forms Successfully Readed", results });
    });
});

// Update Form Information
router.put("/", (req, res) => {
    const { lead_id, course_id, learner_id, status } = req.body;

    if (!lead_id) {
        return res.json({ error: "Lead Id is required for updating" });
    }

    let updateFields = "";

    if (status) {
        updateFields += `status = ${status}, `;
    }

    updateFields = updateFields.replace(/,\s*$/, "");

    if (!updateFields) {
        console.log("No valid fields provided for updating")
        return res.json({ error: "No valid fields provided for updating" });
    }

    const query = `UPDATE leads SET ${updateFields} WHERE lead_id = '${lead_id}'`;

    connection.query(query, (err) => {
        if (err) {
            console.log("Error updating form", err);
            return res.json({ error: "Internal Server Error" });
        }

        console.log("Form updated successfully" + updateFields);
        return res.json({ message: "Form updated successfully", updateFields });
    });
});

// Delete Form Information
router.delete("/", (req, res) => {
    const { lead_id, course_id, learner_id, status } = req.body;

    if (!lead_id) {
        return res.json({ error: "Course Id is required for deleting" });
    }

    query = `DELETE FROM leads WHERE lead_id = '${lead_id}'`;

    connection.query(query, (err) => {
        if (err) {
            console.log("Error Deleting Data", err);
            return res.json({ error: "Internal Server Error" });
        }

        console.log("Form deleted successfully");
        return res.json({ message: "Form deleted successfully" });
    });
});

module.exports = router;
