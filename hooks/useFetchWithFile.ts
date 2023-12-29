import { useState, useEffect } from "react";
import axios from "axios";
import { BoostResponse } from "../types/apiCalls";
import { MixpanelFront } from "@/services/mixpanelFront";
import { MontioringErrorTypes } from "@/types/monitoring/errors";

type ApiError = {
  message: string;
};

type UseApiResult = {
  data: BoostResponse | null;
  isLoading: boolean;
  error: ApiError | null;
};

type UseApiHook = (
  url: string,
  file?: File,
  fileName?: string,
  userId?: string,
) => UseApiResult;

const useApi: UseApiHook = (url, file, fileName, userId) => {
  const [data, setData] = useState<BoostResponse | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ApiError | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const formData = new FormData();
        if (file) {
          formData.append(fileName ? fileName : "default_name", file);
        }
        if (userId) {
          formData.append("userId", userId);
        }
        const response = await axios.post(url, formData);
        setData(response.data);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          setError({ message: error.response.data.message });
        } else {
          setError({ message: "An unknown error occurred" });
        }
        MixpanelFront.getInstance().track(
          MontioringErrorTypes.BOOST_RESUME_ERROR,
          { error: error },
        );
      } finally {
        setLoading(false);
      }
    };
    if (file != undefined) {
      fetchData();
    }
  }, [url, file, fileName, userId]);

  return { data, isLoading, error };
};

export default useApi;
