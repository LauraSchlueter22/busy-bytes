import { useState } from "react";

export default function CuisinePicker() {
  const [selectedCuisine, setSelectedCuisine] = useState(null);

  const cuisineChoices = [
    "Italian",
    "American",
    "Chinese",
    "Carribean",
    "Mediterrean",
    "African",
    "Mexican",
    "Thai",
    "Japanese",
  ];

  return (
  <>{cuisineChoices.map((cuisine) => {return(cuisine)})}</>;
  <ul>
    <li>
      Take a second and look around!
    </li>
  </ul>
  ) 
}

// here we will be the functionality
