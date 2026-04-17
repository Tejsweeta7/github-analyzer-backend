import express from "express";

const router = express.Router();

function getGithubHeaders() {
  const headers = {
    Accept: "application/vnd.github+json",
    "User-Agent": "github-analyzer",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  return headers;
}

async function githubRequest(path) {
  const response = await fetch(`https://api.github.com${path}`, {
    headers: getGithubHeaders(),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message = data?.message || "GitHub API request failed";
    const error = new Error(message);
    error.status = response.status;
    throw error;
  }

  return data;
}

router.get("/users/:username", async (req, res) => {
  try {
    const user = await githubRequest(
      `/users/${encodeURIComponent(req.params.username)}`
    );

    res.json(user);
  } catch (err) {
    res
      .status(err.status || 500)
      .json(err.message || "Unable to fetch GitHub user");
  }
});

router.get("/repos/:username", async (req, res) => {
  try {
    const params = new URLSearchParams();

    if (req.query.per_page) {
      params.set("per_page", req.query.per_page);
    }

    if (req.query.sort) {
      params.set("sort", req.query.sort);
    }

    const query = params.toString() ? `?${params.toString()}` : "";
    const repos = await githubRequest(
      `/users/${encodeURIComponent(req.params.username)}/repos${query}`
    );

    res.json(repos);
  } catch (err) {
    res
      .status(err.status || 500)
      .json(err.message || "Unable to fetch GitHub repositories");
  }
});

export default router;
