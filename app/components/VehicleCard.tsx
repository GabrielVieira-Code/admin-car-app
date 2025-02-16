import React from "react";

interface VehicleProps {
  id: number;
  driver_id: number;
  plate: string;
  model: string;
  type: string;
  capacity: string;
  creation_date: string;
}

interface DriverProps {
  id: number;
  company_id: number;
  city: number;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  avatar_url: string;
  status: string;
  created_at: string;
  driver?: { first_name: string; last_name: string };
}

interface VehicleCardProps {
  vehicle: VehicleProps;
  driver: DriverProps;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, driver }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold">{vehicle.model}</h3>
      <p className="text-sm text-gray-600">Placa: {vehicle.plate}</p>
      <p className="text-sm text-gray-600">Tipo: {vehicle.type}</p>
      <p className="text-sm text-gray-600">Capacidade: {vehicle.capacity}</p>
      <p className="text-sm text-gray-600">
        Data de criação: {new Date(vehicle.creation_date).toLocaleDateString()}
      </p>

      <hr className="my-2" />

      <h4 className="text-md font-semibold">Motorista</h4>
      <p className="text-sm text-gray-600">Nome: {driver.first_name} {driver.last_name}</p>
      <p className="text-sm text-gray-600">Telefone: {driver.phone}</p>
      <p className="text-sm text-gray-600">E-mail: {driver.email}</p>
    </div>
  );
};

export default VehicleCard;
