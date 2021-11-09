import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "../config/myAxios";
import { format } from "date-fns";

export const useOksigen = () => {
  const [loading, setLoading] = useState<any>({});
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState<any>({});
  const [status, setStatus] = useState<"off" | "on">("off");
  const [loadingInterval, setLoadingInterval] = useState(false);

  const handleGetAll = async () => {
    try {
      setLoading({ ...loading, getAll: true });
      const { data } = await axios.get("/oksigen");
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
      await axios.post("/oksigen", body);
      setMessage("Berhasil Tambah/Update Data Rekap Oksigen");
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
      const { data } = await axios.get("/oksigen/interval");
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
        await axios.post(`/oksigen/interval/on`);
        setStatus("on");
      } else {
        await axios.post(`/oksigen/interval/off`);
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

export const useOksigenForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      tanggal: format(new Date(), "yyyy-MM-dd"),
      p_cair: "",
      p_tabung_kecil: "",
      p_tabung_sedang: "",
      p_tabung_besar: "",
      k_isi_cair: "",
      k_isi_tabung_kecil: "",
      k_isi_tabung_sedang: "",
      k_isi_tabung_besar: "",
    },
    validationSchema: Yup.object({
      tanggal: Yup.date().required("Harus Diisi"),
      p_cair: Yup.string().required("Harus Diisi"),
      p_tabung_kecil: Yup.string().required("Harus Diisi"),
      p_tabung_sedang: Yup.string().required("Harus Diisi"),
      p_tabung_besar: Yup.string().required("Harus Diisi"),
      k_isi_cair: Yup.string().required("Harus Diisi"),
      k_isi_tabung_kecil: Yup.string().required("Harus Diisi"),
      k_isi_tabung_sedang: Yup.string().required("Harus Diisi"),
      k_isi_tabung_besar: Yup.string().required("Harus Diisi"),
    }),
    onSubmit,
  });
  return formik;
};
