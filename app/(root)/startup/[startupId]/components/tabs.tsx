"use client";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContactIcon, Map } from "lucide-react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Contact } from "@prisma/client";
import ContactCard from "./contact-card";

interface Props {
  data: {
    contacts: Contact[];
  };
}

export function TabsSection({ data }: Props) {
  L.Icon.Default.imagePath = "../images/";
  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">
          <ContactIcon className="mr-2 h-6 w-6" /> Contacts
        </TabsTrigger>
        <TabsTrigger value="maps">
          <Map className="mr-2 h-6 w-6" /> Maps
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="mt-3">
        {data.contacts.map((contact) => (
          <ContactCard contact={contact} />
        ))}
      </TabsContent>
      <TabsContent value="maps">
        <div className="h-[40rem] w-full">
          <MapContainer
            className="h-[40rem] w-full"
            center={[46.60376739874414, 0.3586191112349918]}
            zoom={13}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[46.60376739874414, 0.3586191112349918]}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </TabsContent>
    </Tabs>
  );
}
