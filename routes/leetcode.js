import express from "express";
import getLeetCodeData from "../services/leetcodeService.js";

const router = express.Router();

router.get("/:username", async (req, res) => {
  try {
    const data = await getLeetCodeData(req.params.username);

    if (!data) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching LeetCode data" });
  }
});

export default router;