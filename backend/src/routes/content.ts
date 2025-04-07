import { Router, Request, Response } from "express";
import z from "zod";
import { contentModal, messageModal, shareModal } from "../db/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { authmiddleware } from "../middleware/authmiddleware";
import { randomString } from "../utils/func";
import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";

const contentRouter = Router();

contentRouter.post("/post",authmiddleware,async (req: Request, res: Response) => {
    try {
      const { link, title, type , description } = req.body;

      await contentModal.create({
        title,
        link,
        type,
        description, 
        userId: req.userId,
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

contentRouter.get("/get", authmiddleware, async (req, res) => {
  try {
    const content = await contentModal.find({ userId: req.userId });

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

contentRouter.delete("/delete/:contentId", authmiddleware, async (req, res) => {
  const contentId = req.params.contentId;

  try {
    await contentModal.deleteMany({ _id: contentId });

    res.status(201).json({
      msg: "contetn delete successfully",
    });
  } catch (error) {
    res.status(501).json({
      msg: "not delet the conetnt ",
    });
  }
});

contentRouter.post("/share", authmiddleware, async (req, res) => {
  try {
    const id = req.userId;
    if (!id) {
      res.status(411).json({ msg: "id is not present" });
      return;
    }

    const alreadylink = await shareModal.findOne({
      userId: id,
      isShareLink: true,
    });

    if (alreadylink) {
      res
        .status(201)
        .json({ msg: "already has share link ", link: alreadylink.shareLink });
      return;
    }

    const sharerandomlink = randomString();

    const share = await shareModal.create({
      userId: id,
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

    const document = await shareModal.findOne({
      shareLink: link,
      isShareLink: true,
    });

    if (!document) {
      return res.status(404).json({ msg: "Shared link is invalid or expired" });
    }

    const id = document?.userId?.toString();

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

contentRouter.get("/youtube", authmiddleware, async (req, res) => {
  const userId = req.userId;

  const content = await contentModal.find({ userId, type: "youtube" });

  if (!content) {
    res.status(204).json({
      msg: "No YOutube conetnt is present",
    });
    return;
  }

  res.status(201).json({
    msg: "conetnt retrieve successulyy ",
    content,
  });
});

contentRouter.get("/twitter", authmiddleware, async (req, res) => {
  const userId = req.userId;

  const content = await contentModal.find({ userId, type: "twitter" });

  if (!content) {
    res.status(204).json({
      msg: "No YOutube conetnt is present",
    });
    return;
  }

  res.status(201).json({
    msg: "conetnt retrieve successulyy ",
    content,
  });
});

contentRouter.post("/chat", authmiddleware, async (req, res) => {
  const prompt = req.body.prompt;
  const userId = req.userId;

  try {
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    

  

    

    const message = await messageModal.create({
      userId,
      request: prompt,
      response:"
    });

    return res.status(200).json({
      message: "Chat history retrieved successfully",
      llmMsg: result?.response?.candidates[0]?.content.parts[0].text,
    });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while processing your request" });
  }
});

contentRouter.get("/chat", authmiddleware, async (req, res) => {
  const userId = req.userId;

  try {
    const data = await messageModal.find({ userId });

    if (!data) {
      res.status(204).json({
        message: "Chat history retrieved successfully",
        allmsg: data,
      });
      return;
    }

    res.status(200).json({
      message: "Chat history retrieved successfully",
      allmsg: data,
    });
    return;
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while processing your request" });
  }
});

export { contentRouter };
