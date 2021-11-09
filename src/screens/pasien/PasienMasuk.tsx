import React, { useState, useEffect } from "react";
import { MdAdd, MdDelete, MdEdit } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";

// Local Component
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import Table, { Columns } from "../../components/TableClient";
import Field from "../../components/Field";
import Confirm from "../../components/Confirm";
import {
  usePasienMasuk,
  usePasienMasukForm,
} from "../../hooks/pasien/pasienMasukHooks";
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
    field: "igd_suspect_l",
    type: "string",
    headerName: "IGD Suspect Pria",
  },
  {
    field: "igd_suspect_p",
    type: "string",
    headerName: "IGD Suspect Wanita",
  },
  {
    field: "igd_confirm_l",
    type: "string",
    headerName: "IGD Confirm Pria",
  },
  {
    field: "igd_confirm_p",
    type: "string",
    headerName: "IGD Confirm Wanita",
  },
  {
    field: "rj_suspect_l",
    type: "string",
    headerName: "RJ Suspect Pria",
  },
  {
    field: "rj_suspect_p",
    type: "string",
    headerName: "RJ Suspect Wanita",
  },
  {
    field: "rj_confirm_l",
    type: "string",
    headerName: "RJ Confirm Pria",
  },
  {
    field: "rj_confirm_p",
    type: "string",
    headerName: "RJ Confirm Wanita",
  },
  {
    field: "ri_suspect_l",
    type: "string",
    headerName: "RI Suspect Pria",
  },
  {
    field: "ri_suspect_p",
    type: "string",
    headerName: "RI Suspect Wanita",
  },
  {
    field: "ri_confirm_l",
    type: "string",
    headerName: "RI Confirm Pria",
  },
  {
    field: "ri_confirm_p",
    type: "string",
    headerName: "RI Confirm Wanita",
  },
];

const PasienMasuk = () => {
  //  Custom Hooks
  const State = usePasienMasuk();
  // Local State
  const [selected, setSelected] = useState("");
  const [modal, setModal] = useState(false);
  const [confirm, setConfirm] = useState(false);
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
  const handleDelete = () => {
    State.handleDelete(selected, () => {
      setConfirm(false);
      setSelected("");
      State.handleGetAll();
    });
  };
  // Formik Custom Hooks
  const Form = usePasienMasukForm({ onSubmit: handleSubmit });
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
      <Confirm
        loading={State.loading?.delete}
        onClick={handleDelete}
        onClose={setConfirm.bind(this, false)}
        show={confirm}
      />
      <div>
        <h1 className="text-2xl text-gray-800 my-4">Rekap Pasien Masuk</h1>
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
          {selected && (
            <Button
              className="bg-red-500 text-gray-50 hover:bg-red-600"
              spacing="mr-2"
              iconStart={<MdDelete />}
              onClick={() => {
                setConfirm(true);
              }}
            >
              Delete
            </Button>
          )}
        </div>
        <div className="my-2">
          {State.error?.getAll ? (
            <ErrorBox
              errorTitle="Gagal Menarik Rekap Data Pasien Masuk"
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
        title={`${input === "create" ? "Tambah" : "Edit"} Pasien Masuk`}
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
              label="IGD Suspect Pria"
              name="igd_suspect_l"
              fullWidth
              Form={Form}
            />
            <Field
              label="IGD Suspect Wanita"
              Form={Form}
              name="igd_suspect_p"
              fullWidth
            />
            <Field
              label="IGD Confirm Pria"
              Form={Form}
              name="igd_confirm_l"
              fullWidth
            />
            <Field
              label="IGD Confirm Wanita"
              Form={Form}
              name="igd_confirm_p"
              fullWidth
            />
            <Field
              label="RJ Suspect Pria"
              name="rj_suspect_l"
              Form={Form}
              fullWidth
            />
            <Field
              label="RJ Suspect Wanita"
              Form={Form}
              name="rj_suspect_p"
              fullWidth
            />
            <Field
              label="RJ Confirm Pria"
              Form={Form}
              name="rj_confirm_l"
              fullWidth
            />
            <Field
              label="RJ Confirm Wanita"
              Form={Form}
              name="rj_confirm_p"
              fullWidth
            />
            <Field
              label="RI Suspect Pria"
              Form={Form}
              name="ri_suspect_l"
              fullWidth
            />
            <Field
              label="RI Suspect Wanita"
              Form={Form}
              name="ri_suspect_p"
              fullWidth
            />
            <Field
              label="RI Confirm Pria"
              Form={Form}
              name="ri_confirm_l"
              fullWidth
            />
            <Field
              label="RI Confirm Wanita"
              Form={Form}
              name="ri_confirm_p"
              fullWidth
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

export default PasienMasuk;
