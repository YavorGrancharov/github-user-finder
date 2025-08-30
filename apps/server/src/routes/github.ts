import { Router, Request, Response } from "express";
import { GithubUsersRequest, GithubUsersResponse, SimpleMessage } from "shared";
import { getGithubUsersList } from "../services/github";

const router = Router();

router.get(
  "/github/users",
  async (
    req: Request<
      object,
      GithubUsersResponse | SimpleMessage,
      object,
      GithubUsersRequest
    >,
    res: Response
  ): Promise<void> => {
    try {
      const { pageSize, search, page } = req.query;

      if (!pageSize || !page) {
        res.status(400).json({ message: "Missing required parameters" });
        return;
      }

      const query = {
        pageSize: Number(pageSize),
        search,
        page: Number(page),
      };

      const data = await getGithubUsersList(query);

      res.status(200).json(data);
    } catch (err) {
      console.error("API /api/github/users error:", err);
      res.status(500).json({ message: "Failed to fetch GitHub users" });
    }
  }
);

export default router;
