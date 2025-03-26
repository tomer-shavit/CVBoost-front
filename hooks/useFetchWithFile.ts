import { useState, useEffect } from "react";
import axios from "axios";
import { BoostResponse } from "../types/apiCalls";
import { MixpanelFront } from "@/services/mixpanelFront";
import { MonitoringErrorTypes } from "@/types/monitoring/errors";

type ApiError = {
  message: string;
  details?: string;
  code?: string;
};

type UseApiResult = {
  data: BoostResponse | null;
  isLoading: boolean;
  error: ApiError | null;
};

type UseApiHook = (
  file?: File,
  fileName?: string,
  userId?: string,
) => UseApiResult;

// Helper function to convert File to base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // The result will be in format "data:application/pdf;base64,ACTUAL_BASE64"
      // We split by the comma and take the second part to get just the base64 string
      const base64String = reader.result as string;
      const base64Content = base64String.split(",")[1];
      resolve(base64Content);
    };
    reader.onerror = (error) => {
      reject(error);
    };
  });
};

const useApi: UseApiHook = (file, fileName, userId) => {
  const [data, setData] = useState<BoostResponse | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ApiError | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        if (file && userId) {
          // Convert file to base64
          try {
            const base64Data = await fileToBase64(file);

            // Create a JSON payload as expected by our API proxy
            const payload = {
              resume: base64Data,
              userId: userId,
            };

            // Use local API proxy instead of calling Lambda directly
            const response = await axios.post("/api/boost", payload);

            setData(response.data);
          } catch (conversionError) {
            throw conversionError;
          }
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          setError({
            message:
              error.response.data.error ||
              error.response.data.message ||
              "An error occurred",
            details: error.response.data.details,
            code: error.response.data.code,
          });
        } else {
          setError({ message: "An unknown error occurred" });
        }

        MixpanelFront.getInstance().track(
          MonitoringErrorTypes.BOOST_RESUME_ERROR,
          { error: error },
        );
      } finally {
        setLoading(false);
      }
    };

    if (file != undefined) {
      fetchData();
    }
  }, [file, fileName, userId]);

  return { data, isLoading, error };
};

export default useApi;
