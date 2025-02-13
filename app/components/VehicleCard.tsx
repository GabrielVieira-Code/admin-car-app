import React from "react";

interface VehicleCardProps {
  vehicle: {
    id: number;
    driver_id: number;
    plate: string;
    model: string;
    type: string;
    capacity: string;
    creation_date: string;
  };
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold">{vehicle.model}</h3>
      <p className="text-sm text-gray-600">Placa: {vehicle.plate}</p>
      <p className="text-sm text-gray-600">Tipo: {vehicle.type}</p>
      <p className="text-sm text-gray-600">Capacidade: {vehicle.capacity}</p>
      <p className="text-sm text-gray-600">
        Data de criação: {new Date(vehicle.creation_date).toLocaleDateString()}
      </p>
      <p className="text-sm text-gray-600">ID do Motorista: {vehicle.driver_id}</p>
    </div>
  );
};

export default VehicleCard;