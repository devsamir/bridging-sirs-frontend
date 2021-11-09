import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "../config/myAxios";
import { format } from "date-fns";

export const useApd = () => {
  const [loading, setLoading] = useState<any>(false);
  const [data, setData] = useState({});
  const [message, setMessage] = useState("");
  const [error, setError] = useState<any>({});
  const [status, setStatus] = useState<"off" | "on">("off");

  const handleUpdate = async (values) => {
    try {
      setLoading(true);
      await axios.put("/apd", values);
      setTimeout(handleGetAll, 1000);
    } catch (err) {
      const errorM = err?.response?.data?.message || err.message;
      setError({ ...error, main: errorM });
    } finally {
      setLoading(false);
    }
  };

  const Form = useFormik({
    initialValues: { ...data },
    onSubmit: handleUpdate,
  });
  let handleGetAll = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/apd");

      setData(data);
      Form.setValues(data);
      setError({ ...error, getAll: false });
    } catch (err) {
      const errorM = err?.response?.data?.message || err.message;
      setError({ ...error, getAll: errorM });
    } finally {
      setLoading(false);
    }
  };

  const getInterval = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/apd/interval");
      setStatus(data);
    } catch (err) {
      const error = err?.response?.data?.message || err.message;
      setError({ ...error, interval: error });
    } finally {
      setLoading(false);
    }
  };
  const setInterval = async () => {
    try {
      setLoading(true);
      if (status === "off") {
        await axios.post(`/apd/interval/on`);
        setStatus("on");
      } else {
        await axios.post(`/apd/interval/off`);
        setStatus("off");
      }
    } catch (err) {
      const error = err?.response?.data?.message || err.message;
      setError({ ...error, interval: error });
    } finally {
      setLoading(false);
    }
  };
  return {
    loading,
    data,
    message,
    error,
    status,
    getInterval,
    setInterval,
    handleGetAll,
    Form,
    setError,
    setMessage,
  };
};
