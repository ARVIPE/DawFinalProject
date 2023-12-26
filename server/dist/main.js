"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
//import { serverInfo } from "./serverInfo";
//import * as SMTP from "./smtp";
//import * as Contacts from "./contacts";
//import { IContact } from "./contacts";
const mongoose = require('mongoose');
const { contactModel } = require('../models.js');
const port = 80;
const uri = 'mongodb+srv://user:daw@cluster0.w1dabn6.mongodb.net/?retryWrites=true&w=majority';
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/", express_1.default.static(path_1.default.join(__dirname, "/../../dataBrokeringIVClient/dist")));
app.use(function (inRequest, inResponse, inNext) {
    inResponse.header("Access-Control-Allow-Origin", "*");
    inResponse.header("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS");
    inResponse.header("Access-Control-Allow-Headers", "Origin,X-Requested-Width,Content-Type,Accept");
    inNext();
});
/*
app.post("/messages", async (inRequest: Request, inResponse: Response) => {
    try {
        console.log("Received a message request:", inRequest.body);
        const smtpWorker: SMTP.Worker = new SMTP.Worker(serverInfo);
        await smtpWorker.sendMessage(inRequest.body);
        inResponse.send("ok");
    } catch (inError) {
        console.error("Error processing message request:", inError);
        inResponse.send("error");
    }
});
*/
/*
app.get("/contacts",
    async (inRequest: Request, inResponse: Response) => {
        try{
            const contactsWorker: Contacts.Worker = new Contacts.Worker();
            const contacts: IContact[] = await contactsWorker.listContacts();
            inResponse.json(contacts);
        }catch(inError){
            inResponse.send("error");
        }
    }
);
*/
app.get("/contacts", (inRequest, inResponse) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contacts = yield contactModel.find({});
        inResponse.json(contacts);
    }
    catch (inError) {
        inResponse.send("error");
    }
}));
app.post('/contacts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const name = (_a = req.body) === null || _a === void 0 ? void 0 : _a.name;
        const email = (_b = req.body) === null || _b === void 0 ? void 0 : _b.email;
        console.log(req.body);
        if (!name || !email) {
            return res.status(400).json({ message: 'Bad request, name or email not found' });
        }
        const contact = new contactModel({
            name,
            email
        });
        const save = yield contact.save();
        return res.status(201).json({ contact: save });
    }
    catch (error) {
        console.log('Error', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}));
/*
app.delete("/contacts/:id",
  async(inRequest: Request, inResponse: Response) =>{
      try{
          const contactsWorker: Contacts.Worker = new Contacts.Worker();
          await contactsWorker.deleteContact(inRequest.params.id);
          console.log(inRequest.params.id);
          inResponse.send("ok");
      }catch(inError){
          inResponse.send("error");
      }
  }
);
*/
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
    .catch((error) => {
    console.error('Connection fail', error);
});
