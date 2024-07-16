"use client";

import React, { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet.heat";
import { get, getDatabase, ref } from "firebase/database";
import { app } from "@/config/FirebaseConfig";

export default function MapComponent() {
  const mapRef = useRef(null);
  const origin = [11.322670519283392, 75.9365477879981];

  const db = getDatabase(app);
  const [latLongPoints, setLatLongPoints] = useState([
    [11.32261876002703, 75.93654139343259, 0.1],
  ]);

  const getLatLong = () => {
    const dbRef = ref(db, "/data");
    get(dbRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          var data = snapshot.val();
          console.log("latLongPoints: ", data);
          setLatLongPoints(data); // No idea why this usestate was not working
        } else {
          console.log("No data available");
        }
        console.log("useeffect", latLongPoints);
        if (!mapRef.current) {
          mapRef.current = L.map("map", {
            center: [11.322670519283392, 75.9365477879981],
            crs: L.CRS.EPSG3857,
            zoom: 12,
            zoomControl: true,
            preferCanvas: false,
          });

          // L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          //   attribution:
          //     '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          // }).addTo(mapRef.current);

          var tile_layer = L.tileLayer(
            "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
            {
              attribution:
                '\u0026copy; \u003ca href="https://www.openstreetmap.org/copyright"\u003eOpenStreetMap\u003c/a\u003e contributors',
              detectRetina: false,
              maxNativeZoom: 19,
              maxZoom: 19,
              minZoom: 0,
              noWrap: false,
              opacity: 1,
              subdomains: "abc",
              tms: false,
            }
          );

          tile_layer.addTo(mapRef.current);

          // L.heatLayer(points).addTo(mapRef.current);
          // console.log("latLongPoints before heatmap:", latLongPoints);
          var heat_map = L.heatLayer(data, {
            blur: 15,
            maxZoom: 18,
            minOpacity: 0.5,
            radius: 25,
          }).addTo(mapRef.current);

          heat_map.addTo(mapRef.current);

          // Add custom control to go back to origin
          L.Control.GoToOrigin = L.Control.extend({
            onAdd: function (map) {
              const button = L.DomUtil.create("button", "leaflet-bar");
              button.innerHTML = "Go to Origin";
              button.style.backgroundColor = "white";
              button.style.width = "100px";
              button.style.height = "30px";
              button.style.cursor = "pointer";

              L.DomEvent.on(button, "click", function () {
                map.setView(origin, 12);
              });

              return button;
            },

            onRemove: function (map) {
              // Nothing to do here
            },
          });

          L.control.goToOrigin = function (opts) {
            return new L.Control.GoToOrigin(opts);
          };

          L.control.goToOrigin({ position: "topright" }).addTo(mapRef.current);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // useEffect(() => {
  //   getLatLong();
  //   console.log("useeffect",latLongPoints)
  // }, []);

  useEffect(() => {
    getLatLong();
  }, []);

  return (
    <div className="w-full md:h-screen p-3 md:p-16">
      <div className="bg-black rounded-2xl pr-1 pb-2 shadow-lg">
        <div
          id="map"
          className="w-full h-[60vh] md:h-[90vh] border border-gray-400 rounded-lg shadow-lg"
        ></div>
      </div>
    </div>
  );
}
