const serverBaseUrl = import.meta.env.VITE_SERVER_BASE_URL || 'http://localhost:3001';

export async function fetchCatalog() {
  const response = await fetch(`${serverBaseUrl}/catalog`);

  if (!response.ok) {
    throw new Error('Catalog request failed');
  }

  return response.json();
}

export { serverBaseUrl };
