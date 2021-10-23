const API_KEY = "YOUR_GOOGLE_API_KEY";
const axios = require("axios");

async function getCoordsForAddress(address) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${API_KEY}
    `;

  const response = await axios.get(url);
  const data = response.data;

  if (!data || data.status === "ZERO_RESULTS") {
    const error = new HttpError("Could not find the location", 422);
    throw error;
  }
  if (data.status === "REQUEST_DENIED") {
    const error = new HttpError("REQUEST_DENIED" + data.error_message, 422);
    throw error;
  }

  const coordinates = data.results[0].geometry.location;
  return coordinates;
}

// Custom Error Handler
class HttpError extends Error {
  constructor(message, errorCode) {
    super(message); //Add a 'message' property super class-Error
    this.code = errorCode; //Adds a "code" property
  }
}

// module.exports = getCoordsForAddress;
// module.exports = HttpError;

// Contributed by - Yasas Sandeepa
// Undergraduate- University of Moratuwa
// Sri Lanka