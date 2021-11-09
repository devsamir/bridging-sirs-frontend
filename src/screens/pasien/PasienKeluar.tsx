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
  usePasienKeluar,
  usePasienKeluarForm,
} from "../../hooks/pasien/pasienKeluarHooks";
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
    field: "sembuh",
    type: "string",
    headerName: "Sembuh / APD",
  },
  {
    field: "discarded",
    type: "string",
    headerName: "Discarded",
  },
  {
    field: "meninggal_komorbid",
    type: "string",
    headerName: "Meninggal Dengan Komorbid",
  },
  {
    field: "meninggal_tanpa_komorbid",
    type: "string",
    headerName: "Meninggal Tanpa Komorbid",
  },
  {
    field: "meninggal_prob_pre_komorbid",
    type: "string",
    headerName: "Meninggal Probable Komorbid Usia 0 - 6 Hari",
  },
  {
    field: "meninggal_prob_neo_komorbid",
    type: "string",
    headerName: "Meninggal Probable Komorbid Usia 7 - 28 Hari",
  },
  {
    field: "meninggal_prob_bayi_komorbid",
    type: "string",
    headerName: "Meninggal Probable Komorbid Usia 29 hari - < 1 Tahun",
  },
  {
    field: "meninggal_prob_balita_komorbid",
    type: "string",
    headerName: "Meninggal Probable Komorbid Usia 1 - 4 Tahun",
  },
  {
    field: "meninggal_prob_anak_komorbid",
    type: "string",
    headerName: "Meninggal Probable Komorbid Usia 5 - 18 Tahun",
  },
  {
    field: "meninggal_prob_remaja_komorbid",
    type: "string",
    headerName: "Meninggal Probable Komorbid Usia 19 - 40 Tahun",
  },
  {
    field: "meninggal_prob_dws_komorbid",
    type: "string",
    headerName: "Meninggal Probable Komorbid Usia 41 - 60 Tahun",
  },
  {
    field: "meninggal_prob_lansia_komorbid",
    type: "string",
    headerName: "Meninggal Probable Komorbid Usia > 60 Tahun",
  },
  {
    field: "meninggal_prob_pre_tanpa_komorbid",
    type: "string",
    headerName: "Meninggal Tanpa Probable Komorbid Usia 0 - 6 Hari",
  },
  {
    field: "meninggal_prob_neo_tanpa_komorbid",
    type: "string",
    headerName: "Meninggal Tanpa Probable Komorbid Usia 7 - 28 Hari",
  },
  {
    field: "meninggal_prob_bayi_tanpa_komorbid",
    type: "string",
    headerName: "Meninggal Tanpa Probable Komorbid Usia 29 hari - < 1 Tahun",
  },
  {
    field: "meninggal_prob_balita_tanpa_komorbid",
    type: "string",
    headerName: "Meninggal Tanpa Probable Komorbid Usia 1 - 4 Tahun",
  },
  {
    field: "meninggal_prob_anak_tanpa_komorbid",
    type: "string",
    headerName: "Meninggal Probable Tanpa Komorbid Usia 5 - 18 Tahun",
  },
  {
    field: "meninggal_prob_remaja_tanpa_komorbid",
    type: "string",
    headerName: "Meninggal Probable Tanpa Komorbid Usia 19 - 40 Tahun",
  },
  {
    field: "meninggal_prob_dws_tanpa_komorbid",
    type: "string",
    headerName: "Meninggal Probable Tanpa Komorbid Usia 41 - 60 Tahun",
  },
  {
    field: "meninggal_prob_lansia_tanpa_komorbid",
    type: "string",
    headerName: "Meninggal Probable Tanpa Komorbid Usia > 60 Tahun",
  },
  {
    field: "meninggal_discarded_komorbid",
    type: "string",
    headerName: "Meninggal Discarded Dengan Komorbid",
  },
  {
    field: "meninggal_discarded_tanpa_komorbid",
    type: "string",
    headerName: "Meninggal Tanpa Discarded Dengan Komorbid",
  },
  {
    field: "dirujuk",
    type: "string",
    headerName: "Pasien Dirujuk",
  },
  {
    field: "isman",
    type: "string",
    headerName: "Pasien Isolasi Mandiri",
  },
  {
    field: "aps",
    type: "string",
    headerName: "Atas Permintaan Sendiri / Kabur",
  },
];

