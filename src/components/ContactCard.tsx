import React from "react";

import { Card, CardMedia, CardContent, CardActionArea, CardActions, makeStyles, Typography } from '@material-ui/core'
import { Close, Edit } from '@material-ui/icons'
import ContactInfo from "../utils/ContactInterface";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
    root: {
        width: 200
    },
    media: {
        height: 100
    },
    typography: {
        textDecoration: 'none'
    },
})

function ContactCard(props: {contact: ContactInfo, handleEdit: Function, handleEliminate: Function}) {
    const classes = useStyles();
    const history = useHistory();
    const contact = props.contact; 

    let handleClick = () => history.push(`/${contact.id}`)
    let handleEditClick = () => {
        props.handleEdit(contact)
    }
    let handleRemoveClick = () => {
        props.handleEliminate(contact)
    }

    return <Card className={classes.root}>
        <CardActionArea onClick={handleClick}>
            <CardMedia
                className={classes.media}
                image={contact.avatar}
            />
            <CardContent>
                <Typography className={classes.typography} gutterBottom variant="h5" component="h2">
                    {`${contact.first_name} ${contact.last_name}`}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {contact.email}
                </Typography>
            </CardContent>
        </CardActionArea>
        <CardActions>
                <Edit onClick={handleEditClick} />
                <Close onClick={handleRemoveClick}/>
        </CardActions>
    </Card>
}

export default ContactCard