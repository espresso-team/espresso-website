
var endpoint = "http://localhost:3000";
var front_endpoint = "http://localhost:3001";
var env = process.env.NODE_ENV;
console.log("Node env is " + env);
switch (env) {
  case 'production':
    endpoint = "https://chitchat-ai-backend.onrender.com";
    front_endpoint = "https://chitchat-ai-mm27.onrender.com";
    break;
  // build on dev server
  case 'test':
    endpoint = "https://chitchat-ai-backend-dev.onrender.com";
    front_endpoint = "https://chitchat-ai-dev.onrender.com";
    break;
}
if (env === 'production') {
  console.log('Prod server is running');
} else if (env === 'test') {
  console.log('Dev server is running');
} else {
  console.log('Localhost is running');
}

console.log("endpoint is " + endpoint);
export const ENDPOINT = endpoint;
export const FRONT_ENDPOINT = front_endpoint;
