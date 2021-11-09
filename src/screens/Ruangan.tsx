import React, { useState, useEffect } from "react";
import { MdAdd, MdDelete, MdEdit, MdSave } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";

// Local Component
import Button from "../components/Button";
import Modal from "../components/Modal";
import Field from "../components/Field";
import Confirm from "../components/Confirm";
import { useRuangan } from "../hooks/ruangan/ruanganHooks";
import ErrorBox from "../components/ErrorBox";
import TextField from "../components/TextField";
import { FaSpinner } from "react-icons/fa";

const Ruangan = () => {
  const State = useRuangan();

  useEffect(() => {
    State.handleGetAll();
  }, []);

  useEffect(() => {
    State.handleGetAll();
    State.getInterval();
  }, [State.status]);

  // SHOW MESSAGE ALERT
  useEffect(() => {
    if (State.message) toast.success(State.message);
    State.setMessage("");
  }, [State.message]);
  // SHOW Error ALERT
  useEffect(() => {
    if (State.error.main) toast.error(State.error.main);
    State.setError({ ...State.error, main: "" });
  }, [State.error.main]);
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
      {/* <Confirm
        loading={State.loading?.delete}
        onClick={handleDelete}
        onClose={setConfirm.bind(this, false)}
        show={confirm}
      /> */}
      <div>
        <form onSubmit={State.Form.handleSubmit}>
          <h1 className="text-2xl text-gray-800 my-4">Data Ruangan / Kamar</h1>
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
              loading={State.loading}
            >
              {State.status === "off" ? `Turn On` : "Turn Off"}
            </Button>
          </div>
          <Button
            className="bg-green-500 text-gray-50 hover:bg-green-600"
            spacing="mr-2"
            iconStart={<MdSave />}
            type="submit"
            loading={State.loading}
          >
            Simpan
          </Button>
          {State.loading ? (
            <div className="flex h-96 justify-center items-center">
              <FaSpinner className="text-green-500 animate-spin text-8xl" />
            </div>
          ) : (
            <div
              className="overflow-x-auto overflow-y-auto shadow my-4"
              style={{ maxHeight: "80vh" }}
            >
              <table
                className="relative table-fixed border-separate min-w-full"
                style={{ borderSpacing: 0 }}
              >
                <thead>
                  <tr>
                    <th className="sticky top-0 bg-green-500 border border-solid border-green-500 text-white z-10 cursor-pointer p-2 text-left">
                      Ruang
                    </th>
                    <th className="sticky top-0 bg-green-500 border border-solid border-green-500 text-white z-10 cursor-pointer p-2 text-left">
                      Kelas
                    </th>
                    <th className="sticky top-0 bg-green-500 border border-solid border-green-500 text-white z-10 cursor-pointer p-2 text-left">
                      Jumlah
                    </th>
                    <th className="sticky top-0 bg-green-500 border border-solid border-green-500 text-white z-10 cursor-pointer p-2 text-left">
                      Terpakai
                    </th>
                    <th className="sticky top-0 bg-green-500 border border-solid border-green-500 text-white z-10 cursor-pointer p-2 text-left">
                      Kosong
                    </th>
                    <th className="sticky top-0 bg-green-500 border border-solid border-green-500 text-white z-10 cursor-pointer p-2 text-left">
                      Last Update
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(State.data).map((id, index) => (
                    <tr
                      className={`cursor-pointer relative hover:bg-green-500 hover:bg-opacity-25 ${
                        index % 2 === 0 ? "" : `bg-green-100`
                      }`}
                      key={id}
                    >
                      <td
                        className={`${
                          index % 2 === 0 ? "bg-white" : "bg-green-100"
                        } p-2 text-left text-gray-700 border border-gray-700 border-opacity-20`}
                      >
                        {State.data[id].ruang}
                      </td>
                      <td
                        className={`${
                          index % 2 === 0 ? "bg-white" : "bg-green-100"
                        } p-2 text-left text-gray-700 border border-gray-700 border-opacity-20`}
                      >
                        {State.data[id].tt}
                      </td>
                      <td
                        className={`${
                          index % 2 === 0 ? "bg-white" : "bg-green-100"
                        } p-2 text-left text-gray-700 border border-gray-700 border-opacity-20`}
                      >
                        <TextField
                          name={`${id}.jumlah`}
                          id={`${id}.jumlah`}
                          onBlur={State.Form.handleBlur}
                          onChange={State.Form.handleChange}
                          value={State.Form.values[id]?.jumlah || 0}
                        />
                      </td>
                      <td
                        className={`${
                          index % 2 === 0 ? "bg-white" : "bg-green-100"
                        } p-2 text-left text-gray-700 border border-gray-700 border-opacity-20`}
                      >
                        <TextField
                          name={`${id}.terpakai`}
                          id={`${id}.terpakai`}
                          onBlur={State.Form.handleBlur}
                          onChange={State.Form.handleChange}
                          value={State.Form.values[id]?.terpakai || 0}
                        />
                      </td>
                      <td
                        className={`${
                          index % 2 === 0 ? "bg-white" : "bg-green-100"
                        } p-2 text-left text-gray-700 border border-gray-700 border-opacity-20`}
                      >
                        <TextField
                          name={`${id}.kosong`}
                          id={`${id}.kosong`}
                          onBlur={State.Form.handleBlur}
                          onChange={State.Form.handleChange}
                          value={State.Form.values[id]?.kosong || 0}
                        />
                      </td>
                      <td
                        className={`${
                          index % 2 === 0 ? "bg-white" : "bg-green-100"
                        } p-2 text-left text-gray-700 border border-gray-700 border-opacity-20`}
                      >
                        {State.data[id].tglupdate}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default Ruangan;
