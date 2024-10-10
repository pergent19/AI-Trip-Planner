import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { GetPlaceDetails } from "@/service/GlobalAP";

const PHOTO_REF_URL = `https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key=${import.meta.env.VITE_GOOGLE_PLACE_API_KEY}`;
function HotelCardItem({ hotel }) {
  const [photoUrl, setPhotoUrl] = useState("");
  useEffect(() => {
    if (hotel?.hotelName) {
      GetPlacePhoto(hotel?.hotelName);
    }
  }, [hotel]);

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
      to={`https://www.google.com/maps/search/?api=1&query=${hotel?.hotelName}, ${hotel?.hotelAddress}`}
      target="_blank"
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <div className="hover:scale-105 transition-all cursor-pointer">
        <img src={photoUrl ? photoUrl : '/placeholder1.jpeg'} className="rounded-xl h-[180px] w-full object-cover " />
        <div className="my-3 flex flex-col gap-2">
          <h2 className="font-medium">{hotel?.hotelName}</h2>
          <h2 className="text-xs text-gray-500">📍 {hotel?.hotelAddress}</h2>
          <h2 className="text-sm">💰 {hotel?.price}</h2>
          <h2 className="text-sm">⭐ {hotel?.rating} stars</h2>
        </div>
      </div>
    </Link>
  );
}

export default HotelCardItem;
