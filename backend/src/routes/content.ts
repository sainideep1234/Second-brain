import { Router, Request, Response } from "express";
import z from "zod";
import { contentModal, shareModal } from "../db/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { authmiddleware } from "../middleware/authmiddleware";
import { randomString } from "../func";

const JWT_SECRET = "sdffgk;jnbfmgde";
const contentRouter = Router();

contentRouter.post( "/post",authmiddleware, async (req: Request, res: Response) => {
    try {
      const link = req.body.link;
      const title = req.body.title;

      await contentModal.create({title,link,tag: [],
        // @ts-ignore id: req.id,
      });
      return res.status(201).json({
        msg: "content store successfully ",
      });
    } catch (error) {
      return res.status(411).json({
        msg: "content not store because  " + error,
      });
    }
  }
);

contentRouter.get("/get", async (req, res) => {
  try {
    const content = await contentModal
      // @ts-ignore
      .find({ userId: req.id })
      .populate("id", "userName");

    console.log(content);

    if (content) {
      res.status(201).json({
        msg: "content retrieved successfully",
        content,
      });
      return;
    } else {
      res.status(403).json({
        msg: "content is not available ",
      });

      return;
    }
  } catch (error) {
    console.log(error);
    res.status(403).json({
      msg: "content is not available " + error,
    });
  }
});

contentRouter.delete("/delete", authmiddleware, async (req, res) => {
  const contentId = req.body.contentId;

  // @ts-ignore
  await contentModal.deleteMany({ _id: contentId, id: req.id });
  res.status(411).json({
    msg: "contetn delete successfully",
  });
});

contentRouter.post("/share", async (req, res) => {
  try {
    // @ts-ignore
    const { id } = jwt.decode(req.body.token);

    if (!id) {
      return res.status(411).json({ msg: "id is not present" });
    }

    const alreadylink = await shareModal.findOne({
      userId: id,
      isShareLink: true,
    });

    if (alreadylink) {
      return res
        .status(201)
        .json({ msg: "already has share link ", link: alreadylink.shareLink });
    }

    const sharerandomlink = randomString();

    const share = await shareModal.create({
      id,
      shareLink: sharerandomlink,
      isShareLink: true,
    });

    res.status(200).json({
      msg: "share link created successfully ",
      link: share.shareLink,
    });
  } catch (error) {
    res.status(200).json({
      msg: "error while genrating link ",
      error,
    });
  }
});

contentRouter.get("/share/:link", async (req, res) => {
  try {
    const link = req.params.link;
    const shli = link.split(":")[1];

    // Find the share document
    const document = await shareModal.findOne({
      shareLink: shli,
      isShareLink: true,
    });

    if (!document) {
      return res.status(404).json({ msg: "Shared link is invalid or expired" });
    }

    // Convert id to string if it's an ObjectId
    const id = document?.userId?.toString();

    // Find associated content
    const contents = await contentModal.find({ userId: id });

    if (contents.length === 0) {
      return res
        .status(404)
        .json({ msg: "No content available for this user" });
    }

    return res.status(200).json({
      msg: "Data retrieved successfully",
      contents,
    });
  } catch (error) {
    console.error("Error in /share/:link route:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
});
export { contentRouter };
