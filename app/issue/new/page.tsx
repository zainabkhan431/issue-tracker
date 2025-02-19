'use client'
import { TextField,TextArea ,Button} from '@radix-ui/themes'
import React from 'react'

const NewIssuePage = () => {
  return (
    <div className='space-y-3 max-w-xl'>
      <TextField.Root placeholder='Title' >
        <TextField.Slot></TextField.Slot>
      </TextField.Root>
      <TextArea placeholder=" Description" />
      <Button> Submit</Button>
    </div>
  )
}

export default NewIssuePage
