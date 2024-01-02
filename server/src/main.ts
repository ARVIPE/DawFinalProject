import path from "path";
import express, {Express, NextFunction, Request, Response} from "express";
//import { serverInfo } from "./serverInfo";
//import * as SMTP from "./smtp";
//import * as Contacts from "./contacts";
//import { IContact } from "./contacts";
const mongoose = require('mongoose');
const cors = require('cors');
const { contactModel } = require('../models.js');
const port = 80;
const uri = 'mongodb+srv://user:daw@cluster0.w1dabn6.mongodb.net/?retryWrites=true&w=majority';

const app: Express = express();
app.use(express.json());
app.use("/", express.static(path.join(__dirname, "/../../dataBrokeringIVClient/dist"))
);

app.use(cors());


app.use(function(inRequest: Request, inResponse: Response, inNext: NextFunction)
{
    inResponse.header("Access-Control-Allow-Origin", "*");
    inResponse.header("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS,PUT");
    inResponse.header("Access-Control-Allow-Headers", "Origin,X-Requested-Width,Content-Type,Accept,Referer,User-Agent");
    inNext();
});


const secretKey = 'Bearer 1234';
// Middleware to verify token
const verifyToken = (inRequest: Request, inResponse: Response, next: NextFunction) => {
  const token = inRequest.headers['authorization'];

  if (!token) {
    return inResponse.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  if(token !== secretKey){
    return inResponse.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
  next();
  
};

//we need these options to enable these specific headers for the security part to work(verifyToken)
app.options('/contacts', cors({
  allowedHeaders: ['Authorization', 'Content-Type'],
}));

//get
app.get("/contacts", verifyToken, async (inRequest: Request, inResponse: Response) => {
    try {
      //.find({}) "finds" all of the contacts in the database, as there are no filters as arguments
      //if we wanted to find something specific, we could use filters for certain fields
      const contacts = await contactModel.find({});
      inResponse.json(contacts);
    } catch (inError) {
      inResponse.send("error");
    }
  });

//insert
app.post('/contacts', verifyToken, async(req: Request, res: Response) =>{
    try {
        const name = req.body?.name;
        const email = req.body?.email;

        console.log(req.body);

        //if there is no name or there is no email we throw a message saying there is an error
        if (!name || !email) {
            return res.status(400).json({ message: 'Bad request, name or email not found' });
        }

        const contact = new contactModel({
            name,
            email
        });
  
        const save = await contact.save();  //.save is a method that saves the contact into the database
        return res.status(201).json({ contact: save });

    } catch (error) {
        console.log('Error', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

//delete
app.delete("/contacts/:id", verifyToken, async(req: Request, res: Response) =>{
    try{
        const id = req.params.id;
        //deleteOne deletes the first document he finds with the specified field in the database, because all IDs are different we can use this function as it wont affect anything
        const deletedContact = await contactModel.deleteOne({_id: new mongoose.Types.ObjectId(id)});
        console.log(deletedContact);
        return res.status(201).json({ contact: deletedContact });
    } catch(error){
        console.log('Error', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

//update
app.put("/contacts/:id", verifyToken, async(req: Request, res: Response) =>{
    try{
        const id = req.params.id;
        const name = req.body.name;
        const email = req.body.email;

        if (!name || !email) {
          return res.status(400).json({ message: 'Bad request, name or email not found' });
        }
  
        //.findOneAndUpdate finds the first document with the desired filters for each field(in this case _id:) and changes the desired fields to the new ones(in this case name and email)
        //return original makes this function return the document that was there before it was updated
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