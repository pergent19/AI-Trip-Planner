import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/service/fireBaseConfig";
import MyTripsCard from "./components/MyTripsCard";

function MyTrips() {
  const [trips, setTrips] = useState([]);
  const navigate = useNavigate(); // Corrected naming from 'navigation' to 'navigate'

  useEffect(() => {
    GetUserTrips();
  }, []);

  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigate("/"); // Use navigate instead of navigation
      return;
    }

    const q = query(
      collection(db, "AITrips"),
      where("userEmail", "==", user?.email)
    );

    const querySnapshot = await getDocs(q);
    
    // Use a temporary array to collect the trips
    const userTrips = [];
    querySnapshot.forEach((doc) => {
      userTrips.push(doc.data()); // Collect trip data in the temporary array
    });

    // Set the trips state once after the loop
    setTrips(userTrips);
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-100 px-5 mt-10">
      <h2 className="font-bold text-3xl">My Trips</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-10">
        {trips?.length > 0 ?  trips.map((trip, index) => {
          return <MyTripsCard key={index} trip={trip} />; // Ensure to add key prop
        }) : [1,2,3,4,5,6].map((item, index) => (
            <div key={index} className="h-[250px] w-full bg-slate-200 animate-pulse rounded-xl">

            </div>
        ))}
      </div>
    </div>
  );
}

export default MyTrips;
