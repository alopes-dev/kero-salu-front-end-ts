import { useState } from 'react';

export interface SnackMessage {
  message: string;
  isError: boolean;
}

function useAsyncState<T>() {
  const [data, setData] = useState<null | T>(null);
  const [error, setError] = useState<null | Error>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [snackMessage, setSnackMessage] = useState<SnackMessage | null>(null);

  return {
    error,
    data,
    loading,
    success,
    snackMessage,
    setData,
    setError,
    setLoading,
    setSuccess,
    setSnackMessage,
  };
}

export default useAsyncState;
