import express from "express";
import Developer from "../models/developer.js";
import verifyToken from "../middleware/auth.js";

const router = express.Router();

// 🔥 SAVE / UPDATE (NO DUPLICATE + PROTECTED)
router.post("/save", verifyToken, async (req, res) => {
  try {
    const { username, score, followers, repos, field } = req.body;

    const updated = await Developer.findOneAndUpdate(
      { username },
      { score, followers, repos, field },
      { new: true, upsert: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json(err);
  }
});

// 🏆 LEADERBOARD
router.get("/leaderboard", async (req, res) => {
  try {
    const data = await Developer.find()
      .sort({ score: -1 })
      .limit(10);

    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

// 👤 PROFILE
router.get("/:username", async (req, res) => {
  try {
    const user = await Developer.findOne({
      username: req.params.username,
    });

    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;