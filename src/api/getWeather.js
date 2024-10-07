import apiKeys from "./apiKeys";

export const getWeather = async (lat, lon) => {
    const api_call = await fetch(
      `${apiKeys.base}/TOP/${lat},${lon}/forecast`
    );
    const data = await api_call.json();
    return data;
  };