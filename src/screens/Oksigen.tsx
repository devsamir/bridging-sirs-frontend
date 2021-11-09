import React, { useState, useEffect } from "react";
import { MdAdd, MdDelete, MdEdit } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";

// Local Component
import Button from "../components/Button";
import Modal from "../components/Modal";
import Table, { Columns } from "../components/TableClient";
import Field from "../components/Field";
import { useOksigen, useOksigenForm } from "../hooks/oksigenHooks";
import ErrorBox from "../components/ErrorBox";

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
    field: "p_cair",
    type: "string",
    headerName: "Pemakaian Oksigen Cair (m3)",
    width: 120,
  },
  {
    field: "p_tabung_kecil",
    type: "string",
    headerName: "Pemakaian Oksigen Tabung Kecil (1m3)",
    width: 120,
  },
  {
    field: "p_tabung_sedang",
    type: "string",
    headerName: "Pemakaian Oksigen Tabung Sedang (2m3)",
    width: 120,
  },
  {
    field: "p_tabung_besar",
    type: "string",
    headerName: "Pemakaian Oksigen Tabung Besar (6m3)",
    width: 120,
  },
  {
    field: "k_isi_cair",
    type: "string",
    headerName: "Ketersediaan Oksigen Cair (m3)",
    width: 120,
  },
  {
    field: "k_isi_tabung_kecil",
    type: "string",
    headerName: "Ketersediaan Oksigen Tabung Kecil (1m3)",
    width: 120,
  },
  {
    field: "k_isi_tabung_sedang",
    type: "string",
    headerName: "Ketersediaan Oksigen Tabung Sedang (2m3)",
    width: 120,
  },
  {
    field: "k_isi_tabung_besar",
    type: "string",
    headerName: "Ketersediaan Oksigen Tabung Besar (6m3)",
    width: 120,
  },
];

const Oksigen = () => {
  //  Custom Hooks
  const State = useOksigen();
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
  const Form = useOksigenForm({ onSubmit: handleSubmit });
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
          Rekap Penggunaan Oksigen
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
              errorTitle="Gagal Menarik Rekap Data Pemakaian Oksigen"
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
        title={`${input === "create" ? "Tambah" : "Edit"} Pemakaian Oksigen`}
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
              label="Pemakaian Oksigen Cair (m3)"
              name="p_cair"
              fullWidth
              Form={Form}
            />
            <Field
              label="Pemakaian Oksigen Tabung Kecil (1m3)"
              name="p_tabung_kecil"
              fullWidth
              Form={Form}
            />
            <Field
              label="Pemakaian Oksigen Tabung Sedang (2m3)"
              name="p_tabung_sedang"
              fullWidth
              Form={Form}
            />
            <Field
              label="Pemakaian Oksigen Tabung Besar (6m3)"
              name="p_tabung_besar"
              fullWidth
              Form={Form}
            />
            <Field
              label="Ketersediaan Oksigen Cair (m3)"
              name="k_isi_cair"
              fullWidth
              Form={Form}
            />
            <Field
              label="Ketersediaan Oksigen Tabung Kecil (1m3)"
              name="k_isi_tabung_kecil"
              fullWidth
              Form={Form}
            />
            <Field
              label="Ketersediaan Oksigen Tabung Sedang (2m3)"
              name="k_isi_tabung_sedang"
              fullWidth
              Form={Form}
            />
            <Field
              label="Ketersediaan Oksigen Tabung Besar (6m3)"
              name="k_isi_tabung_besar"
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

export default Oksigen;
