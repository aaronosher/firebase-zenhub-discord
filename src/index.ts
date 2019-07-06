import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { issueTransfer } from './webhookHandlers';
import Webhook from './types/Webhook';

const app = express()

app.use(bodyParser.urlencoded({extended: true}));

app.post('/', async (req: Request, res: Response) => {
  const body = req.body as Webhook;
  
  try {
    if(body.type === 'issue_transfer') {
      await issueTransfer(body);
      return res.json({
        success: true,
        error: false,
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      error: "an error occured",
    });
  }
});

export default app;
