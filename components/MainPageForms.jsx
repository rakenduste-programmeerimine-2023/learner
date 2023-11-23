'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Typography, Button, Grid } from '@mui/material'


export default function MainPageCategories() {
  const supabase = createClientComponentClient()
  const router = useRouter()

  const [categories, setCategories] = useState([])
  const [forms, setForms] = useState([])
  

	useEffect(() => {
    const getCategories = async () => {
      const { data } = await supabase.from('category').select()
      if (data) {
        setCategories(data)
				//console.log(data)
      }
    }
    getCategories()
  }, [supabase, setCategories])

  useEffect(() => {
    const getForms = async () => {
      const { data } = await supabase.from('form').select()
      if (data) {
        setForms(data)
				//console.log(data)
      }
    }
    getForms()
  }, [supabase, setForms])

  function filterForms(catID){
    //console.log(catID)
    //console.log(forms.filter(form => form.category_id == catID))
    return forms.filter(form => form.category_id == catID)
  }

  //console.log(forms[0].category_id)
	return (
    <Grid container spacing={2}>
      {categories.map(({id: catID, name}) => (
        <Grid item
          key={catID}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            border: 1,
            borderColor: 'primary.main',
            boxShadow: 1,
            borderRadius: 2,
            p: 2,
            m: 2,
            minWidth: 300,
            minHeight: 100,
          }}>
          <Typography key={catID} variant='h5'>{name}</Typography>

          {forms.filter(form => form.category_id == catID).map(({id: formID, title}) => (
            <Button 
              style={{justifyContent: "flex-start"}}
              sx={{
                width: 'fit-content'
              }}
              color="primary" 
              variant="contained" 
              onClick={() => router.push('/form?form_id='+formID)} 
              key={formID}
            >
                {title}
            </Button>
          ))}

        </Grid>
      ))}
    </Grid>

    
  )
}