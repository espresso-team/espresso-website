const onServer: boolean = process.env.ON_SERVER === 'true';

if (!onServer) {
  // Your code when ON_SERVER is false
  console.log('Localhost is running');
} else {
  // Your code when ON_SERVER is true
  console.log('Server is running');
}

export const ENDPOINT = onServer ? "https://chitchat-ai-backend.onrender.com" : "http://localhost:3000";
