import React, {useEffect, useState} from 'react';
import CardsContainer from '../components/CardsContainer';
import ContactInfo from '../utils/ContactInterface';
import { API } from '../utils/Constants';
import { createStyles, Fab, Grid, makeStyles, Modal, Theme, Tooltip } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Loading from '../components/Loading';
import Header from '../components/Header';
import ModalEdit from '../components/ModalEdit';
import ModalCreate from '../components/ModalCreate';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    absolute: {
      position: 'absolute',
      bottom: theme.spacing(0),
      right: theme.spacing(3),
    },
    tooltip: {
      marginBottom:'1%'
    }
  }),
);


function ContactList() {
  const [loading, setLoading] = useState(true)
  const [buttonLoading, setButtonLoading] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openCreate, setOpenCreate] = useState(false)
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

  const updateUser = (user: ContactInfo) => {
    setButtonLoading(true)
    fetch(`${API}/users/${user.id}`,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    }).then( ()=>{
      console.log("Done")
      setButtonLoading(false)
    }).catch(e=>{
      console.log("Error en put")
      setLoading(false)
  })
  }

  const eliminateUser = () => {
    fetch(`${API}/users/${contact.id}`,{
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then( (response)=>{
      console.log("Done")
      setButtonLoading(false)
      console.log(response)
    }).catch(e=>{
      console.log("Error en delete")
      setLoading(false)
  })
  }

  const handleClose = () => {
    setOpenEdit(false)
  }

  const handleUpdate = (user:ContactInfo) => {
    updateUser(user)
    handleClose()
    setContactInfo([
      ...contactInfo.filter((info)=> info.id!==user.id),
      user
    ])
  }

  const handleEdit = (contact: ContactInfo) => {
    setContact(contact)
    setOpenEdit(true)
  }
  const handleEliminate = (contact: ContactInfo) => {
    setContact(contact)
    eliminateUser()
    setContactInfo(
      contactInfo.filter((info)=> info.id!==contact.id )
    )
  }

  const handleCloseCreate = () => {
    setOpenCreate(false)
  }

  const handleCreate = (contact: ContactInfo) => {
    setContactInfo([
      ...contactInfo,
      contact])
  }
  

  return <Grid container justifyContent="center" >
    <Header />
    { loading ? <Loading/> : <CardsContainer list={contactInfo} handleEdit={handleEdit} handleEliminate={handleEliminate} /> }
    
    <Tooltip className={classes.tooltip} title="Add" aria-label="add">
        <Fab color="primary" className={classes.absolute} onClick={()=>{setOpenCreate(true)}}>
          <AddIcon />
        </Fab>
    </Tooltip>
    <Modal
     open={openEdit}
     onClose={handleClose}
     aria-labelledby="modal-edit"
    >
      <ModalEdit loading={buttonLoading} contact={contact} handleUpdate={handleUpdate} />
    </Modal>
    <Modal
     open={openCreate}
     onClose={handleCloseCreate}
     aria-labelledby="modal-create"
    >
      <ModalCreate handleClose={handleCloseCreate} handleCreate={handleCreate}/>
    </Modal>
  </Grid>;
}

export default ContactList;