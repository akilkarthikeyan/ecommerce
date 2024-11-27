import { Router } from "express";

const router = Router();

// Example: Get all users
router.get("/", (req, res) => {
    res.send("List of users");
});

// Example: Create a new user
router.post("/", (req, res) => {
    const { name, email } = req.body;
    res.send(`User created: ${name} (${email})`);
});

export default router;