export interface Driver {
    id: number;
    company_id: number;
    city: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    avatar_url: string;
    status: string;
    created_at: string;
  }
  
  export const getDrivers = async (): Promise<Driver[]> => {
    try {
      const response = await fetch(' http://localhost:3006/api/drivers');
  
      if (!response.ok) {
        throw new Error('Erro ao buscar motoristas');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro no service:', error);
      throw error;
    }
  };