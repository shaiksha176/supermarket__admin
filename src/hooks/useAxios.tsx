import { useState, useEffect } from "react";
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

interface HookReturn {
  data: any | null;
  error: AxiosError<any> | null;
  isLoading: boolean;
  isError: boolean;
  fetchData: (data: any) => Promise<any>;
  // postData: (postData: any) => Promise<void>;
  // updateData: (updateData: any) => Promise<void>;
  // deleteData: (id: string) => Promise<void>;
}

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api",
});

const useAxios = (): HookReturn => {
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  //   useEffect(() => {
  //   const source = axios.CancelToken.source();

  // const fetchData = async () => {
  //   setLoading(true);
  //   try {
  //     const response: AxiosResponse<any> = await axios(url, {
  //       ...options,
  //     });
  //     setData(response.data);
  //   } catch (error: any) {
  //     if (!axios.isCancel(error)) {
  //       setError(error);
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const fetchData = async (props: any) => {
    try {
      console.log(props);
      const { data: apiResponse } = await axiosInstance(props);

      console.log(apiResponse);
      setData(apiResponse);
      return apiResponse;
    } catch (error: any) {
      console.log(error);
      setIsError(true);
      if (error.code === "ECONNABORTED") {
        setError("Server took too long to respond");
        return "Server took too long to respond";
      }
      if (error?.response?.status === 403) {
        setError("You do not have enough permissions to perform this action");
        return "You do not have enough permissions to perform this action";
      }
      if (error?.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setError("Something went wrong!");
        return "Something went wrong!";
      } else if (error.request) {
        // The request was made but no response was received
        setError("No response received from the server");
        return "No response received from the server";
      } else {
        // Something happened in setting up the request that triggered an Error
        setError("Error occurred while making the request");
        return "Error occured while making the request";
      }
    } finally {
      setIsLoading(false);
    }
  };

  //   fetchData();

  //   return () => {
  //     source.cancel("Component unmounted");
  //   };
  //   }, [url, options]);

  // const postData = async (postData: any, options: AxiosRequestConfig = {}) => {
  //   console.log(postData);
  //   console.log(options);
  //   try {
  //     setLoading(true);
  //     const response: AxiosResponse<any> = await axios.post(url, postData, {
  //       ...options,
  //     });
  //     setData(response.data);
  //   } catch (error: any) {
  //     setError(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const updateData = async (updateData: any) => {
  //   try {
  //     setLoading(true);
  //     const response: AxiosResponse<any> = await axios.put(url, updateData);
  //     setData(response.data);
  //   } catch (error: any) {
  //     setError(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const deleteData = async (id: string) => {
  //   try {
  //     setLoading(true);
  //     const response: AxiosResponse<any> = await axios.delete(`${url}/${id}`);
  //     setData(response.data);
  //   } catch (error: any) {
  //     setError(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // return { data, error, loading, postData, updateData, deleteData };

  return {
    data,
    error,
    isError,
    isLoading,
    fetchData,
  };
};

export default useAxios;
