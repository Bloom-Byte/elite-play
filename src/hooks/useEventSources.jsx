import { useEffect, useState } from "react";
import { ACCESS_TOKEN } from "../utils/constants";

export function useEventSource({
  url,
  isAuthRequired = false
}) {
  const [data, setData] = useState([]);

  useEffect(() => {
    let urlNew = url;
    if (isAuthRequired) {
      const accessToken = localStorage.getItem(ACCESS_TOKEN);
      if (!accessToken) {
        console.error('Access token is required for this event source');
        return;
      }
      urlNew = `${url}?access_token=${accessToken}`;
    }
    const eventSource = new EventSource(`${import.meta.env.VITE_BASE_API_URL}${urlNew}`);

    eventSource.onopen = () => {
      console.log(`Connection established for ${url}`);
    };

    eventSource.onerror = (error) => {
      console.error(`Error with EventSource ${url}:`, error);
      eventSource.close();
    };

    eventSource.onmessage = (event) => {
      try {
        console.log(`Event data from ${url}:`, data)
        if (event.data?.message) return;
        const data = JSON.parse(event.data);
        setData(prev => [data, ...prev]);
      } catch (error) {
        console.error('Error parsing message:', error)
      }
    }

    return () => {
      eventSource.close();
    };
  }, [url, isAuthRequired]);

  return data;
}