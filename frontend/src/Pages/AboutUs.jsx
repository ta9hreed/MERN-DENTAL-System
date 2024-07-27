import React from "react";
import Hero from "../components/Hero";
import Biography from "../components/Biography";
const AboutUs = () => {
  return (
    <>
      <Hero
        title={"Learn More About Us | ToothCare Medical Institute"}
        imageUrl={"/About us page-pana.png"}
      />
      <Biography imageUrl={"/Connecting teams-rafiki.png"} />
    </>
  );
};
export default AboutUs;
