// Library imports.
import axios, { AxiosResponse } from "axios";

// App imports.
import { config } from "./config";

// Define interface to describe a contact.  Note that we'll only have an _id field when retrieving or adding, so
// it has to be optional.
export interface IContact { _id?: string, name: string, email: string }


// The worker that will perform contact operations.
export class Worker {


  /**
   * Returns a list of all contacts from the server.
   *
   * @return An array of objects, on per contact.
   */
  public async listContacts(): Promise<IContact[]> {

    console.log("Contacts.Worker.listContacts()");

    const token = 'Bearer 1234';
    
    const response: AxiosResponse = await axios.get(`${config.serverAddress}/contacts`, {headers: {'Authorization': token, 'Content-Type': 'application/json'}});
    return response.data;

  } /* End listContacts(). */


  /**
   * Add a contact to the server.
   *
   * @oaram  inContact The contact to add.
   * @return           The inContact object, but now with a _id field added.
   */
  public async addContact(inContact: IContact): Promise<IContact> {

    console.log("Contacts.Worker.addContact()", inContact);

    const token = 'Bearer 1234';
    const response: AxiosResponse = await axios.post(`${config.serverAddress}/contacts`, inContact, {headers: {'Authorization': token, 'Content-Type': 'application/json'}});
    return response.data.contact;

  } /* End addContact(). */


  /**
   * Update a contact to the server
   * 
   */
  public async updateContact(inContact: IContact): Promise<IContact> {

    console.log("Contacts.Worker.updateContact()", inContact);
    console.log("The id: " + inContact._id);

    const token = 'Bearer 1234';
    const response: AxiosResponse = await axios.put(`${config.serverAddress}/contacts/${inContact._id}`, inContact, {headers: {'Authorization': token, 'Content-Type': 'application/json'}});
    
    return response.data.contact;
  }


  /**
   * Delete a contact from the server.
   *
   * @oaram inID The ID (_id) of the contact to add.
   */
  public async deleteContact(inID): Promise<void> {

    console.log("Contacts.Worker.deleteContact()", inID);

    const token = 'Bearer 1234';

    return await axios.delete(`${config.serverAddress}/contacts/${inID}`, {headers: {'Authorization': token, 'Content-Type': 'application/json'}});


  } /* End deleteContact(). */


} /* End class. */
