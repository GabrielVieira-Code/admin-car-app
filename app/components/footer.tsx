'use client'
import Link from 'next/link';
import { FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa'; // Importa ícones do Font Awesome

export default function Footer() {
  return (
    <footer className="bg-black text-white py-4">
      <div className="container mx-auto flex flex-col items-center">
        {/* Título e Texto */}
        
        
        {/* Links dos ícones */}
        <div className="flex space-x-4">
          <Link href="https://github.com/GabrielVieira-Code" target="_blank" rel="noopener noreferrer">
            <FaGithub className="text-2xl hover:text-gray-400" />
          </Link>
          <Link href="https://www.linkedin.com/in/gabrielvieirasantos/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="text-2xl hover:text-gray-400" />
          </Link>
        </div>
      </div>
    </footer>
  );
}