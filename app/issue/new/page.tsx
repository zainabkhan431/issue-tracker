'use client'
import { TextField, Button, Callout, } from '@radix-ui/themes';
import SimpleMDE from 'react-simplemde-editor';
import { useForm, Controller } from 'react-hook-form';
import 'easymde/dist/easymde.min.css';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/ValidationSchema';
import {z} from "zod";
import ErrorMessage from '@/app/Component/ErrorMessage';

type IssueForm=z.infer<typeof createIssueSchema>

const NewIssuePage = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [error,setError] =useState('');
  const router = useRouter();
  const { register, control, handleSubmit ,formState:{errors}} = useForm<IssueForm>({
    resolver:zodResolver(createIssueSchema)
  });

  const onSubmit = async (data: IssueForm) => {
    try {
      await axios.post('http://localhost:3000/api/issues', data);
      router.push('/issue');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError('An unexpected error occured',)
    }
  };

  return (
    <div className='max-w-xl'>
        {
            error && <Callout.Root color='red' className='mb-5'>
                <Callout.Text>{error}</Callout.Text>
            </Callout.Root>
        }

    
    <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
       <TextField.Root placeholder='Title' {...register('title')}>
        <TextField.Slot></TextField.Slot>
      </TextField.Root>
      <ErrorMessage >{errors.title?.message}</ErrorMessage>

      <Controller
        name="description"
        control={control}
        render={({ field }) => <SimpleMDE placeholder="Description" {...field} />}
      />
 <ErrorMessage >{errors.description?.message} </ErrorMessage>
      <Button type="submit">Submit Issue Now</Button>
    </form>
    </div>
  );
};

export default NewIssuePage;
