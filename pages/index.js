import Image from "next/image";
import fridgeIcon from "../asset/fridge.svg";

export default function Home() {
  return (
    <div className="container">
      <header className="flex justify-center text-5xl p-5">
        <img src={fridgeIcon.src} alt="frigostock icon" className="sm:w-16 sm:h-16"/>
      Frigostock
      </header>
      <main className="flex justify-center">
        
      </main>
    </div>
  )
}
