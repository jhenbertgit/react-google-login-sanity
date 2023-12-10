import { createClient } from "@sanity/client";
import urlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJ_ID,
  dataset: "production",
  apiVersion: "2023-05-03",
  useCdn: true,
  token: import.meta.env.VITE_SANITY_TOKEN,
  ignoreBrowserTokenWarning: true,
});

const builder = urlBuilder(client);

export const urlFor = (source: any) => builder.image(source);
