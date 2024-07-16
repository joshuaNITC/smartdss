"use client";

import Navbar from "@/app/_components/Navbar";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { app } from "@/config/FirebaseConfig";
import Loading from "@/app/_components/Loading";

const Profile = () => {
  const db = getFirestore(app);
  const { user } = useKindeBrowserClient();
  const [details, setDetails] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    user && getUserDetails();
  }, [user]);

  const getUserDetails = async () => {
    const docRef = doc(db, "UserDetails", user.email); //business-collection name, "SF"-name of the document
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setDetails(docSnap.data());
        setLoading(false);
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
        setLoading(false);
        router.replace("/create-business");
      }
    } catch (error) {
      console.log("No such document!");
      setLoading(false);
      router.replace("/create-business");
    }
  };

  if (loading) {
    return (
      <Loading/>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="p-2 w-full h-screen flex justify-center bg-gray-100">
        <div className="flex flex-col justify-center">
          <div class="bg-white max-w-2xl shadow overflow-hidden rounded-lg justify-center">
            <div class="px-4 py-5 sm:px-6">
              <div className="flex justify-center">
                <Image
                  src={user?.picture}
                  alt="logo"
                  width={100}
                  height={100}
                  className="rounded-full"
                />
              </div>
              <h3 class="text-lg leading-6 font-medium text-gray-900 flex justify-center py-2">
                {user?.given_name}
              </h3>
              <p class="mt-1 max-w-2xl text-sm text-gray-500 flex justify-center">
                {details?.designation}
              </p>
            </div>
            <div class="border-t border-gray-200">
              <dl>
                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">Full name</dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user?.given_name} {user?.family_name}
                  </dd>
                </div>
                <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">Designation</dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {details?.designation}
                  </dd>
                </div>
                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">
                    Email address
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user?.email}
                  </dd>
                </div>
                <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">On Alert</dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    No
                  </dd>
                </div>
                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">About</dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    To get social media testimonials like these, keep your
                    customers engaged with your social media accounts by posting
                    regularly yourself
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
