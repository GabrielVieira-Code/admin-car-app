"use client";

import React, { useState, useEffect } from "react";
import { createVehicle, getVehicles, Vehicle } from "../services/vehicleService";
import { getDrivers, Driver } from "../services/driverService";
import VehicleCard from "./VehicleCard";

const FormVeiculo: React.FC = () => {
  const [formData, setFormData] = useState({
    plate: "",
    model: "",
    type: "",
    capacity: "",
    driver_id: "",
  });
  const defaultDriver: Driver  = {
    id: 0,
    company_id: 0,
    city: 0,
    first_name: "Não encontrado",
    last_name: "",
    phone: "",
    email: "",
    avatar_url: "",
    status: "",
    created_at: "",
  };

  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Quantidade de veículos por página

  useEffect(() => {
    const fetchData = async () => {
      try {
        const driversData = await getDrivers();
        setDrivers(driversData);

        const vehiclesData = await getVehicles();
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

    if (!formData.driver_id) {
      alert("Selecione um motorista.");
      return;
    }

    try {
      const result = await createVehicle(formData);
      console.log("Veículo criado com sucesso! ID:", result.id);
      alert("Veículo criado com sucesso!");

      const vehiclesData = await getVehicles();
      setVehicles(vehiclesData);

      setFormData({
        plate: "",
        model: "",
        type: "",
        capacity: "",
        driver_id: "",
      });

      setCurrentPage(1); // Volta para a primeira página após adicionar um novo veículo
    } catch (error) {
      console.error("Erro ao criar veículo:", error);
      alert("Erro ao criar veículo.");
    }
  };

  // Paginação - calcular os itens da página atual
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentVehicles = vehicles.slice(startIndex, endIndex);

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Formulário */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Placa</label>
            <input
              type="text"
              name="plate"
              value={formData.plate}
              onChange={handleInputChange}
              placeholder="Ex: ABC1234"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Modelo</label>
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleInputChange}
              placeholder="Ex: Gol"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Tipo</label>
            <input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              placeholder="Ex: Carro"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Capacidade</label>
            <input
              type="text"
              name="capacity"
              value={formData.capacity}
              onChange={handleInputChange}
              placeholder="Ex: 5 pessoas"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Motorista</label>
            <select
              name="driver_id"
              value={formData.driver_id}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
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
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
            Criar Veículo
          </button>
        </div>
      </form>

      {/* Lista de veículos */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Veículos Cadastrados</h2>

        {/* Cards de veículos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentVehicles.map((vehicle) => {
            const driver = drivers.find((d) => d.id === vehicle.driver_id);

            return (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                driver={driver || { first_name: "Não encontrado", last_name: "" }} // Evita erro caso o motorista não seja encontrado
              />
            );
          })}
        </div>

        {/*  Paginação  */}
        <div className="mt-6 flex justify-center space-x-4">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md text-white ${currentPage === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
          >
            Anterior
          </button>
          <span className="px-4 py-2 bg-gray-200 rounded-md">Página {currentPage}</span>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={endIndex >= vehicles.length}
            className={`px-4 py-2 rounded-md text-white ${endIndex >= vehicles.length ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
          >
            Próximo
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormVeiculo;
