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

const  ContactDetail: React.FunctionComponent< {contact: ContactInfo, edit: boolean, handleChange: Function }> = props => {
    const classes = useStyles()

    const disable = !props.edit
    let contact = props.contact
    const handleChange = (e:{}) => props.handleChange(e)

    return <Card className={classes.root}>
            <CardMedia
                className={classes.media}
                image={contact.avatar}
            />
            <CardContent>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item>
                        <TextField
                            name="first_name"
                            disabled={disable}
                            label="First Name"
                            defaultValue={contact.first_name}
                            variant="outlined"
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            name="last_name"
                            disabled={disable}
                            label="Last Name"
                            defaultValue={contact.last_name}
                            variant="outlined"
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            name="email"
                            disabled={disable}
                            label="E-mail"
                            defaultValue={contact.email}
                            variant="outlined"
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>
            </CardContent>
            {props.children}
        </Card>
}

export default ContactDetail