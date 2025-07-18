import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField, Button, Box, CircularProgress, Alert } from '@mui/material';
import api from '../services/api';

const postSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  content: yup.string().required('Content is required'),
});

const PostForm = ({ initialData, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(postSchema),
    defaultValues: initialData || {}
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const url = initialData ? `/posts/${initialData._id}` : '/posts';
      const method = initialData ? 'put' : 'post';
      const response = await api[method](url, data);
      onSuccess(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      
      <TextField
        fullWidth
        margin="normal"
        label="Title"
        {...register('title')}
        error={!!errors.title}
        helperText={errors.title?.message}
      />
      
      <TextField
        fullWidth
        margin="normal"
        label="Content"
        multiline
        rows={4}
        {...register('content')}
        error={!!errors.content}
        helperText={errors.content?.message}
      />
      
      <Button 
        type="submit" 
        variant="contained" 
        sx={{ mt: 2 }}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : 'Submit'}
      </Button>
    </Box>
  );
};

export default PostForm;