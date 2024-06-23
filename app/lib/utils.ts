const axios = require("axios");
const GOOGLE_API_KEY = "AIzaSyAK01h9k7fI3BflEgwN169OX6oWptyqSc0";

export const formatCurrency = (amount: number) => {
  return (amount / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

export const formatSQLTimeForInput = (sqlTimestamp: string) => {
  const date = new Date(sqlTimestamp);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export const formatTimeForDisplay = (timestamp: string) => {
  return timestamp
    .split(/:\d{2} G/)[0]
    .substring(4)
    .replace(/2024/, "24");
};

export const formatDateToLocal = (
  dateStr: string,
  locale: string = "en-US"
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};

export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) => {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
};

export const findNearestCarpoolLocations = (
  userLocation: { lat: number; lon: number },
  carpoolLocations: { lat: number; lon: number }[]
) => {
  const sortedLocations = carpoolLocations.sort((loc1, loc2) => {
    const distance1 = calculateDistance(
      userLocation.lat,
      userLocation.lon,
      loc1.lat,
      loc1.lon
    );
    const distance2 = calculateDistance(
      userLocation.lat,
      userLocation.lon,
      loc2.lat,
      loc2.lon
    );
    return distance1 - distance2;
  });
  return sortedLocations;
};

export const calculateEstimatedTravelTime = (
  distance: number,
  averageSpeed: number
) => {
  const hours = distance / averageSpeed;
  const minutes = hours * 60;
  return minutes;
};

export async function geocodeAddress(address: string) {
  // Check if the address is provided and not empty
  if (!address || address.trim() === "") {
    return null;
  }

  try {
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/geocode/json",
      {
        params: {
          address: address,
          key: GOOGLE_API_KEY,
        },
      }
    );

    if (response.data.status === "OK") {
      const location = response.data.results[0].geometry.location;
      return {
        latitude: location.lat,
        longitude: location.lng,
      };
    } else {
      // Handle the case where the address is not found or API limits are exceeded
      console.error("Geocoding failed: " + response.data.status);
      return null;
    }
  } catch (error) {
    // Handle network errors
    console.error("Error during geocoding: ", error);
    return null;
  }
}

export async function reverseGeocode(latitude: number, longitude: number) {
  if (isNaN(latitude) || isNaN(longitude)) {
    console.error(
      "Invalid latitude or longitude extracted from POINT:",
      latitude,
      longitude
    );
    return null;
  }

  try {
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/geocode/json",
      {
        params: {
          latlng: `${latitude},${longitude}`,
          key: GOOGLE_API_KEY,
        },
      }
    );

    if (response.data.status === "OK") {
      return response.data.results[0].formatted_address
        .replace(/,?\s*\d+$/, "")
        .replace(/#/, "")
        .replace(/,? Singapore/, "")
        .replace(/\d+ \d+-\d+\s*,/, "")
        .replace(/\d+-\d+/, "")
        .replace(/,? Singapore/, "");
    } else {
      console.error("Reverse Geocoding failed:", response.data.status);
      return "Address Not Found";
    }
  } catch (error) {
    console.error("Error during reverse geocoding:", error);
    return null;
  }
}
