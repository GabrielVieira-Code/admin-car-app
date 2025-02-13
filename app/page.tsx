import Image from "next/image";
import  Footer  from "./components/footer";
import  Nav  from "./components/nav";
import  FormVeiculo  from "./components/FormVeiculo";




export default function Home() {
  return (
    <>
    <Nav></Nav>
    <FormVeiculo></FormVeiculo>
    <Footer></Footer>
    </>
  );
}
