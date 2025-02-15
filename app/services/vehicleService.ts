// Interface para os dados de um veículo
export interface Vehicle {
  id: number;
  driver_id: number;
  plate: string;
  model: string;
  type: string;
  capacity: string;
  creation_date: string;
}

// Interface para os dados de criação de um veículo
export interface VehicleData {
  plate: string;
  model: string;
  type: string;
  capacity: string;
  driver_id: string; // driver_id é uma string no formulário
}

// Função para criar um veículo
export const createVehicle = async (vehicleData: VehicleData): Promise<{ id: number }> => {
  // Converte driver_id para número e valida
  const driverId = parseInt(vehicleData.driver_id);
  if (isNaN(driverId)) {
    throw new Error("ID do motorista inválido");
  }

  const payload = {
    ...vehicleData,
    driver_id: driverId, // Usa o driver_id convertido
  };

  try {
    const response = await fetch('http://localhost:3006/api/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Erro ao criar veículo');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro no service:', error);
    throw error;
  }
};

// Função para buscar todos os veículos
export const getVehicles = async (): Promise<Vehicle[]> => {
  try {
    const response = await fetch('http://localhost:3006/api/data');

    if (!response.ok) {
      throw new Error('Erro ao buscar veículos');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro no service:', error);
    throw error;
  }
};