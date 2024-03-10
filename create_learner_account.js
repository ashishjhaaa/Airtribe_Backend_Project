// const con = require("../database_connection");
// const connection = con.getConnection();

// const express = require("express");
// const router = express.Router();

// // Create Learner Account
// router.post("/", (req, res) => {
//     const { learner_id, name, email, phone, linkedin, course } = req.body;
//     const query = `INSERT INTO learners (learner_id, name, email, phone, linkedin, course) VALUES (${learner_id},'${name}', '${email}', ${phone}, '${linkedin}', '${course}')`;

//     connection.query(query, (err) => {
//         if (err) {
//             console.log("Error Creating Learner Account", err);
//             return res.json({ error: "Internal Server Error" });
//         }

//         const data = { learner_id, name, email, phone, linkedin, course };
//         console.log("Successfully Learner Registered " + data);
//         return res.json({ message: "Successfully Registered", data });
//     });
// });

// // Read Learner Account
// router.get("/", (req, res) => {
//     const query = "SELECT name, course FROM learners";

//     connection.query(query, (err, results) => {
//         if (err) {
//             console.log("Error Reading Data", err);
//             return res.json({ error: "Internal Server Error" });
//         }

//         console.log("Successfully Readed Learners Account");
//         return res.json({ message: "SSuccessfully Readed Learners Account", results });
//     });
// });

// // Update Learner Account
// router.put("/", (req, res) => {
//     const { learner_id, name, email, phone, linkedin, course } = req.body;

//     if (!learner_id) {
//         return res.json({ error: "Learner Id is required for updating details" });
//     }

//     let updateFields = "";

//     if (name) {
//         updateFields += `name = '${name}', `;
//     }
//     if (email) {
//         updateFields += `email = '${email}', `;
//     }
//     if (phone) {
//         updateFields += `phone = '${phone}', `;
//     }
//     if (linkedin) {
//         updateFields += `linkedin = '${linkedin}', `;
//     }
//     if (course) {
//         updateFields += `course = '${course}', `;
//     }

//     updateFields = updateFields.replace(/,\s*$/, "");

//     if (!updateFields) {
//         console.log("No valid fields provided for updating")
//         return res.json({ error: "No valid fields provided for updating" });
//     }

//     const query = `UPDATE learners SET ${updateFields} WHERE learner_id = '${learner_id}'`;

//     connection.query(query, (err) => {
//         if (err) {
//             console.log("Error updating data:", err);
//             return res.json({ error: "Internal Server Error" });
//         }

//         console.log("Successfully Updated:" + updateFields);
//         return res.json({ message: "Course updated successfully", updateFields });
//     });
// });

// // Delete Learner Account
// router.delete("/", (req, res) => {
//     const { learner_id, name, email, phone, linkedin, course } = req.body;

//     if (!learner_id) {
//         return res.json({ error: "Learner Id is required for deleting details" });
//     }
//     query = `DELETE FROM courses WHERE learner_id = ${learner_id}`;

//     connection.query(query, (err) => {
//         if (err) {
//             console.log("Error Deleting Learner Account", err);
//             return res.json({ error: "Internal Server Error" });
//         }

//         console.log("Learner Account Deleted Successfully");
//         return res.json({ message: "Learner Account Deleted Successfully" });
//     });
// });

// module.exports = router;






// suggested by gpt

const con = require("../database_connection");
const connection = con.getConnection();

const express = require("express");
const router = express.Router();

// Create Learner Account
router.post("/", (req, res) => {
    const { learner_id, name, email, phone, linkedin, course } = req.body;
    const query = "INSERT INTO learners (learner_id, name, email, phone, linkedin, course) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [learner_id, name, email, phone, linkedin, course];

    connection.query(query, values, (err) => {
        if (err) {
            console.error("Error creating learner account:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        const data = { learner_id, name, email, phone, linkedin, course };
        console.log("Successfully Learner Registered:", data);
        return res.json({ message: "Successfully Registered", data });
    });
});

// Read Learner Account
router.get("/", (req, res) => {
    const query = "SELECT name, course FROM learners";

    connection.query(query, (err, results) => {
        if (err) {
            console.error("Error reading data:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        console.log("Successfully Read Learners Account");
        return res.json({ message: "Successfully Read Learners Account", results });
    });
});

// Update Learner Account
router.put("/", (req, res) => {
    const { learner_id, name, email, phone, linkedin, course } = req.body;

    if (!learner_id) {
        return res.status(400).json({ error: "Learner Id is required for updating details" });
    }

    let updateFields = [];
    let values = [];

    if (name) {
        updateFields.push("name = ?");
        values.push(name);
    }
    if (email) {
        updateFields.push("email = ?");
        values.push(email);
    }
    if (phone) {
        updateFields.push("phone = ?");
        values.push(phone);
    }
    if (linkedin) {
        updateFields.push("linkedin = ?");
        values.push(linkedin);
    }
    if (course) {
        updateFields.push("course = ?");
        values.push(course);
    }

    if (updateFields.length === 0) {
        console.log("No valid fields provided for updating");
        return res.json({ error: "No valid fields provided for updating" });
    }

    values.push(learner_id);

    const setClause = updateFields.join(", ");
    const query = `UPDATE learners SET ${setClause} WHERE learner_id = ?`;

    connection.query(query, values, (err) => {
        if (err) {
            console.error("Error updating data:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        console.log("Successfully Updated:", setClause);
        return res.json({ message: "Learner details updated successfully", updateFields });
    });
});

// Delete Learner Account
router.delete("/", (req, res) => {
    const { learner_id } = req.body;

    if (!learner_id) {
        return res.status(400).json({ error: "Learner Id is required for deleting details" });
    }

    const query = "DELETE FROM learners WHERE learner_id = ?";
    const values = [learner_id];

    connection.query(query, values, (err) => {
        if (err) {
            console.error("Error Deleting Learner Account:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        console.log("Learner Account Deleted Successfully");
        return res.json({ message: "Learner Account Deleted Successfully" });
    });
});

module.exports = router;
