import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "../../config/myAxios";
import { format } from "date-fns";

export const usePasienTriase = () => {
  const [loading, setLoading] = useState<any>({});
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState<any>({});
  const [status, setStatus] = useState<"off" | "on">("off");
  const [loadingInterval, setLoadingInterval] = useState(false);

  const handleGetAll = async () => {
    try {
      setLoading({ ...loading, getAll: true });
      const { data } = await axios.get("/pasien/pasien-triase");
      setData(data);
      setError({ ...error, getAll: false });
    } catch (err) {
      const error = err?.response?.data?.message || err.message;
      setError({ ...error, getAll: error });
    } finally {
      setLoading({ ...loading, getAll: false });
    }
  };
  const handleCreate = async (body, cb) => {
    try {
      setLoading({ ...loading, submit: true });
      await axios.post("/pasien/pasien-triase", body);
      setMessage("Berhasil Tambah/Update Data Rekap Pasien Triase");
      cb();
    } catch (err) {
      const error = err?.response?.data?.message || err.message;
      setError({ ...error, crud: error });
    } finally {
      setLoading({ ...loading, submit: false });
    }
  };
  const getInterval = async () => {
    try {
      setLoadingInterval(true);
      const { data } = await axios.get("/pasien/interval/pasien-triase");
      setStatus(data);
    } catch (err) {
      const error = err?.response?.data?.message || err.message;
      setError({ ...error, interval: error });
    } finally {
      setLoadingInterval(false);
    }
  };
  const setInterval = async () => {
    try {
      setLoadingInterval(true);
      if (status === "off") {
        await axios.post(`/pasien/interval/pasien-triase/on`);
        setStatus("on");
      } else {
        await axios.post(`/pasien/interval/pasien-triase/off`);
        setStatus("off");
      }
    } catch (err) {
      const error = err?.response?.data?.message || err.message;
      setError({ ...error, interval: error });
    } finally {
      setLoadingInterval(false);
    }
  };
  return {
    loading,
    data,
    message,
    error,
    status,
    loadingInterval,
    handleGetAll,
    handleCreate,
    setError,
    setMessage,
    getInterval,
    setInterval,
  };
};

export const usePasienTriaseForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      tanggal: format(new Date(), "yyyy-MM-dd"),
      igd_suspek: "0",
      igd_konfirmasi: "0",
      g_ringan_murni_covid: "0",
      g_ringan_komorbid: "0",
      g_ringan_koinsiden: "0",
      g_sedang: "0",
      g_berat: "0",
      igd_dirujuk: "0",
    },
    validationSchema: Yup.object({
      tanggal: Yup.date().required("Harus Diisi"),
      igd_suspek: Yup.string().required("Harus Diisi"),
      igd_konfirmasi: Yup.string().required("Harus Diisi"),
      g_ringan_murni_covid: Yup.string().required("Harus Diisi"),
      g_ringan_komorbid: Yup.string().required("Harus Diisi"),
      g_ringan_koinsiden: Yup.string().required("Harus Diisi"),
      g_sedang: Yup.string().required("Harus Diisi"),
      g_berat: Yup.string().required("Harus Diisi"),
      igd_dirujuk: Yup.string().required("Harus Diisi"),
    }),
    onSubmit,
  });
  return formik;
};
