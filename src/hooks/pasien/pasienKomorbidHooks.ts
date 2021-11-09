import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "../../config/myAxios";
import { format } from "date-fns";

export const usePasienKomorbid = () => {
  const [loading, setLoading] = useState<any>({});
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState<any>({});
  const [status, setStatus] = useState<"off" | "on">("off");
  const [loadingInterval, setLoadingInterval] = useState(false);

  const handleGetAll = async () => {
    try {
      setLoading({ ...loading, getAll: true });
      const { data } = await axios.get("/pasien/pasien-komorbid");
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
      await axios.post("/pasien/pasien-komorbid", body);
      setMessage("Berhasil Tambah/Update Data Rekap Pasien Komorbid");
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
      const { data } = await axios.get("/pasien/interval/pasien-komorbid");
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
        await axios.post(`/pasien/interval/pasien-komorbid/on`);
        setStatus("on");
      } else {
        await axios.post(`/pasien/interval/pasien-komorbid/off`);
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

export const usePasienKomorbidForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      tanggal: format(new Date(), "yyyy-MM-dd"),
      icu_dengan_ventilator_suspect_l: "0",
      icu_dengan_ventilator_suspect_p: "0",
      icu_dengan_ventilator_confirm_l: "0",
      icu_dengan_ventilator_confirm_p: "0",
      icu_tanpa_ventilator_suspect_l: "0",
      icu_tanpa_ventilator_suspect_p: "0",
      icu_tanpa_ventilator_confirm_l: "0",
      icu_tanpa_ventilator_confirm_p: "0",
      icu_tekanan_negatif_dengan_ventilator_suspect_l: "0",
      icu_tekanan_negatif_dengan_ventilator_suspect_p: "0",
      icu_tekanan_negatif_dengan_ventilator_confirm_l: "0",
      icu_tekanan_negatif_dengan_ventilator_confirm_p: "0",
      icu_tekanan_negatif_tanpa_ventilator_suspect_l: "0",
      icu_tekanan_negatif_tanpa_ventilator_suspect_p: "0",
      icu_tekanan_negatif_tanpa_ventilator_confirm_l: "0",
      icu_tekanan_negatif_tanpa_ventilator_confirm_p: "0",
      isolasi_tekanan_negatif_suspect_l: "0",
      isolasi_tekanan_negatif_suspect_p: "0",
      isolasi_tekanan_negatif_confirm_l: "0",
      isolasi_tekanan_negatif_confirm_p: "0",
      isolasi_tanpa_tekanan_negatif_suspect_l: "0",
      isolasi_tanpa_tekanan_negatif_suspect_p: "0",
      isolasi_tanpa_tekanan_negatif_confirm_l: "0",
      isolasi_tanpa_tekanan_negatif_confirm_p: "0",
      nicu_khusus_covid_suspect_l: "0",
      nicu_khusus_covid_suspect_p: "0",
      nicu_khusus_covid_confirm_l: "0",
      nicu_khusus_covid_confirm_p: "0",
      picu_khusus_covid_suspect_l: "0",
      picu_khusus_covid_suspect_p: "0",
      picu_khusus_covid_confirm_l: "0",
      picu_khusus_covid_confirm_p: "0",
    },
    validationSchema: Yup.object({
      tanggal: Yup.date().required("Harus Diisi"),
      icu_dengan_ventilator_suspect_l: Yup.string().required("Harus Diisi"),
      icu_dengan_ventilator_suspect_p: Yup.string().required("Harus Diisi"),
      icu_dengan_ventilator_confirm_l: Yup.string().required("Harus Diisi"),
      icu_dengan_ventilator_confirm_p: Yup.string().required("Harus Diisi"),
      icu_tanpa_ventilator_suspect_l: Yup.string().required("Harus Diisi"),
      icu_tanpa_ventilator_suspect_p: Yup.string().required("Harus Diisi"),
      icu_tanpa_ventilator_confirm_l: Yup.string().required("Harus Diisi"),
      icu_tanpa_ventilator_confirm_p: Yup.string().required("Harus Diisi"),
      icu_tekanan_negatif_dengan_ventilator_suspect_l:
        Yup.string().required("Harus Diisi"),
      icu_tekanan_negatif_dengan_ventilator_suspect_p:
        Yup.string().required("Harus Diisi"),
      icu_tekanan_negatif_dengan_ventilator_confirm_l:
        Yup.string().required("Harus Diisi"),
      icu_tekanan_negatif_dengan_ventilator_confirm_p:
        Yup.string().required("Harus Diisi"),
      icu_tekanan_negatif_tanpa_ventilator_suspect_l:
        Yup.string().required("Harus Diisi"),
      icu_tekanan_negatif_tanpa_ventilator_suspect_p:
        Yup.string().required("Harus Diisi"),
      icu_tekanan_negatif_tanpa_ventilator_confirm_l:
        Yup.string().required("Harus Diisi"),
      icu_tekanan_negatif_tanpa_ventilator_confirm_p:
        Yup.string().required("Harus Diisi"),
      isolasi_tekanan_negatif_suspect_l: Yup.string().required("Harus Diisi"),
      isolasi_tekanan_negatif_suspect_p: Yup.string().required("Harus Diisi"),
      isolasi_tekanan_negatif_confirm_l: Yup.string().required("Harus Diisi"),
      isolasi_tekanan_negatif_confirm_p: Yup.string().required("Harus Diisi"),
      isolasi_tanpa_tekanan_negatif_suspect_l:
        Yup.string().required("Harus Diisi"),
      isolasi_tanpa_tekanan_negatif_suspect_p:
        Yup.string().required("Harus Diisi"),
      isolasi_tanpa_tekanan_negatif_confirm_l:
        Yup.string().required("Harus Diisi"),
      isolasi_tanpa_tekanan_negatif_confirm_p:
        Yup.string().required("Harus Diisi"),
      nicu_khusus_covid_suspect_l: Yup.string().required("Harus Diisi"),
      nicu_khusus_covid_suspect_p: Yup.string().required("Harus Diisi"),
      nicu_khusus_covid_confirm_l: Yup.string().required("Harus Diisi"),
      nicu_khusus_covid_confirm_p: Yup.string().required("Harus Diisi"),
      picu_khusus_covid_suspect_l: Yup.string().required("Harus Diisi"),
      picu_khusus_covid_suspect_p: Yup.string().required("Harus Diisi"),
      picu_khusus_covid_confirm_l: Yup.string().required("Harus Diisi"),
      picu_khusus_covid_confirm_p: Yup.string().required("Harus Diisi"),
    }),
    onSubmit,
  });
  return formik;
};
