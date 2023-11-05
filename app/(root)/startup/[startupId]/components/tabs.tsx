"use client";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContactIcon, Map, Paperclip, X, XOctagon } from "lucide-react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Contact, Startup, StartupAttachments } from "@prisma/client";
import ContactCard from "./contact-card";
import { ReactNode } from "react";
import FilePdfIcon from "@/components/svgs/file-pdf-icon";
import AddAttachmentForm from "./attachments-section/attachment-form";
import Link from "next/link";
import AttachmentSection from "./attachments-section/attachment-section";

interface Props {
  data: {
    startup: Startup & { attachments: StartupAttachments[] };
    contacts: Contact[];
  };
}

export function TabsSection({ data }: Props) {
  L.Icon.Default.imagePath = "../images/";
  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="account">
          <ContactIcon className="mr-2 h-6 w-6" /> Contacts
        </TabsTrigger>
        <TabsTrigger value="maps">
          <Map className="mr-2 h-6 w-6" /> Maps
        </TabsTrigger>
        <TabsTrigger value="attachments">
          <Paperclip className="mr-2 h-5 w-5" /> Pièces jointes
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="mt-3 space-y-4">
        {data.contacts.length !== 0 ? (
          data.contacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))
        ) : (
          <NoDataAvailable className="mt-10 flex justify-center text-red-500">
            <XOctagon className="mr-4 " />
            Pas de contact enregistré pour la startup
          </NoDataAvailable>
        )}
      </TabsContent>
      <TabsContent value="maps">
        <div className="h-[40rem] w-full">
          {data.startup.lattitude !== null &&
          data.startup.longitude !== null ? (
            <MapContainer
              className="h-[40rem] w-full"
              center={[
                Number(data.startup.lattitude),
                Number(data.startup.longitude),
              ]}
              zoom={13}
              scrollWheelZoom={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker
                position={[
                  Number(data.startup.lattitude),
                  Number(data.startup.longitude),
                ]}
              >
                <Popup>
                  <p className="font-bold">{data.startup.name}</p>
                  <span>
                    {data.startup.address}, {data.startup.city}
                  </span>
                </Popup>
              </Marker>
            </MapContainer>
          ) : (
            <NoDataAvailable className="mt-10 flex justify-center text-red-500">
              <XOctagon className="mr-4 " />
              Veuillez renseigner une adresse postale valide à la startup
            </NoDataAvailable>
          )}
        </div>
      </TabsContent>
      <TabsContent value="attachments">
        <AttachmentSection
          startupId={data.startup.id}
          attachments={data.startup.attachments}
        />
      </TabsContent>
    </Tabs>
  );
}

const NoDataAvailable = ({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) => {
  return <div className={className}>{children}</div>;
};
