import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config'
import { userRouter } from './routes/user';
import { contentRouter } from './routes/content';
import cors from 'cors'

const app = express();


const MONGODB_URL:string  = 'mongodb+srv://yashmalkhan545:Authokrloyash123@authkrlo.awd4h.mongodb.net/second-Brain';


app.use(cors());
app.use(express.json());

app.use('/user', userRouter);
app.use('/content', contentRouter);

app.get("/", (req, res) => res.send("Express on Vercel"));
async function main(){
    await mongoose.connect(MONGODB_URL);
    app.listen(3002);
    console.log('server started on port 3002');
}

main();

