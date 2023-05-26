
var endpoint = "http://localhost:3000";
var front_endpoint = "http://localhost:3001";
var env = process.env.NODE_ENV;
switch (env) {
  case 'production':
    endpoint = "https://chitchat-ai-backend.onrender.com";
    front_endpoint = "https://chitchat-ai-mm27.onrender.com";
    break;
  case 'development':
    endpoint = "https://chitchat-ai-backend-dev.onrender.com";
    front_endpoint = "https://chitchat-ai-dev.onrender.com";
    break;
}
if (env) {
  if (env === 'production') {
    console.log('Prod server is running');
  } else if (env === 'development') {
    console.log('Dev server is running');
  }
} else {
  console.log('Localhost is running');
}

export const ENDPOINT = endpoint;
export const FRONT_ENDPOINT = front_endpoint;
