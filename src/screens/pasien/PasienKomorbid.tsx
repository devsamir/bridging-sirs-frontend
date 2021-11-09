import React, { useState, useEffect } from "react";
import { MdAdd, MdDelete, MdEdit } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";

// Local Component
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import Table, { Columns } from "../../components/TableClient";
import Field from "../../components/Field";
import {
  usePasienKomorbid,
  usePasienKomorbidForm,
} from "../../hooks/pasien/pasienKomorbidHooks";
import ErrorBox from "../../components/ErrorBox";

const columns: Columns[] = [
  { field: "id", type: "string", hide: true },
  {
    field: "tanggal",
    type: "date",
    headerName: "Tanggal",
    fixed: true,
    width: 150,
  },
  {
    field: "icu_dengan_ventilator_suspect_l",
    type: "string",
    headerName: "ICU Suspect Pria Dengan Ventilator",
    width: 120,
  },
  {
    field: "icu_dengan_ventilator_suspect_p",
    type: "string",
    headerName: "ICU Suspect Wanita Dengan Ventilator",
    width: 120,
  },
  {
    field: "icu_dengan_ventilator_confirm_l",
    type: "string",
    headerName: "ICU Confirm Pria Dengan Ventilator",
    width: 120,
  },
  {
    field: "icu_dengan_ventilator_confirm_p",
    type: "string",
    headerName: "ICU Confirm Wanita Dengan Ventilator",
    width: 120,
  },
  {
    field: "icu_tanpa_ventilator_suspect_l",
    type: "string",
    headerName: "ICU Suspect Pria tanpa Ventilator",
    width: 120,
  },
  {
    field: "icu_tanpa_ventilator_suspect_p",
    type: "string",
    headerName: "ICU Suspect Wanita tanpa Ventilator",
    width: 120,
  },
  {
    field: "icu_tanpa_ventilator_confirm_l",
    type: "string",
    headerName: "ICU Confirm Pria tanpa Ventilator",
    width: 120,
  },
  {
    field: "icu_tanpa_ventilator_confirm_p",
    type: "string",
    headerName: "ICU Confirm Wanita tanpa Ventilator",
    width: 120,
  },
  {
    field: "icu_tekanan_negatif_dengan_ventilator_suspect_l",
    type: "string",
    headerName: "ICU Suspect Pria Tekanan Negatif Dengan Ventilator",
    width: 120,
  },
  {
    field: "icu_tekanan_negatif_dengan_ventilator_suspect_p",
    type: "string",
    headerName: "ICU Suspect Wanita Tekanan Negatif Dengan Ventilator",
    width: 120,
  },
  {
    field: "icu_tekanan_negatif_dengan_ventilator_confirm_l",
    type: "string",
    headerName: "ICU Confirm Pria Tekanan Negatif Dengan Ventilator",
    width: 120,
  },
  {
    field: "icu_tekanan_negatif_dengan_ventilator_confirm_p",
    type: "string",
    headerName: "ICU Confirm Wanita Tekanan Negatif Dengan Ventilator",
    width: 120,
  },
  {
    field: "icu_tekanan_negatif_tanpa_ventilator_suspect_l",
    type: "string",
    headerName: "ICU Suspect Pria Tekanan Negatif tanpa Ventilator",
    width: 120,
  },
  {
    field: "icu_tekanan_negatif_tanpa_ventilator_suspect_p",
    type: "string",
    headerName: "ICU Suspect Wanita Tekanan Negatif tanpa Ventilator",
    width: 120,
  },
  {
    field: "icu_tekanan_negatif_tanpa_ventilator_confirm_l",
    type: "string",
    headerName: "ICU Confirm Pria Tekanan Negatif tanpa Ventilator",
    width: 120,
  },
  {
    field: "icu_tekanan_negatif_tanpa_ventilator_confirm_p",
    type: "string",
    headerName: "ICU Confirm Wanita Tekanan Negatif tanpa Ventilator",
    width: 120,
  },
  {
    field: "isolasi_tekanan_negatif_suspect_l",
    type: "string",
    headerName: "Isolasi Suspect Pria Tekanan Negatif",
    width: 120,
  },
  {
    field: "isolasi_tekanan_negatif_suspect_p",
    type: "string",
    headerName: "Isolasi Suspect Wanita Tekanan Negatif",
    width: 120,
  },
  {
    field: "isolasi_tekanan_negatif_confirm_l",
    type: "string",
    headerName: "Isolasi Confirm Pria Tekanan Negatif",
    width: 120,
  },
  {
    field: "isolasi_tekanan_negatif_confirm_p",
    type: "string",
    headerName: "Isolasi Confirm Wanita Tekanan Negatif",
    width: 120,
  },
  {
    field: "isolasi_tanpa_tekanan_negatif_suspect_l",
    type: "string",
    headerName: "Isolasi Suspect Pria Tanpa Tekanan Negatif",
    width: 120,
  },
  {
    field: "isolasi_tanpa_tekanan_negatif_suspect_p",
    type: "string",
    headerName: "Isolasi Suspect Wanita Tanpa Tekanan Negatif",
    width: 120,
  },
  {
    field: "isolasi_tanpa_tekanan_negatif_confirm_l",
    type: "string",
    headerName: "Isolasi Confirm Pria Tanpa Tekanan Negatif",
    width: 120,
  },
  {
    field: "isolasi_tanpa_tekanan_negatif_confirm_p",
    type: "string",
    headerName: "Isolasi Confirm Wanita Tanpa Tekanan Negatif",
    width: 120,
  },
  {
    field: "nicu_khusus_covid_suspect_l",
    type: "string",
    headerName: "NICU Suspect Pria Khusus Covid",
    width: 120,
  },
  {
    field: "nicu_khusus_covid_suspect_p",
    type: "string",
    headerName: "NICU Suspect Wanita Khusus Covid",
    width: 120,
  },
  {
    field: "nicu_khusus_covid_confirm_l",
    type: "string",
    headerName: "NICU Confirm Pria Khusus Covid",
    width: 120,
  },
  {
    field: "nicu_khusus_covid_confirm_p",
    type: "string",
    headerName: "NICU Confirm Wanita Khusus Covid",
    width: 120,
  },
  {
    field: "picu_khusus_covid_suspect_l",
    type: "string",
    headerName: "PICU Suspect Pria Khusus Covid",
    width: 120,
  },
  {
    field: "picu_khusus_covid_suspect_p",
    type: "string",
    headerName: "PICU Suspect Wanita Khusus Covid",
    width: 120,
  },
  {
    field: "picu_khusus_covid_confirm_l",
    type: "string",
    headerName: "PICU Confirm Pria Khusus Covid",
    width: 120,
  },
  {
    field: "picu_khusus_covid_confirm_p",
    type: "string",
    headerName: "PICU Confirm Wanita Khusus Covid",
    width: 120,
  },
];

