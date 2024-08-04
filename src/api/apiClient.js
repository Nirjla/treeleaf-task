export const apiClient = async (url) => {
      try {
            const response = await fetch(url)
            if (!response.ok) {
                  throw new Error(`Error fetching data: ${response.statusText}`);
            }
            const data = await response.json()
            return data
      } catch (err) {
            console.error('API fetch error:', err);
            throw err;
      }
}