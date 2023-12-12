"use client";
import { useEffect } from "react";

const BoostIdPage = () => {
  useEffect(() => {
    // Retrieve the data from session storage and log it
    const storedData = sessionStorage.getItem("boostData");
    if (storedData) {
      const boostData = JSON.parse(storedData);
      console.log("Data from session storage:", boostData);
    } else {
      console.log("No data found in session storage.");
    }
    sessionStorage.removeItem("boostData");
  }, []);

  return (
    <div>
      <h1>Analysis page</h1>
      {/* Render your content using boostId or boostData */}
    </div>
  );
};

export default BoostIdPage;