const PasienKomorbid = () => {
  //  Custom Hooks
  const State = usePasienKomorbid();
  // Local State
  const [selected, setSelected] = useState("");
  const [modal, setModal] = useState(false);
  const [input, setInput] = useState<"create" | "edit">("create");

  // PREPARE HANDLER
  const prepareUpdate = () => {
    const selectedData = State.data.find((item) => item.id === selected);
    if (selectedData) {
      Form.setValues({ ...selectedData, tanggal: selectedData.id });
      setModal(true);
      setInput("edit");
    }
  };
  // Submit Handler
  const handleSubmit = (value) => {
    State.handleCreate(value, () => {
      setModal(false);
      Form.resetForm();
      State.handleGetAll();
      setSelected("");
    });
  };
  // Formik Custom Hooks
  const Form = usePasienKomorbidForm({ onSubmit: handleSubmit });
  // Use Effect
  useEffect(() => {
    State.handleGetAll();
  }, []);
  // SHOW MESSAGE ALERT
  useEffect(() => {
    if (State.message) toast.success(State.message);
    State.setMessage("");
  }, [State.message]);
  // SHOW Error ALERT
  useEffect(() => {
    if (State.error.crud) toast.error(State.error.crud);
    State.setError({ ...State.error, crud: "" });
  }, [State.error.crud]);

  useEffect(() => {
    State.getInterval();
    State.handleGetAll();
  }, [State.status]);
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="colored"
      />
      <div>
        <h1 className="text-2xl text-gray-800 my-4">
          Rekap Pasien Dirawat dengan Komorbid
        </h1>
        <div className="flex items-end flex-col">
          <span>
            Auto-Update :
            <span
              className={`${
                State.status === "off" ? `text-red-500` : "text-green-500"
              } font-bold`}
            >
              {State.status === "off" ? `Off` : "On"}
            </span>
          </span>
          <Button
            className={`${
              State.status === "off"
                ? `bg-green-500 text-gray-50`
                : "bg-gray-50 text-red-500"
            } `}
            onClick={State.setInterval}
            loading={State.loadingInterval}
          >
            {State.status === "off" ? `Turn On` : "Turn Off"}
          </Button>
        </div>
        <div className="flex">
          {!selected && (
            <Button
              className="bg-green-500 text-gray-50 hover:bg-green-600"
              spacing="mr-2"
              iconStart={<MdAdd />}
              onClick={() => {
                Form.resetForm();
                setModal(true);
                setInput("create");
              }}
            >
              Tambah
            </Button>
          )}
          {selected && (
            <Button
              className="bg-yellow-500 text-gray-50 hover:bg-yellow-600"
              spacing="mr-2"
              iconStart={<MdEdit />}
              onClick={prepareUpdate}
            >
              Edit
            </Button>
          )}
        </div>
        <div className="my-2">
          {State.error?.getAll ? (
            <ErrorBox
              errorTitle="Gagal Menarik Rekap Data Pasien Dengan Komorbid"
              buttonText="Coba Lagi"
              errorText={State.error?.getAll}
              loading={State.loading?.getAll}
              onClick={State.handleGetAll}
            />
          ) : (
            <Table
              columns={columns}
              data={State.data}
              loading={State.loading?.getAll}
              selected={selected}
              setSelected={setSelected}
            />
          )}
        </div>
      </div>
      <Modal
        onClose={setModal.bind(this, false)}
        show={modal}
        title={`${
          input === "create" ? "Tambah" : "Edit"
        } Pasien Dirawat dengan Komorbid`}
      >
        <form onSubmit={Form.handleSubmit}>
          <Field
            label="Tanggal"
            type="date"
            fullWidth
            Form={Form}
            name="tanggal"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field
              label="ICU Suspect Pria Dengan Ventilator"
              name="icu_dengan_ventilator_suspect_l"
              fullWidth
              Form={Form}
            />
            <Field
              label="ICU Suspect Wanita Dengan Ventilator"
              name="icu_dengan_ventilator_suspect_p"
              fullWidth
              Form={Form}
            />
            <Field
              label="ICU Confirm Pria Dengan Ventilator"
              name="icu_dengan_ventilator_confirm_l"
              fullWidth
              Form={Form}
            />
            <Field
              label="ICU Confirm Wanita Dengan Ventilator"
              name="icu_dengan_ventilator_confirm_p"
              fullWidth
              Form={Form}
            />
            <Field
              label="ICU Suspect Pria tanpa Ventilator"
              name="icu_tanpa_ventilator_suspect_l"
              fullWidth
              Form={Form}
            />
            <Field
              label="ICU Suspect Wanita tanpa Ventilator"
              name="icu_tanpa_ventilator_suspect_p"
              fullWidth
              Form={Form}
            />
            <Field
              label="ICU Confirm Pria tanpa Ventilator"
              name="icu_tanpa_ventilator_confirm_l"
              fullWidth
              Form={Form}
            />
            <Field
              label="ICU Confirm Wanita tanpa Ventilator"
              name="icu_tanpa_ventilator_confirm_p"
              fullWidth
              Form={Form}
            />
            <Field
              label="ICU Suspect Pria Tekanan Negatif Dengan Ventilator"
              name="icu_tekanan_negatif_dengan_ventilator_suspect_l"
              fullWidth
              Form={Form}
            />
            <Field
              label="ICU Suspect Wanita Tekanan Negatif Dengan Ventilator"
              name="icu_tekanan_negatif_dengan_ventilator_suspect_p"
              fullWidth
              Form={Form}
            />
            <Field
              label="ICU Confirm Pria Tekanan Negatif Dengan Ventilator"
              name="icu_tekanan_negatif_dengan_ventilator_confirm_l"
              fullWidth
              Form={Form}
            />
            <Field
              label="ICU Confirm Wanita Tekanan Negatif Dengan Ventilator"
              name="icu_tekanan_negatif_dengan_ventilator_confirm_p"
              fullWidth
              Form={Form}
            />
            <Field
              label="ICU Suspect Pria Tekanan Negatif tanpa Ventilator"
              name="icu_tekanan_negatif_tanpa_ventilator_suspect_l"
              fullWidth
              Form={Form}
            />
            <Field
              label="ICU Suspect Wanita Tekanan Negatif tanpa Ventilator"
              name="icu_tekanan_negatif_tanpa_ventilator_suspect_p"
              fullWidth
              Form={Form}
            />
            <Field
              label="ICU Confirm Pria Tekanan Negatif tanpa Ventilator"
              name="icu_tekanan_negatif_tanpa_ventilator_confirm_l"
              fullWidth
              Form={Form}
            />
            <Field
              label="ICU Confirm Wanita Tekanan Negatif tanpa Ventilator"
              name="icu_tekanan_negatif_tanpa_ventilator_confirm_p"
              fullWidth
              Form={Form}
            />
            <Field
              label="Isolasi Suspect Pria Tekanan Negatif"
              name="isolasi_tekanan_negatif_suspect_l"
              fullWidth
              Form={Form}
            />
            <Field
              label="Isolasi Suspect Wanita Tekanan Negatif"
              name="isolasi_tekanan_negatif_suspect_p"
              fullWidth
              Form={Form}
            />
            <Field
              label="Isolasi Confirm Pria Tekanan Negatif"
              name="isolasi_tekanan_negatif_confirm_l"
              fullWidth
              Form={Form}
            />
            <Field
              label="Isolasi Confirm Wanita Tekanan Negatif"
              name="isolasi_tekanan_negatif_confirm_p"
              fullWidth
              Form={Form}
            />
            <Field
              label="Isolasi Suspect Pria Tanpa Tekanan Negatif"
              name="isolasi_tanpa_tekanan_negatif_suspect_l"
              fullWidth
              Form={Form}
            />
            <Field
              label="Isolasi Suspect Wanita Tanpa Tekanan Negatif"
              name="isolasi_tanpa_tekanan_negatif_suspect_p"
              fullWidth
              Form={Form}
            />
            <Field
              label="Isolasi Confirm Pria Tanpa Tekanan Negatif"
              name="isolasi_tanpa_tekanan_negatif_confirm_l"
              fullWidth
              Form={Form}
            />
            <Field
              label="Isolasi Confirm Wanita Tanpa Tekanan Negatif"
              name="isolasi_tanpa_tekanan_negatif_confirm_p"
              fullWidth
              Form={Form}
            />
            <Field
              label="NICU Suspect Pria Khusus Covid"
              name="nicu_khusus_covid_suspect_l"
              fullWidth
              Form={Form}
            />
            <Field
              label="NICU Suspect Wanita Khusus Covid"
              name="nicu_khusus_covid_suspect_p"
              fullWidth
              Form={Form}
            />
            <Field
              label="NICU Confirm Pria Khusus Covid"
              name="nicu_khusus_covid_confirm_l"
              fullWidth
              Form={Form}
            />
            <Field
              label="NICU Confirm Wanita Khusus Covid"
              name="nicu_khusus_covid_confirm_p"
              fullWidth
              Form={Form}
            />
            <Field
              label="PICU Suspect Pria Khusus Covid"
              name="picu_khusus_covid_suspect_l"
              fullWidth
              Form={Form}
            />
            <Field
              label="PICU Suspect Wanita Khusus Covid"
              name="picu_khusus_covid_suspect_p"
              fullWidth
              Form={Form}
            />
            <Field
              label="PICU Confirm Pria Khusus Covid"
              name="picu_khusus_covid_confirm_l"
              fullWidth
              Form={Form}
            />
            <Field
              label="PICU Confirm Wanita Khusus Covid"
              name="picu_khusus_covid_confirm_p"
              fullWidth
              Form={Form}
            />
          </div>
          <div className="flex mt-4 justify-end">
            <Button
              type="button"
              className="bg-gray-200 hover:bg-gray-300"
              onClick={setModal.bind(this, false)}
            >
              Close
            </Button>
            <Button
              type="submit"
              className={`${
                input === "create"
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-yellow-500 hover:bg-yellow-600"
              } text-gray-50`}
              loading={State.loading?.submit}
              spacing="ml-2"
            >
              {input === "create" ? "Simpan" : "Update"}
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default PasienKomorbid;
