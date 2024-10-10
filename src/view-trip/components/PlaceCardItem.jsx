import React from "react";
import { Button } from "@/components/ui/button";
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { GetPlaceDetails } from "@/service/GlobalAP";

const PHOTO_REF_URL = `https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key=${
  import.meta.env.VITE_GOOGLE_PLACE_API_KEY
}`;
function PlaceCardItem({ item }) {
  const [photoUrl, setPhotoUrl] = useState("");
  useEffect(() => {
    if (item?.placeName) {
      GetPlacePhoto(item?.placeName);
    }
  }, [item]);

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
    <div className="border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all cursor-pointer hover:shadow-md">
      <Link
        to={`https://www.google.com/maps/search/?api=1&query=${item?.placeName}`}
        target="_blank"
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <img
          src={photoUrl ? photoUrl : '/placeholder1.jpeg'}
          className="w-[130px] h-[130px] rounded-xl object-cover"
        />
        <div>
          <h2 className="text-lg font-bold">{item.placeName}</h2>
          <p className="text-sm text-gray-500">{item.placeDetails}</p>
          <h2 className="mt-2">🕖 {item.timeTravel}</h2>
          {/* <Button size="sm">
            <FaMapLocationDot />
          </Button> */}
        </div>
      </Link>
    </div>
  );
}

export default PlaceCardItem;
