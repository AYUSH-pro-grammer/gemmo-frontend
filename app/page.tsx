import Image from "next/image";
import Navbar from "@/components/homepage/navbar/Navbar";
import Why from "@/components/homepage/why/Why";
import Hero from "@/components/homepage/hero/Hero";

export default function Home() {
  return (
   <div>

    <Navbar/>
    <Hero/>
    <Why/>
    
   </div>
  );
}
