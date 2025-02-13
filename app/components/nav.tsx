'use client';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-white text-xl font-bold">
          <Link href="/">
            <Image 
              src="/imagens/logoteste.png" 
              alt="Logo" 
              width={80} // Ajuste a largura para corresponder ao tamanho do texto original
              height={30} // Altura ajustada para o navbar
              style={{ height: 'auto', width: 'auto', maxHeight: '100%', maxWidth: '100%' }}
            />
          </Link>
        </div>

        {/* Links */}
        <div className="flex space-x-4">
  <Link href="/" className="text-white font-semibold hover:text-gray-300">Home</Link>
  <Link href="/pages/cases" className="text-white font-semibold hover:text-gray-300">Soluções</Link>
  <Link href="/pages/contact" className="text-white font-semibold hover:text-gray-300">Contato</Link>
</div>
      </div>
    </nav>
  );
}