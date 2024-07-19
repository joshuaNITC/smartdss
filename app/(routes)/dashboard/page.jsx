"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../../_components/Navbar";
import Footer from "@/app/_components/Footer";
import ShareFeedback from "./_components/ShareFeedback";
import DisclaimerQuote from "./_components/DisclaimerQuote";
import Procedure from "./_components/ProcedureComponent";
// import MapComponent from "./_components/MapComponent";
import AlertBox from "./_components/AlertBox";
import ScrollingAlert from "./_components/ScrollingAlert";
import { app } from "@/config/FirebaseConfig";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useRouter } from "next/navigation";
import Loading from "@/app/_components/Loading";
import dynamic from "next/dynamic";
import Role from "./_components/Role";
import LocationCards from "./_components/LocationCards";
import EsclateBox from "./_components/EsclateBox";

const MapComponent = dynamic(() => import("./_components/MapComponent"), {
  ssr: false,
});

const page = () => {
  const db = getFirestore(app);
  const { user } = useKindeBrowserClient();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stage, setStage] = useState(3);

  const getStage = async () => {
    const docRef = doc(db, "stage", "stage");
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        // does user exist or not
        console.log("stage data:", docSnap.data());
        setStage(docSnap.data()?.stage);
      } else {
        console.log("No such stage!");
      }
    } catch (error) {
      console.log("No such stage!");
    }
  };

  useEffect(() => {
    getStage();
  }, []);

  useEffect(() => {
    user && isUserRegistered();
  }, [user]);

  const isUserRegistered = async () => {
    const docRef = doc(db, "UserDetails", user.email); //business-collection name, "SF"-name of the document
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        // does user exist or not
        console.log("Document data:", docSnap.data());
        setLoading(false);
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
        router.replace("/user-details");
        setLoading(false);
      }
    } catch (error) {
      console.log("No such document!");
      router.replace("/user-details");
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <Navbar />
      <div>
        <div className="flex flex-col md:flex-row justify-center p-[4%]">
          <MapComponent />
          <LocationCards />
        </div>
        <ScrollingAlert />
        {/* Hi {name}, your mobile number {phone} is fetched directly from firebase */}
        <div className="p-4 md:p-20 bg-[#F0F0F0] rounded-t-3xl">
          {/* <div className="justify-between lg:flex"> */}
          <div className="flex justify-center pb-10">
            <AlertBox stage={stage} />
          </div>
          <div className="grid md:grid-cols-3 grid-cols-1 gap-5 md:gap-0">
            <EsclateBox/>
            <Role stage={stage} />
            <Procedure />
          </div>
        </div>
      </div>
      <div className="py-10 flex justify-center">
        <ShareFeedback />
      </div>
      <DisclaimerQuote />
      <Footer />
    </div>
  );
};

export default page;
