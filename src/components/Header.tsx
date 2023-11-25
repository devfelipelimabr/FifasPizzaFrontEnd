import { useContext } from "react";
import Link from "next/link";
import logoImg from "../../public/logo.png";
import Image from "next/image";
import { FiLogOut } from "react-icons/fi";
import { AuthContex } from "@/contexts/AuthContext";

export function Header() {
  const { signOut } = useContext(AuthContex);
  
  return (
    <header className="headerContainer">
      <div className="headerContent">
        <Link href="/dashboard">
          <Image
            src={logoImg}
            alt="Logo fifas pizzaria"
            priority={true}
            width={190}
          />
        </Link>
        
        <nav>
          <Link href="/category">
            <p>Categoria</p>
          </Link>

          <Link href="/product">
            <p>Cardápio</p>
          </Link>

          <button onClick={signOut}>
            <FiLogOut size={24} />
          </button>
        </nav>
      </div>
    </header>
  );
}
