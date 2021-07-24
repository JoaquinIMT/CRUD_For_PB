import React, {useEffect, useState} from 'react';
import CardsContainer from '../components/CardsContainer';
import ContactInfo from '../utils/ContactInterface';
import { API } from '../utils/Constants';
import { Button, createStyles, Fab, Grid, makeStyles, Modal, Theme, Tooltip } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Loading from '../components/Loading';
import Header from '../components/Header';
import ContactDetail from '../components/ContactDetails';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    absolute: {
      position: 'absolute',
      bottom: theme.spacing(0),
      right: theme.spacing(3),
    },
  }),
);


function ContactList() {
  const [loading, setLoading] = useState(true)
  const [openEdit, setOpenEdit] = useState(false)
  const [contact, setContact] = useState<ContactInfo>({} as ContactInfo)
  const [contactInfo, setContactInfo] = useState< ContactInfo[] >([])
  
  const classes = useStyles()
  
  useEffect( () => {
    setLoading(true)
    fetch(API)
      .then(response => response.json())
      .then( (data: { data: Array<ContactInfo> }) => {
        setContactInfo(data.data)
        setLoading(false)
      })
  },[] )

  const handleClose = () => setOpenEdit(false)
  const handleEdit = (contact: ContactInfo) => {
    setContact(contact)
    setOpenEdit(true)
  }
  const handleEliminate = (contact: ContactInfo) => {
    setContact(contact)
  }
  

  return <Grid container justifyContent="center" >
    <Header />
    { loading ? <Loading/> : <CardsContainer list={contactInfo} handleEdit={handleEdit} handleEliminate={handleEliminate} /> }
    
    <Tooltip title="Add" aria-label="add">
        <Fab color="primary" className={classes.absolute} onClick={()=>{}}>
          <AddIcon />
        </Fab>
    </Tooltip>
    <Modal
     open={openEdit}
     onClose={handleClose}
    >
      <Grid container spacing={3} justifyContent="center">
        <Grid container justifyContent="center">
          <ContactDetail contact={contact} edit={true} />
        </Grid>
        <br/>
        <Grid item>
          <Button variant="contained" color="primary" onClick={handleClose}>Save</Button>
        </Grid>
      </Grid>
    </Modal>
  </Grid>;
}

export default ContactList;