import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ContactDetail from '../components/ContactDetails';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { API } from '../utils/Constants';
import ContactInfo from '../utils/ContactInterface';

function ConctactDetail() {
  const [loading, setLoading] = useState(true)
  const [contactInfo, setContactInfo] = useState<ContactInfo>({} as ContactInfo) 
  
  const {id} = useParams<{id: string}>();

  useEffect( () => {
    setLoading(true)
    fetch(`${API}/${id}`)
      .then(response => response.json())
      .then( (data: { data: ContactInfo }) => {
        setContactInfo(data.data)
        setLoading(false)
      })
      .catch(e => setLoading(true))
  },[id])
      
  return <Grid container justifyContent="center">
    <Header/>
    <Grid container justifyContent="center">
       { loading? <Loading/> : <ContactDetail contact={contactInfo} edit={false} /> } 
    </Grid>
  </Grid>;
}

export default ConctactDetail;
