"use client";

import React, { useState, useEffect } from "react";
import { createVehicle, getVehicles, Vehicle } from "../services/vehicleService"; // Importe as funções e interfaces
import { getDrivers, Driver } from "../services/driverService";
import VehicleCard from "./VehicleCard"; // Importe o componente VehicleCard

const FormVeiculo: React.FC = () => {
  const [formData, setFormData] = useState({
    plate: "",
    model: "",
    type: "",
    capacity: "",
    driver_id: "", // driver_id é uma string no estado
  });

  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]); // Estado para armazenar os veículos

  // Busca os motoristas e veículos ao carregar o componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const driversData = await getDrivers();
        setDrivers(driversData);

        const vehiclesData = await getVehicles(); // Busca os veículos
        setVehicles(vehiclesData);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Valida se um motorista foi selecionado
    if (!formData.driver_id) {
      alert("Selecione um motorista.");
      return;
    }

    try {
      const result = await createVehicle(formData); // Cria um veículo
      console.log("Veículo criado com sucesso! ID:", result.id);
      alert("Veículo criado com sucesso!");

      // Atualiza a lista de veículos após criar um novo
      const vehiclesData = await getVehicles();
      setVehicles(vehiclesData);

      // Limpa o formulário após o cadastro
      setFormData({
        plate: "",
        model: "",
        type: "",
        capacity: "",
        driver_id: "",
      });
    } catch (error) {
      console.error("Erro ao criar veículo:", error);
      alert("Erro ao criar veículo.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Formulário de cadastro de veículo */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="grid grid-cols-2 gap-4">
          {/* Campo Placa */}
          <div>
            <label htmlFor="plate" className="block text-sm font-medium text-gray-700">
              Placa
            </label>
            <input
              type="text"
              id="plate"
              name="plate"
              value={formData.plate}
              onChange={handleInputChange}
              placeholder="Ex: ABC1234"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Campo Modelo */}
          <div>
            <label htmlFor="model" className="block text-sm font-medium text-gray-700">
              Modelo
            </label>
            <input
              type="text"
              id="model"
              name="model"
              value={formData.model}
              onChange={handleInputChange}
              placeholder="Ex: Gol"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Campo Tipo */}
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">
              Tipo
            </label>
            <input
              type="text"
              id="type"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              placeholder="Ex: Carro"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Campo Capacidade */}
          <div>
            <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">
              Capacidade
            </label>
            <input
              type="text"
              id="capacity"
              name="capacity"
              value={formData.capacity}
              onChange={handleInputChange}
              placeholder="Ex: 5 pessoas"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Campo Motorista */}
          <div>
            <label htmlFor="driver_id" className="block text-sm font-medium text-gray-700">
              Motorista
            </label>
            <select
              id="driver_id"
              name="driver_id"
              value={formData.driver_id}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Selecione um motorista</option>
              {drivers.map((driver) => (
                <option key={driver.id} value={driver.id}>
                  {driver.first_name} {driver.last_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Botão de submit */}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Criar Veículo
          </button>
        </div>
      </form>

      {/* Lista de veículos */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Veículos Cadastrados</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FormVeiculo;