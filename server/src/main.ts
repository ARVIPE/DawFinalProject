import path from "path";
import express, {Express, NextFunction, Request, Response} from "express";
//import { serverInfo } from "./serverInfo";
//import * as SMTP from "./smtp";
//import * as Contacts from "./contacts";
//import { IContact } from "./contacts";
const mongoose = require('mongoose');
const { contactModel } = require('../models.js');
const port = 80;
const uri = 'mongodb+srv://user:daw@cluster0.w1dabn6.mongodb.net/?retryWrites=true&w=majority';

const app: Express = express();
app.use(express.json());
app.use("/", express.static(path.join(__dirname, "/../../dataBrokeringIVClient/dist"))
);


app.use(function(inRequest: Request, inResponse: Response, inNext: NextFunction)
{
    inResponse.header("Access-Control-Allow-Origin", "*");
    inResponse.header("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS");
    inResponse.header("Access-Control-Allow-Headers", "Origin,X-Requested-Width,Content-Type,Accept");
    inNext();
});

//get
app.get("/contacts", async (inRequest: Request, inResponse: Response) => {
    try {
      const contacts = await contactModel.find({});
      inResponse.json(contacts);
    } catch (inError) {
      inResponse.send("error");
    }
  });

//insert
app.post('/contacts', async(req: Request, res: Response) =>{
    try {
        const name = req.body?.name;
        const email = req.body?.email;

        console.log(req.body);
  
        if (!name || !email) {
            return res.status(400).json({ message: 'Bad request, name or email not found' });
        }

        const contact = new contactModel({
            name,
            email
        });
  
        const save = await contact.save();
        return res.status(201).json({ contact: save });

    } catch (error) {
        console.log('Error', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

//delete
app.delete("/contacts/:id", async(req: Request, res: Response) =>{
    try{
        const id = req.params.id;
        const deletedContact = await contactModel.deleteOne({_id: new mongoose.Types.ObjectId(id)});
        console.log(deletedContact);
        return res.status(201).json({ contact: deletedContact });
    } catch(error){
        console.log('Error', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

//update
app.put("/contacts/:id", async(req: Request, res: Response) =>{
    try{
        const id = req.params.id;
        const name = req.body.name;
        const email = req.body.email;

        if (!name || !email) {
          return res.status(400).json({ message: 'Bad request, name or email not found' });
        }
  
        const updatedContact = await contactModel.findOneAndUpdate({_id: new mongoose.Types.ObjectId(id)}, {name: name, email: email}, {returnOriginal: false})
        console.log(updatedContact);
        return res.status(201).json({ contact: updatedContact });
    } catch(error){
        console.log('Error', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// Start app listening.
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log('Connection success');
      app.listen(port, () => {
        console.log(`Server listen on http://localhost:${port}`);
      });
    })
    .catch((error: any) => {
      console.error('Connection fail', error);
    });