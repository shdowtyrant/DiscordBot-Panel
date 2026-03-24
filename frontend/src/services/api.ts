export const apiClient = async (endpoint: string, options: RequestInit = {}) => {
  const url = `http://localhost:5000/api/v1${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials: 'include', // Kunci untuk mengirim HTTP-Only JWT Cookie
  });

  if (!response.ok) {
    if (response.status === 401) throw new Error('Unauthorized');
    throw new Error('API Request Failed');
  }

  return response.json();
};
