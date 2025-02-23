import { Router,  Request, Response } from "express";
import z from "zod";
import { userModal } from "../db/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

const JWT_SECRET = "sdffgk;jnbfmgde";
const userRouter = Router();

const signupSchema = z.object({
  userName: z.string().email(),
  password: z.string(),
});

userRouter.post("/signup", async (req, res) => {
  try {
    const validschema = signupSchema.safeParse(req.body);

    if (!validschema.success) {
      res.status(403).json({
        msg: "user credentials not match ",
      });
      return ;
    }

    const { userName, password } = req.body;

    // search user ceated already 

    const preUser = await userModal.findOne({userName});
    if(preUser){
        res.status(403).json({
            msg:'user is already signed up '
        });
        return ;
    }

    const hashedPassword = await bcrypt.hash(password, 5);

    const user = await userModal.create({
      userName,
      password: hashedPassword,
    });

    if (user) {
      const token = jwt.sign({ id: user._id }, JWT_SECRET);

      res.status(200).json({
        msg: "user signup successfully ",
        token: token,
      });

    }
  } catch (error) {
  
    return res.status(500).json({
      msg: "user not craeted",
    });

  }
});

userRouter.post('/signin', async  (req:Request, res:Response ) => {

    try {
        

    const validschema = signupSchema.safeParse(req.body);

    if(!validschema.success){
        res.status(403).json({
            msg:'creadentials are wrong '
        });
    }
    
    // search user 
     const {userName , password} = req.body;

     const user = await userModal.findOne({userName});
     if(!user){
       return res.status(403).json({
            msg:'email not present  '
        })
     }
     //check password 
     const isvalidpass = await bcrypt.compare(password , user.password!);
     if(!isvalidpass){
        return res.status(403).json({
            msg:'password is wrong '
        })
     }

     const token = jwt.sign({id:user._id}, JWT_SECRET);
     return res.status(200).json({
        msg:'login successfully', token:token
     })
    } catch (error) {
    return res.json({
        msg:'error '+error
    })        
    }

     
})




export { userRouter };
