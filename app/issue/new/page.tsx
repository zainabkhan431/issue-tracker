'use client'
import { TextField, Button } from '@radix-ui/themes';
import SimpleMDE from 'react-simplemde-editor';
import { useForm, Controller } from 'react-hook-form';
import 'easymde/dist/easymde.min.css';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IssueForm>();

  const onSubmit = async (data: IssueForm) => {
    try {
      await axios.post('http://localhost:3000/api/issues', data);
      router.push('/issue');
    } catch (error) {
      console.error('Error creating issue:', error);
    }
  };

  return (
    <form className="space-y-3 max-w-xl" onSubmit={handleSubmit(onSubmit)}>
       <TextField.Root placeholder='Title' {...register('title')}>
        <TextField.Slot></TextField.Slot>
      </TextField.Root>

      <Controller
        name="description"
        control={control}
        render={({ field }) => <SimpleMDE placeholder="Description" {...field} />}
      />

      <Button type="submit">Submit</Button>
    </form>
  );
};

export default NewIssuePage;
