//import React, { useContext } from "react";
import Hero from "../components/Hero";
import Biography from "../components/Biography";
import MessageForm from "../components/MessageForm";
import Departments from "../components/Departments";

const Home = () => {
  return (
    <>
      <Hero
        title={
          "Welcome to ToothCare Medical Institute | Your Trusted Healthcare Provider"
        }
        imageUrl={"/public/Doctor-pana.svg"}
      />
      <Biography imageUrl={"/public/Mobile Marketing-rafiki.svg"} />
      <Departments />
      <MessageForm />
    </>
  );
};

export default Home;
