const con = require("../database_connection");
const connection = con.getConnection();

const express = require("express");
const router = express.Router();

// Create Instructor Id
router.post("/", (req, res) => {
    const { instructor_id, name, email } = req.body;
    const query = `INSERT INTO Instructor (instructor_id, name, email) VALUES (${instructor_id}, '${name}', ${email})`;

    connection.query(query, (err) => {
        if (err) {
            console.log("Error in creating instructor Id ", err);
            return res.json({ error: "Internal Server Error" });
        }

        const data = { instructor_id, name, email };
        console.log("Successfully Instructor Registered with " + data);
        return res.json({ message: "Successfully Instructor Registered", data });
    });
});

// Update Instructor Details
router.put("/", (req, res) => {
    const { instructor_id, name, email } = req.body;

    if (!instructor_id) {
        return res.json({ error: "Instructor Id is required for updating details" });
    }

    let updateFields = "";

    if (name) {
        updateFields += `name = '${name}', `;
    }
    if (email) {
        updateFields += `email = '${email}', `;
    }

    updateFields = updateFields.replace(/,\s*$/, "");

    if (!updateFields) {
        console.log("No valid fields provided for updating.")
        return res.json({ error: "No valid fields provided for updating." });
    }

    const query = `UPDATE users SET ${updateFields} WHERE instructor_id = '${instructor_id}'`;

    connection.query(query, (err) => {
        if (err) {
            console.log("Error updating data ", err);
            return res.json({ error: "Internal Server Error" });
        }

        console.log("Successfully Updated " + updateFields);
        return res.json({ message: "Course updated successfully", updateFields });
    });
});

// Delete Instructor Id
router.delete("/", (req, res) => {
    const { instructor_id, name, email } = req.body;

    if (!instructor_id) {
        console.log("Missing instructor id in delete request.");
        return res.send("Missing instructor id in delete request.");
    }

    const query = `DELETE FROM courses WHERE instructor_id = ${instructor_id}`;

    connection.query(query, (err, data) => {
        if (err) {
            console.log("Error deleting data", err);
            return res.json({ error: "Internal Server Error" });
        }

        console.log("Successfully Deleted" + data);
        return res.json({ message: "Course deleted successfully", data });
    });
});

module.exports = router;
