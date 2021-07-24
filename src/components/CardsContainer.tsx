import React from "react";

import ContactInfo from "../utils/ContactInterface";
import { Grid, makeStyles } from '@material-ui/core'
import ContactCard from "./ContactCard";

const useStyles = makeStyles({
    root: {
        padding: "2%"
    }
})


function CardsContainer(props: {list: Array<ContactInfo>, handleEdit: Function, handleEliminate: Function}) {
    const classes = useStyles()
    return <Grid container spacing={2} className={classes.root} >
        <Grid container spacing={4}>
            {props.list.map( (contact) => {
                return <Grid key={contact.id} item >
                    <ContactCard contact={contact} handleEdit={props.handleEdit} handleEliminate={props.handleEliminate} />
                </Grid>
            })}
        </Grid>
    </Grid>
}

export default CardsContainer