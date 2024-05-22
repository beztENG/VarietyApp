import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const client = createClient({
  projectId: 'yp9qae3p', 
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-05-10',
  token: 'skJJFquZIPfejb7ZQAZcukannyD5V5BVR28RFsuBHFgbgJvU7bVnK5Gi3nk6pxXqM9s3tKWaRxBhrKrFesijSeThbBcsoTCFTfRIs7PWQrzz3Unti30mC6ZHrGor99wrz6SJA5jMJUoNX96l3Zi2LNweNHH5RvykW6XWst4W2pKKodyEOCCG'  // Ensure to include the token if you need to perform write operations
})

const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);


export default client;
