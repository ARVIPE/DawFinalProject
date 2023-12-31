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

    try{
      const response: AxiosResponse = await axios.get(
        `${config.serverAddress}/contacts`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return response.data;
    } catch (error) {
      // Handle errors
      console.error("Error listing contacts:", error);
      throw error;
    }


  } /* End listContacts(). */


  /**
   * Add a contact to the server.
   *
   * @oaram  inContact The contact to add.
   * @return           The inContact object, but now with a _id field added.
   */
  public async addContact(inContact: IContact): Promise<IContact> {
    console.log("Contacts.Worker.addContact()", inContact);
  
    const token = 'Bearer 1234'; // Replace this with your actual token
  
    try {
      const response: AxiosResponse = await axios.post(
        `${config.serverAddress}/contacts`,
        inContact,
        {
          headers: {
            Authorization: token,
          },
        }
      );
  
      return response.data.contact;
    } catch (error) {
      console.error("Error adding contact:", error.message);
      throw error;
    }
  }
  /* End addContact(). */


  /**
   * Update a contact to the server
   * 
   */
  public async updateContact(inContact: IContact): Promise<IContact>{

    console.log("Contacts.Worker.updateContact()", inContact);
    console.log("The id: " + inContact._id);

    const token = 'Bearer 1234';

    try{
      const response: AxiosResponse = await axios.put(
        `${config.serverAddress}/contacts/${inContact._id}`,
        inContact,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return response.data.contact;
    }catch(error){
      console.error("Error updating contact:", error);
      throw error;
    }
  }


  /**
   * Delete a contact from the server.
   *
   * @oaram inID The ID (_id) of the contact to add.
   */
  public async deleteContact(inID): Promise<void> {

    console.log("Contacts.Worker.deleteContact()", inID);

    const token = 'Bearer 1234';

    try{
      const response: AxiosResponse = await axios.delete(
        `${config.serverAddress}/contacts/${inID}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );  
    }catch(error){
      console.error("Error deleting contact:", error);
      throw error;
    }

  } /* End deleteContact(). */


} /* End class. */
