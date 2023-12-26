"use strict";
/*
import * as path from "path";
const { contactModel } = require('../models.js');

export interface IContact {
    _id?: number, name:string, email:string
}

export class Worker{
    private db: any;
    constructor(){
        this.db = contactModel;
    }

    public listContacts(): Promise<IContact[]>{
        return new Promise((inResolve, inReject)=>{
            this.db.find({ },
                (inError: Error | null, inDocs: IContact[]) => {
                    if(inError){
                        inReject(inError);
                    }else{
                        inResolve(inDocs);
                    }
                }
                );
        });
    }

    public addContact(inContact: IContact): Promise<IContact>{
        return new Promise((inResolve, inReject) => {
            inContact.save(inContact,
                (inError: Error | null, inNewDoc: IContact) =>{
                    if(inError){
                        inReject(inError);
                    }else{
                        inResolve(inNewDoc);
                    }
                }
                );
        });
    }

    public deleteContact(inID: string): Promise<void>{
        return new Promise((inResolve, inReject) =>{
            this.db.remove({ _id: inID }, { },
                (inError: Error | null, inNumRemoved: number) =>{
                    if(inError){
                        inReject(inError);
                    }else{
                        inResolve();
                    }
                }
            );
        });
    }
}
*/ 
