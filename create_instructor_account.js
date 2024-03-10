// const con = require("../database_connection");
// const connection = con.getConnection();

// const express = require("express");
// const router = express.Router();

// // Create Instructor Id
// router.post("/", (req, res) => {
//     const { instructor_id, name, email } = req.body;
//     const query = `INSERT INTO Instructor (instructor_id, name, email) VALUES (${instructor_id}, '${name}', ${email})`;

//     connection.query(query, (err) => {
//         if (err) {
//             console.log("Error in creating instructor Id ", err);
//             return res.json({ error: "Internal Server Error" });
//         }

//         const data = { instructor_id, name, email };
//         console.log("Successfully Instructor Registered with " + data);
//         return res.json({ message: "Successfully Instructor Registered", data });
//     });
// });

// // Update Instructor Details
// router.put("/", (req, res) => {
//     const { instructor_id, name, email } = req.body;

//     if (!instructor_id) {
//         return res.json({ error: "Instructor Id is required for updating details" });
//     }

//     let updateFields = "";

//     if (name) {
//         updateFields += `name = '${name}', `;
//     }
//     if (email) {
//         updateFields += `email = '${email}', `;
//     }

//     updateFields = updateFields.replace(/,\s*$/, "");

//     if (!updateFields) {
//         console.log("No valid fields provided for updating.")
//         return res.json({ error: "No valid fields provided for updating." });
//     }

//     const query = `UPDATE users SET ${updateFields} WHERE instructor_id = '${instructor_id}'`;

//     connection.query(query, (err) => {
//         if (err) {
//             console.log("Error updating data ", err);
//             return res.json({ error: "Internal Server Error" });
//         }

//         console.log("Successfully Updated " + updateFields);
//         return res.json({ message: "Course updated successfully", updateFields });
//     });
// });

// // Delete Instructor Id
// router.delete("/", (req, res) => {
//     const { instructor_id, name, email } = req.body;

//     if (!instructor_id) {
//         console.log("Missing instructor id in delete request.");
//         return res.send("Missing instructor id in delete request.");
//     }

//     const query = `DELETE FROM courses WHERE instructor_id = ${instructor_id}`;

//     connection.query(query, (err, data) => {
//         if (err) {
//             console.log("Error deleting data", err);
//             return res.json({ error: "Internal Server Error" });
//         }

//         console.log("Successfully Deleted" + data);
//         return res.json({ message: "Course deleted successfully", data });
//     });
// });

// module.exports = router;





// suggested by gpt

const con = require("../database_connection");
const connection = con.getConnection();

const express = require("express");
const router = express.Router();

// Create Instructor Id
router.post("/", (req, res) => {
    const { instructor_id, name, email } = req.body;
    const query = "INSERT INTO Instructor (instructor_id, name, email) VALUES (?, ?, ?)";
    const values = [instructor_id, name, email];

    connection.query(query, values, (err) => {
        if (err) {
            console.error("Error creating instructor ID:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        const data = { instructor_id, name, email };
        console.log("Successfully Instructor Registered:", data);
        return res.json({ message: "Successfully Instructor Registered", data });
    });
});

// Update Instructor Details
router.put("/", (req, res) => {
    const { instructor_id, name, email } = req.body;

    if (!instructor_id) {
        return res.status(400).json({ error: "Instructor ID is required for updating details" });
    }

    let updateFields = "";
    let values = [];

    if (name) {
        updateFields += "name = ?, ";
        values.push(name);
    }
    if (email) {
        updateFields += "email = ?, ";
        values.push(email);
    }

    updateFields = updateFields.replace(/,\s*$/, "");

    if (!updateFields) {
        console.log("No valid fields provided for updating.");
        return res.json({ error: "No valid fields provided for updating." });
    }

    values.push(instructor_id);

    const query = `UPDATE Instructor SET ${updateFields} WHERE instructor_id = ?`;

    connection.query(query, values, (err) => {
        if (err) {
            console.error("Error updating data:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        console.log("Successfully Updated:", updateFields);
        return res.json({ message: "Instructor details updated successfully", updateFields });
    });
});

// Delete Instructor Id
router.delete("/", (req, res) => {
    const { instructor_id } = req.body;

    if (!instructor_id) {
        console.log("Missing instructor ID in delete request.");
        return res.status(400).json({ error: "Missing instructor ID in delete request." });
    }

    const query = "DELETE FROM Instructor WHERE instructor_id = ?";
    const values = [instructor_id];

    connection.query(query, values, (err, data) => {
        if (err) {
            console.error("Error deleting data:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        console.log("Successfully Deleted:", data);
        return res.json({ message: "Instructor deleted successfully", data });
    });
});

module.exports = router;
