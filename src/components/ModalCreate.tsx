import { Button, Card, CardContent, Grid, makeStyles, TextField } from "@material-ui/core";
import React from "react";
import { useState } from "react";
import { API } from "../utils/Constants";
import ContactInfo from "../utils/ContactInterface";

const useStyles = makeStyles({
    root: {
        width:300,
        position: 'absolute'
    },
    button: {
        display:'block',
        marginLeft:'auto',
        marginRight:'auto',
        marginBottom:10
    }
})


function ModalCreate(props: {handleClose: Function}){
    const classes = useStyles()
    const [contact, setContact] = useState<ContactInfo>({} as ContactInfo)
    const [loading, setLoading] = useState(false)

    const handleChange = (e: {target:{name:string, value:string}} ) => {
        setContact({
            ...contact,
            [e.target.name]: e.target.value,
        })
        console.log("doing")
        console.log(contact)
    }
    const handleUpdate = () => {
        setLoading(true)
        fetch(`${API}/users`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(contact)
        })
        .then(response => response.json())
        .then( (data)=>{
          console.log("Done")
          setLoading(false)
        }).catch(e=>{
            console.log("Error en post")
            setLoading(false)
        })
    }

    return <Card style={{top:'30%',left:'50%', transform:'translate(-50%,-30%)'}} className={classes.root}>
            <CardContent>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item>
                        <TextField
                            name="avatar"
                            label="Image URL"
                            variant="outlined"
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            name="first_name"
                            label="First Name"
                            variant="outlined"
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            name="last_name"
                            label="Last Name"
                            variant="outlined"
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            name="email"
                            label="E-mail"
                            variant="outlined"
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>
            </CardContent>
            <Button className={classes.button} variant="contained" color="primary" onClick={handleUpdate}>
              { loading ? "Loading" : "Save"}
            </Button>
        </Card> 
}

export default ModalCreate