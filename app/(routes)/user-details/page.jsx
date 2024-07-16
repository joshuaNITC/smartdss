"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { app } from "@/config/FirebaseConfig";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { incharge } from "./incharge";

const UserDetails = () => {
  const db = getFirestore(app);
  const { user } = useKindeBrowserClient();
  const router = useRouter();

  const [designation, setDesignation] = useState("");
  //   const [age, setAge] = useState("");

  const handleChange = (event) => {
    setDesignation(event.target.value);
  };

  const submitUserDetails = async () => {
    console.log("btn clicked", designation);
    //Business-collection name, provide field
    await setDoc(doc(db, "UserDetails", user.email), {
      designation: designation,
      email: user.email,
      userName: user.given_name + " " + user.family_name,
    }).then((resp) => {
      console.log("Doc saved");
      toast("User Registered!");
      router.replace("/dashboard");
    });
  };

  return (
    // <div className="p-14 flex justify-center my-[70px]">
    //   <div className="flex flex-col items-center gap-5 max-w-3xl">
    <div
      className="h-screen pt-[5%]"
      style={{
        backgroundImage: "url('/background.svg')",
      }}
    >
      <div className="bg-white/90 rounded-2xl w-[90%] h-[90%] mx-auto p-[5%] ">
        {/* left */}
        <div className="flex flex-col justify-center items-center ">
          <div className="text-center items-center">
            <div className="flex justify-center">
              <div className="flex flex-col gap-5 max-w-3xl">
                <Image
                  src={"/GOI.svg"}
                  height={100}
                  width={100}
                  className="px-5 flex justify-center items-center mx-auto w-[200px] sm:w-[350px]"
                ></Image>
                <h2 className="font-bold text-2xl sm:text-4xl">
                  What's your designation?
                </h2>
                <p className="text-slate-500 text-sm sm:text-lg">
                  You can always change this later from settings
                </p>
                <div className="w-full flex justify-center">
                  <FormControl sx={{ m: 1, minWidth: 300 }}>
                    <InputLabel id="demo-simple-select-autowidth-label">
                      designation
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      value={designation}
                      onChange={handleChange}
                      autoWidth
                      label="designation"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {incharge.map((item) => (
                        <MenuItem value={item}>{item}</MenuItem>
                      ))}
                      {/* <MenuItem value={20}>Twenty</MenuItem> */}
                    </Select>
                  </FormControl>
                </div>
                <Button
                  className="w-full"
                  disabled={!designation}
                  onClick={submitUserDetails}
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
