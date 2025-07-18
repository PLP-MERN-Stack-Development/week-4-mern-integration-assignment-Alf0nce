import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';

export const useApi = (url, initialData = null) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get(url);
      setData(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const postData = async (postData) => {
    setLoading(true);
    try {
      const response = await api.post(url, postData);
      setData(response.data);
      setError(null);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch: fetchData, postData };
};