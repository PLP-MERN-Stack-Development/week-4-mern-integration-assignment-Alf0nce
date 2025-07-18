import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import { Box, Card, CardContent, Typography, CircularProgress, Alert } from '@mui/material';

const PostList = () => {
  const { data: posts, loading, error } = useApi('/posts');

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box sx={{ mt: 4 }}>
      {posts?.map(post => (
        <Card key={post._id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h5" component={Link} to={`/posts/${post._id}`}>
              {post.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {new Date(post.createdAt).toLocaleDateString()}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              {post.content.substring(0, 100)}...
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default PostList;