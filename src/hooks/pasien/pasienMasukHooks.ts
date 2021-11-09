import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "../../config/myAxios";
import { format } from "date-fns";

export const usePasienMasuk = () => {
  const [loading, setLoading] = useState<any>({});
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState<any>({});
  const [status, setStatus] = useState<"off" | "on">("off");
  const [loadingInterval, setLoadingInterval] = useState(false);

  const handleGetAll = async () => {
    try {
      setLoading({ ...loading, getAll: true });
      const { data } = await axios.get("/pasien/pasien-masuk");
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
      await axios.post("/pasien/pasien-masuk", body);
      setMessage("Berhasil Tambah.Update Data Rekap Pasien Masuk");
      cb();
    } catch (err) {
      const error = err?.response?.data?.message || err.message;
      setError({ ...error, crud: error });
    } finally {
      setLoading({ ...loading, submit: false });
    }
  };
  const handleDelete = async (tanggal, cb) => {
    try {
      setLoading({ ...loading, delete: true });
      await axios.delete(`/pasien/pasien-masuk/${tanggal}`);
      setMessage("Berhasil Hapus Data Rekap Pasien Masuk");
      cb();
    } catch (err) {
      const error = err?.response?.data?.message || err.message;
      setError({ ...error, crud: error });
    } finally {
      setLoading({ ...loading, delete: false });
    }
  };
  const getInterval = async () => {
    try {
      setLoadingInterval(true);
      const { data } = await axios.get("/pasien/interval/pasien-masuk");
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
        await axios.post(`/pasien/interval/pasien-masuk/on`);
        setStatus("on");
      } else {
        await axios.post(`/pasien/interval/pasien-masuk/off`);
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
    handleDelete,
    setError,
    setMessage,
    getInterval,
    setInterval,
  };
};

export const usePasienMasukForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      tanggal: format(new Date(), "yyyy-MM-dd"),
      igd_suspect_l: "0",
      igd_suspect_p: "0",
      igd_confirm_l: "0",
      igd_confirm_p: "0",
      rj_suspect_l: "0",
      rj_suspect_p: "0",
      rj_confirm_l: "0",
      rj_confirm_p: "0",
      ri_suspect_l: "0",
      ri_suspect_p: "0",
      ri_confirm_l: "0",
      ri_confirm_p: "0",
    },
    validationSchema: Yup.object({
      tanggal: Yup.date().required("Harus Diisi"),
      igd_suspect_l: Yup.string().required("Harus Diisi"),
      igd_suspect_p: Yup.string().required("Harus Diisi"),
      igd_confirm_l: Yup.string().required("Harus Diisi"),
      igd_confirm_p: Yup.string().required("Harus Diisi"),
      rj_suspect_l: Yup.string().required("Harus Diisi"),
      rj_suspect_p: Yup.string().required("Harus Diisi"),
      rj_confirm_l: Yup.string().required("Harus Diisi"),
      rj_confirm_p: Yup.string().required("Harus Diisi"),
      ri_suspect_l: Yup.string().required("Harus Diisi"),
      ri_suspect_p: Yup.string().required("Harus Diisi"),
      ri_confirm_l: Yup.string().required("Harus Diisi"),
      ri_confirm_p: Yup.string().required("Harus Diisi"),
    }),
    onSubmit,
  });
  return formik;
};