const PasienMasuk = () => {
  //  Custom Hooks
  const State = usePasienKeluar();
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
  const Form = usePasienKeluarForm({ onSubmit: handleSubmit });
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
        <h1 className="text-2xl text-gray-800 my-4">Rekap Pasien Keluar</h1>
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
              errorTitle="Gagal Menarik Rekap Data Pasien Keluar"
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
              label="Sembuh / Atas Persetujuan Dokter"
              name="sembuh"
              fullWidth
              Form={Form}
            />
            <Field label="Discarded" name="discarded" fullWidth Form={Form} />
            <Field
              label="Meninggal Dengan Komorbid"
              name="meninggal_komorbid"
              fullWidth
              Form={Form}
            />
            <Field
              label="Meninggal Tanpa Komorbid"
              name="meninggal_tanpa_komorbid"
              fullWidth
              Form={Form}
            />
            <Field
              label="Meninggal Probable Komorbid Usia 0 - 6 Hari"
              name="meninggal_prob_pre_komorbid"
              fullWidth
              Form={Form}
            />
            <Field
              label="Meninggal Probable Komorbid Usia 7 - 28 Hari"
              name="meninggal_prob_neo_komorbid"
              fullWidth
              Form={Form}
            />
            <Field
              label="Meninggal Probable Komorbid Usia 29 hari - < 1 Tahun"
              name="meninggal_prob_bayi_komorbid"
              fullWidth
              Form={Form}
            />
            <Field
              label="Meninggal Probable Komorbid Usia 1 - 4 Tahun"
              name="meninggal_prob_balita_komorbid"
              fullWidth
              Form={Form}
            />
            <Field
              label="Meninggal Probable Komorbid Usia 5 - 18 Tahun"
              name="meninggal_prob_anak_komorbid"
              fullWidth
              Form={Form}
            />
            <Field
              label="Meninggal Probable Komorbid Usia 19 - 40 Tahun"
              name="meninggal_prob_remaja_komorbid"
              fullWidth
              Form={Form}
            />
            <Field
              label="Meninggal Probable Komorbid Usia 41 - 60 Tahun"
              name="meninggal_prob_dws_komorbid"
              fullWidth
              Form={Form}
            />
            <Field
              label="Meninggal Probable Komorbid Usia > 60 Tahun"
              name="meninggal_prob_lansia_komorbid"
              fullWidth
              Form={Form}
            />
            <Field
              label="Meninggal Tanpa Probable Komorbid Usia 0 - 6 Hari"
              name="meninggal_prob_pre_tanpa_komorbid"
              fullWidth
              Form={Form}
            />
            <Field
              label="Meninggal Tanpa Probable Komorbid Usia 7 - 28 Hari"
              name="meninggal_prob_neo_tanpa_komorbid"
              fullWidth
              Form={Form}
            />
            <Field
              label="Meninggal Tanpa Probable Komorbid Usia 29 hari - < 1 Tahun"
              name="meninggal_prob_bayi_tanpa_komorbid"
              fullWidth
              Form={Form}
            />
            <Field
              label="Meninggal Tanpa Probable Komorbid Usia 1 - 4 Tahun"
              name="meninggal_prob_balita_tanpa_komorbid"
              fullWidth
              Form={Form}
            />
            <Field
              label="Meninggal Probable Tanpa Komorbid Usia 5 - 18 Tahun"
              name="meninggal_prob_anak_tanpa_komorbid"
              fullWidth
              Form={Form}
            />
            <Field
              label="Meninggal Probable Tanpa Komorbid Usia 19 - 40 Tahun"
              name="meninggal_prob_remaja_tanpa_komorbid"
              fullWidth
              Form={Form}
            />
            <Field
              label="Meninggal Probable Tanpa Komorbid Usia 41 - 60 Tahun"
              name="meninggal_prob_dws_tanpa_komorbid"
              fullWidth
              Form={Form}
            />
            <Field
              label="Meninggal Probable Tanpa Komorbid Usia > 60 Tahun"
              name="meninggal_prob_lansia_tanpa_komorbid"
              fullWidth
              Form={Form}
            />
            <Field
              label="Meninggal Discarded Dengan Komorbid"
              name="meninggal_discarded_komorbid"
              fullWidth
              Form={Form}
            />
            <Field
              label="Meninggal Tanpa Discarded Dengan Komorbid"
              name="meninggal_discarded_tanpa_komorbid"
              fullWidth
              Form={Form}
            />
            <Field
              label="Pasien Dirujuk"
              name="dirujuk"
              fullWidth
              Form={Form}
            />
            <Field
              label="Pasien Isolasi Mandiri"
              name="isman"
              fullWidth
              Form={Form}
            />
            <Field
              label="Atas Permintaan Sendiri / Kabur"
              name="aps"
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
