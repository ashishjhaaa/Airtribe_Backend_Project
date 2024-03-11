const con = require("../database_connection");
const express = require("express");

const connection = con.getConnection();
const router = express.Router();

// Create/Verify/Reject/Waitlist Course
router.post("/", (req, res) => {
    const { lead_id, course_id, learner_id, status } = req.body;

    if (!lead_id || !course_id || !learner_id || !status) {
        return res.json({ error: "Lead Id, Course Id, Learner Id, and Status are required" });
    }

    const query = `INSERT INTO leads (lead_id, course_id, learner_id, status) VALUES (${lead_id}, ${course_id}, ${learner_id}, '${status}')`;

    connection.query(query, (err) => {
        if (err) {
            console.log("Error processing lead", err);
            return res.json({ error: "Internal Server Error" });
        }

        const data = { lead_id, course_id, learner_id, status };
        console.log("Lead processed successfully");
        return res.json({ message: "Lead processed successfully", data });
    });
});

// Get Lead Status
router.get("/", (req, res) => {
    const { lead_id } = req.query;

    if (!lead_id) {
        return res.json({ error: "Lead Id is required for fetching status" });
    }

    const query = `SELECT status FROM leads WHERE lead_id = ${lead_id}`;

    connection.query(query, (err, results) => {
        if (err) {
            console.log("Error fetching lead status:", err);
            return res.json({ error: "Internal Server Error" });
        }

        if (results.length === 0) {
            return res.json({ message: "Lead not found", status: null });
        }

        const status = results[0].status;
        console.log(`Lead status: ${status}`);
        return res.json({ message: "Lead status fetched successfully", status });
    });
});

module.exports = router;
