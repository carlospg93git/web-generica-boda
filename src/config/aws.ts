export const awsConfig = {
  region: import.meta.env.VITE_AWS_REGION || '',
  bucketName: import.meta.env.VITE_AWS_BUCKET_NAME || '',
  accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID || '',
  secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY || '',
};