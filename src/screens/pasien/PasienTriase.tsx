import React, { useState, useEffect } from "react";
import { MdAdd, MdDelete, MdEdit } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";

// Local Component
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import Table, { Columns } from "../../components/TableClient";
import Field from "../../components/Field";
import {
  usePasienTriase,
  usePasienTriaseForm,
} from "../../hooks/pasien/pasienTriaseHooks";
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
    field: "igd_suspek",
    type: "string",
    headerName: "Pasien IGD Triase Suspek",
    width: 120,
  },
  {
    field: "igd_konfirmasi",
    type: "string",
    headerName: "Pasien IGD Triase Terkonfirmasi",
    width: 120,
  },
  {
    field: "g_ringan_murni_covid",
    type: "string",
    headerName: "Terkonfirmasi Gejala Ringan Murni Covid",
    width: 120,
  },
  {
    field: "g_ringan_komorbid",
    type: "string",
    headerName: "Terkonfirmasi Gejala Ringan Dengan Komorbid",
    width: 120,
  },
  {
    field: "g_ringan_koinsiden",
    type: "string",
    headerName: "Terkonfirmasi Gejala Ringan Co-Insiden",
    width: 120,
  },
  {
    field: "g_sedang",
    type: "string",
    headerName: "Terkonfirmasi Gejala Sedang",
    width: 120,
  },
  {
    field: "g_berat",
    type: "string",
    headerName: "Terkonfirmasi Gejala berat",
    width: 120,
  },
  {
    field: "igd_dirujuk",
    type: "string",
    headerName: "Pasien Dirujuk",
    width: 120,
  },
];

const PasienTriase = () => {
  //  Custom Hooks
  const State = usePasienTriase();
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
  const Form = usePasienTriaseForm({ onSubmit: handleSubmit });
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
        <h1 className="text-2xl text-gray-800 my-4">Rekap Pasien IGD Triase</h1>
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
              errorTitle="Gagal Menarik Rekap Data Pasien IGD Triase"
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
        title={`${input === "create" ? "Tambah" : "Edit"} Pasien IGD Triase`}
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
              label="Pasien IGD Triase Suspek"
              name="igd_suspek"
              fullWidth
              Form={Form}
            />
            <Field
              label="Pasien IGD Triase Terkonfirmasi"
              name="igd_konfirmasi"
              fullWidth
              Form={Form}
            />
            <Field
              label="Terkonfirmasi Gejala Ringan Murni Covid"
              name="g_ringan_murni_covid"
              fullWidth
              Form={Form}
            />
            <Field
              label="Terkonfirmasi Gejala Ringan Dengan Komorbid"
              name="g_ringan_komorbid"
              fullWidth
              Form={Form}
            />
            <Field
              label="Terkonfirmasi Gejala Ringan Co-Insiden"
              name="g_ringan_koinsiden"
              fullWidth
              Form={Form}
            />
            <Field
              label="Terkonfirmasi Gejala Sedang"
              name="g_sedang"
              fullWidth
              Form={Form}
            />
            <Field
              label="Terkonfirmasi Gejala berat"
              name="g_berat"
              fullWidth
              Form={Form}
            />
            <Field
              label="Pasien Dirujuk"
              name="igd_dirujuk"
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

export default PasienTriase;
