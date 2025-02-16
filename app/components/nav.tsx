import Link from 'next/link';
import { Car } from 'lucide-react'; 

export default function Navbar() {
  return (
    <nav className="bg-[#ED6E78] p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-white text-xl font-bold flex items-center gap-2">
          <Car size={28} />
          
        </div>

        <div className="flex space-x-4">
        </div>
      </div>
    </nav>
  );
}
