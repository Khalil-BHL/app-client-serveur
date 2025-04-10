const express = require("express");
const cors = require("cors");
const { db, query } = require("./database");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: err.message
  });
});

// Add a new user
app.post("/users", (req, res) => {
  const { name, email } = req.body;
  
  if (!name || !email) {
    return res.status(500).json({ 
      message: "Name and email are required fields",
      error: "Validation Error" 
    });
  }

  db.query(
    'INSERT INTO users (name, email) VALUES (?, ?)',
    [name, email],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Error adding user", error: err });
      }
      res.status(201).json({ id: result.insertId, name, email });
    }
  );
});

// Get all users
app.get("/users", (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching users", error: err });
    }
    res.status(200).json(results);
  });
});

// Update a user
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ 
      message: "Name and email are required fields"
    });
  }

  const query = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
  const values = [name, email, id];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Update error:', err);
      return res.status(500).json({ message: "Error updating user", error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User updated successfully" });
  });
});

// Delete a user
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM users WHERE id = ?';

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Delete error:', err);
      return res.status(500).json({ message: "Error deleting user", error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  });
});

// Only start the server if this file is run directly (not required as a module)
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}

module.exports = app;
