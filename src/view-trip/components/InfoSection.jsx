import React, { useEffect, useState } from 'react';
import { IoIosSend } from "react-icons/io";
import { Button } from '@/components/ui/button';
import { GetPlaceDetails } from '@/service/GlobalAP';

const PHOTO_REF_URL = `https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key=${import.meta.env.VITE_GOOGLE_PLACE_API_KEY}`;

function InfoSection({ trip }) {
  const [photoUrl, setPhotoUrl] = useState('');

  useEffect(() => {
    if (trip?.userSelection?.location?.label) {
      GetPlacePhoto(trip.userSelection.location.label);
    }
  }, [trip]);

  const GetPlacePhoto = async (locationLabel) => {
    try {
      const { data } = await GetPlaceDetails({ textQuery: locationLabel });

      const photoName = data.places?.[0]?.photos?.[5]?.name;
      if (photoName) {
        const photoURL = PHOTO_REF_URL.replace('{NAME}', photoName);
        setPhotoUrl(photoURL);
      }
    } catch (error) {
      console.error("Error fetching place photo:", error);
    }
  };

  if (!trip || !trip.userSelection) return null;

  const { location, noOfDays, budget, traveler } = trip.userSelection;

  return (
    <div>
      <img src={photoUrl ? photoUrl : '/placeholder1.jpeg'} alt="Location" className="h-[340px] w-full object-cover rounded-xl" />

      <div className="flex flex-col md:flex-row justify-between gap-5 items-center my-5">
        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-center md:text-left text-2xl">{location?.label}</h2>
          <div className="flex flex-col md:flex-row gap-2 md:gap-5">
            <InfoTag icon="📅" label={`${noOfDays} days`} />
            <InfoTag icon="💰" label={`${budget} budget`} />
            <InfoTag icon="🥂" label={`No. Of Travelers: ${traveler}`} />
          </div>
        </div>
        <Button>
          <IoIosSend /> Share
        </Button>
      </div>
    </div>
  );
}

const InfoTag = ({ icon, label }) => (
  <h2 className="p-1 px-3 text-center bg-gray-200 rounded-full text-gray-500 text-xs md:text-lg">
    {icon} {label}
  </h2>
);

export default InfoSection;
