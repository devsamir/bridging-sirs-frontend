import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "../config/myAxios";
import { format } from "date-fns";

export const useSdm = () => {
  const [loading, setLoading] = useState<any>(false);
  const [data, setData] = useState({});
  const [message, setMessage] = useState("");
  const [error, setError] = useState<any>({});
  const [status, setStatus] = useState<"off" | "on">("off");

  const handleUpdate = async (values) => {
    try {
      setLoading(true);
      await axios.put("/sdm", values);
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
      const { data } = await axios.get("/sdm");
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
      const { data } = await axios.get("/sdm/interval");
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
        await axios.post(`/sdm/interval/on`);
        setStatus("on");
      } else {
        await axios.post(`/sdm/interval/off`);
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
    handleUpdate,
    Form,
    handleGetAll,
    setError,
    setMessage,
    setInterval,
    getInterval,
  };
};
