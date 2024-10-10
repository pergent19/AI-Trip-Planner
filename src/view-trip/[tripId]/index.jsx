import { toast } from '@/hooks/use-toast';
import { db } from '@/service/fireBaseConfig';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { doc, getDoc } from "firebase/firestore";
import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotels';
import PlacesToVisit from '../components/PlacesToVisit';
import Footer from '../components/Footer';

function ViewTrip() {
    const {tripId} = useParams();
    const [trip, setTrip] = useState([]);

    useEffect(() => {
        tripId&& GetTripData();
    }, [tripId])

    const GetTripData = async () => {
        const docRef = doc(db, 'AITrips', tripId);
        const docSnap = await getDoc(docRef);

        if(docSnap.exists()) {
            setTrip(docSnap.data());
            //console.log('Document: ', docSnap.data());
        } else {
            //console.log("No such document");
            toast({
                variant: "destructive",
                title: "No Trip found",
                description: "No such document.",
              });
        }
    }

  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
        {/* Information Section */}
        <InfoSection trip={trip} />
        {/* Recommended Hotel */}
        <Hotels trip={trip} />
        {/* Daily Plan */}
        <PlacesToVisit trip={trip} />
        {/* Footer */}
        <Footer/>
    </div>
  )
}

export default ViewTrip