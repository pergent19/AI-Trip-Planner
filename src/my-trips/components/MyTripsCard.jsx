import { useState, useEffect } from "react";
import { GetPlaceDetails } from "@/service/GlobalAP";
import { Link } from "react-router-dom";

const PHOTO_REF_URL = `https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key=${
  import.meta.env.VITE_GOOGLE_PLACE_API_KEY
}`;

function MyTripsCard({ trip }) {
  const [photoUrl, setPhotoUrl] = useState("");
  useEffect(() => {
    if (trip?.userSelection?.location?.label) {
      GetPlacePhoto(trip?.userSelection?.location?.label);
    }
  }, [trip]);

  const GetPlacePhoto = async (locationLabel) => {
    try {
      const { data } = await GetPlaceDetails({ textQuery: locationLabel });
      const photoName = data.places?.[0]?.photos?.[2]?.name;
      if (photoName) {
        const photoURL = PHOTO_REF_URL.replace("{NAME}", photoName);
        setPhotoUrl(photoURL);
      }
    } catch (error) {
      console.error("Error fetching place photo:", error);
    }
  };

  return (
    <Link
      to={`/view-trip/${trip.id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className="hover:scale-105 transition-all">
        <img
          src={photoUrl ? photoUrl : "/placeholder1.jpeg"}
          alt="aw"
          className="object-cover rounded-xl h-[250px]"
        />

        <div>
          <h2 className="font-bold text-lg">
            {trip?.userSelection?.location?.label}
          </h2>
          <h2 className="text-sm text-gray-500">
            {" "}
            {trip?.userSelection?.noOfDays} Days trip with{" "}
            {trip?.userSelection?.budget} Budget
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default MyTripsCard;
