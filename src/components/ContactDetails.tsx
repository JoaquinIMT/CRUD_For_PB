import React from "react";
import ContactInfo from "../utils/ContactInterface";
import { Card, CardContent, CardMedia, Grid, makeStyles, TextField } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        width:300
    },
    media: {
        height:200
    },
})

function ContactDetail(props: {contact: ContactInfo, edit: boolean }){
    const classes = useStyles()

    const disable = !props.edit
    let contact = props.contact

    return <Card className={classes.root}>
            <CardMedia
                className={classes.media}
                image={contact.avatar}
            />
            <CardContent>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item>
                        <TextField
                            disabled={disable}
                            label="First Name"
                            defaultValue={contact.first_name}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            disabled={disable}
                            label="Last Name"
                            defaultValue={contact.last_name}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            disabled={disable}
                            label="E-mail"
                            defaultValue={contact.email}
                            variant="outlined"
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
}

export default ContactDetail