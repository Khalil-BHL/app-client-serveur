const express = require("express");
const cors = require("cors");
const db = require("./database");

const app = express();
app.use(cors());
app.use(express.json());

// Add a new user
app.post("/users", (req, res) => {
  const { name, email } = req.body;
  db.run(
    `INSERT INTO users (name, email) VALUES (?, ?)`,
    [name, email],
    function (err) {
      if (err) {
        return res.status(500).json({ message: "Error adding user", error: err });
      }
      res.status(201).json({ id: this.lastID, name, email });
    }
  );
});

// Get all users
app.get("/users", (req, res) => {
  db.all("SELECT * FROM users", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching users", error: err });
    }
    res.status(200).json(rows);
  });
});

// Update a user
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  db.run(
    `UPDATE users SET name = ?, email = ? WHERE id = ?`,
    [name, email, id],
    function (err) {
      if (err) {
        return res.status(500).json({ message: "Error updating user", error: err });
      }
      res.status(200).json({ message: "User updated successfully" });
    }
  );
});

// Delete a user
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  db.run(
    `DELETE FROM users WHERE id = ?`,
    [id],
    function (err) {
      if (err) {
        return res.status(500).json({ message: "Error deleting user", error: err });
      }
      res.status(200).json({ message: "User deleted successfully" });
    }
  );
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
