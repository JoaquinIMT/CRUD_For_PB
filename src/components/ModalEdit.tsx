import { Button, createStyles, Grid, makeStyles, Theme } from "@material-ui/core";
import React, { useState } from "react";
import ContactInfo from "../utils/ContactInterface";
import ContactDetail from "./ContactDetails";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
        width: 300,
        position: 'absolute'
    },
    button: {
        display:'block',
        marginLeft:'auto',
        marginRight:'auto',
        marginBottom:10
    }
  }),
);

function ModalEdit(props: {contact: ContactInfo, loading:Boolean, handleUpdate:Function}){    
    const classes = useStyles()
    const [contact, setContact] = useState(props.contact)
    const handleUpdate = () => props.handleUpdate(contact)

    const handleChange = (e: {target:{name:string, value:string}} ) => {
        setContact({
            ...contact,
            [e.target.name]: e.target.value,
        })
    }

    return <Grid container style={{top:'30%',left:'50%', transform:'translate(-50%,-30%)'}} className={classes.modal} justifyContent="center">
      <ContactDetail contact={contact} edit={true} handleChange={handleChange}>
            <Button className={classes.button} variant="contained" color="primary" onClick={handleUpdate}>
              { props.loading ? "Loading" : "Save"}
            </Button>
      </ContactDetail>
  </Grid>
}

export default ModalEdit