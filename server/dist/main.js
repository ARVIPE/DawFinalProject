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
    inResponse.header("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS,PUT");
    inResponse.header("Access-Control-Allow-Headers", "Origin,X-Requested-Width,Content-Type,Accept");
    inNext();
});
//get
app.get("/contacts", (inRequest, inResponse) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contacts = yield contactModel.find({});
        inResponse.json(contacts);
    }
    catch (inError) {
        inResponse.send("error");
    }
}));
//insert
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
//delete
app.delete("/contacts/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const deletedContact = yield contactModel.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
        console.log(deletedContact);
        return res.status(201).json({ contact: deletedContact });
    }
    catch (error) {
        console.log('Error', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}));
//update
app.put("/contacts/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const name = req.body.name;
        const email = req.body.email;
        if (!name || !email) {
            return res.status(400).json({ message: 'Bad request, name or email not found' });
        }
        const updatedContact = yield contactModel.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(id) }, { name: name, email: email }, { returnOriginal: false });
        console.log(updatedContact);
        return res.status(201).json({ contact: updatedContact });
    }
    catch (error) {
        console.log('Error', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}));
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
