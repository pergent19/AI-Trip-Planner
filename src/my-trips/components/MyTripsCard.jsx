import { useState, useEffect } from "react";
import { GetPlaceDetails } from "@/service/GlobalAP";
import { Link } from "react-router-dom";
import { BiDotsVerticalRounded } from "react-icons/bi"; // Icon for three-dot menu
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/service/fireBaseConfig";
import { toast } from '@/hooks/use-toast';


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

  const handleDelete = async  (e) => {
    // Reference to the document you want to delete
    const docRef = doc(db, "AITrips", trip.id);

    try {
      // Delete the document
      await deleteDoc(docRef);
      toast({
        description: "Trip successfully deleted.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error removing document:",
        description: error,
      });
    }
  };

  return (
    <div className="relative">
      {/* Three-dot menu outside the Link */}
      <div className="absolute top-2 right-4 z-10">
        <Popover>
          <PopoverTrigger>
            <BiDotsVerticalRounded />
          </PopoverTrigger>
          <PopoverContent
            style={{
              width: "100px", // Set the height
            }}
          >
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <h2 className="cursor-pointer">Delete</h2>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure you want to delete this trip?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your trip.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </PopoverContent>
        </Popover>
      </div>

      {/* The card content wrapped in the Link */}
      <Link
        to={`/view-trip/${trip.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <img
          src={photoUrl ? photoUrl : "/placeholder1.jpeg"}
          alt="Trip"
          className="object-cover rounded-xl h-[250px]"
        />
        <div>
          <h2 className="font-bold text-lg">
            {trip?.userSelection?.location?.label}
          </h2>
          <h2 className="text-sm text-gray-500">
            {trip?.userSelection?.noOfDays} Days trip with{" "}
            {trip?.userSelection?.budget} Budget
          </h2>
        </div>
      </Link>
    </div>
  );
}

export default MyTripsCard;
