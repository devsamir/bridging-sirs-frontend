import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "../../config/myAxios";
import { format } from "date-fns";

export const usePasienKeluar = () => {
  const [loading, setLoading] = useState<any>({});
  const [loadingInterval, setLoadingInterval] = useState(false);
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState<any>({});
  const [status, setStatus] = useState<"off" | "on">("off");

  const handleGetAll = async () => {
    try {
      setLoading({ ...loading, getAll: true });
      const { data } = await axios.get("/pasien/pasien-keluar");
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
      await axios.post("/pasien/pasien-keluar", body);
      setMessage("Berhasil Tambah/Update Data Rekap Pasien Keluar");
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
      await axios.delete(`/pasien/pasien-keluar/${tanggal}`);
      setMessage("Berhasil Hapus Data Rekap Pasien Keluar");
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
      const { data } = await axios.get("/pasien/interval/pasien-keluar");
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
        await axios.post(`/pasien/interval/pasien-keluar/on`);
        setStatus("on");
      } else {
        await axios.post(`/pasien/interval/pasien-keluar/off`);
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
    getInterval,
    setInterval,
    setError,
    setMessage,
  };
};

export const usePasienKeluarForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      tanggal: format(new Date(), "yyyy-MM-dd"),
      sembuh: "0",
      discarded: "0",
      meninggal_komorbid: "0",
      meninggal_tanpa_komorbid: "0",
      meninggal_prob_pre_komorbid: "0",
      meninggal_prob_neo_komorbid: "0",
      meninggal_prob_bayi_komorbid: "0",
      meninggal_prob_balita_komorbid: "0",
      meninggal_prob_anak_komorbid: "0",
      meninggal_prob_remaja_komorbid: "0",
      meninggal_prob_dws_komorbid: "0",
      meninggal_prob_lansia_komorbid: "0",
      meninggal_prob_pre_tanpa_komorbid: "0",
      meninggal_prob_neo_tanpa_komorbid: "0",
      meninggal_prob_bayi_tanpa_komorbid: "0",
      meninggal_prob_balita_tanpa_komorbid: "0",
      meninggal_prob_anak_tanpa_komorbid: "0",
      meninggal_prob_remaja_tanpa_komorbid: "0",
      meninggal_prob_dws_tanpa_komorbid: "0",
      meninggal_prob_lansia_tanpa_komorbid: "0",
      meninggal_discarded_komorbid: "0",
      meninggal_discarded_tanpa_komorbid: "0",
      dirujuk: "0",
      isman: "0",
      aps: "0",
    },
    validationSchema: Yup.object({
      tanggal: Yup.date().required("Harus Diisi"),
      sembuh: Yup.string().required("Harus Diisi"),
      discarded: Yup.string().required("Harus Diisi"),
      meninggal_komorbid: Yup.string().required("Harus Diisi"),
      meninggal_tanpa_komorbid: Yup.string().required("Harus Diisi"),
      meninggal_prob_pre_komorbid: Yup.string().required("Harus Diisi"),
      meninggal_prob_neo_komorbid: Yup.string().required("Harus Diisi"),
      meninggal_prob_bayi_komorbid: Yup.string().required("Harus Diisi"),
      meninggal_prob_balita_komorbid: Yup.string().required("Harus Diisi"),
      meninggal_prob_anak_komorbid: Yup.string().required("Harus Diisi"),
      meninggal_prob_remaja_komorbid: Yup.string().required("Harus Diisi"),
      meninggal_prob_dws_komorbid: Yup.string().required("Harus Diisi"),
      meninggal_prob_lansia_komorbid: Yup.string().required("Harus Diisi"),
      meninggal_prob_pre_tanpa_komorbid: Yup.string().required("Harus Diisi"),
      meninggal_prob_neo_tanpa_komorbid: Yup.string().required("Harus Diisi"),
      meninggal_prob_bayi_tanpa_komorbid: Yup.string().required("Harus Diisi"),
      meninggal_prob_balita_tanpa_komorbid:
        Yup.string().required("Harus Diisi"),
      meninggal_prob_anak_tanpa_komorbid: Yup.string().required("Harus Diisi"),
      meninggal_prob_remaja_tanpa_komorbid:
        Yup.string().required("Harus Diisi"),
      meninggal_prob_dws_tanpa_komorbid: Yup.string().required("Harus Diisi"),
      meninggal_prob_lansia_tanpa_komorbid:
        Yup.string().required("Harus Diisi"),
      meninggal_discarded_komorbid: Yup.string().required("Harus Diisi"),
      meninggal_discarded_tanpa_komorbid: Yup.string().required("Harus Diisi"),
      dirujuk: Yup.string().required("Harus Diisi"),
      isman: Yup.string().required("Harus Diisi"),
      aps: Yup.string().required("Harus Diisi"),
    }),
    onSubmit,
  });
  return formik;
};
