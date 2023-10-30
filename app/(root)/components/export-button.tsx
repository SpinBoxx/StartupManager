"use client";

import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
import CsvDownloadButton from "react-json-to-csv";

interface Props {
  data: any;
  children: ReactNode;
}

const ExportButton = ({ data, children }: Props) => {
  return (
    <CsvDownloadButton
      data={data}
      title="Exporter les startups"
      className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
    >
      {children}
    </CsvDownloadButton>
  );
};

export default ExportButton;
