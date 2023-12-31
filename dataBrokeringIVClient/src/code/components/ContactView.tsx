// React imports.
import React from "react";

// Material-UI imports.
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";

/**
 * ContactView.
 */
const ContactView = ({ state }) => (

  

  <form>

    <div className="contactViewForm">

    <TextField margin="dense" id="contactName" label="Name" value={ state.contactName } variant="outlined"
      InputProps={{ style : { color : "white" } }} style={{ width:260 }} 
      onChange={ state.fieldChangeHandler } />
    <br />
    <TextField margin="dense" id="contactEmail" label="Email" value={ state.contactEmail } variant="outlined"
      InputProps={{ style : { color:"white" } }} style={{ width:520 }} 
      onChange={ state.fieldChangeHandler } />
    <br />
    { /* Hide.show buttons as appropriate.  Note that we have to use this form of onClick() otherwise the event  */ }
    { /* object would be passed to addContact() and the branching logic would fail. */ }
    { state.currentView === "contactAdd" &&
      <Button variant="contained" color="primary" size="small" style={{ marginTop:10, backgroundColor:"#ba3607" }}
        onClick={ state.saveContact }>
        Save
      </Button>
    }
    { state.currentView === "contact" &&
      <Button variant="contained" color="primary" size="small" style={{ marginTop:10, marginRight:10, backgroundColor:"#ba3607" }}
        onClick={ state.deleteContact }>
        Delete
      </Button>
    }
    { state.currentView === "contact" &&
      <Button variant="contained" color="secondary" size="small" style={{ marginTop:10, marginRight: 10}}
      onClick={state.updateContact}>Update</Button>
    }
    
    </div>


  </form>

); /* ContactView. */


export default ContactView;
