import React, { Fragment } from "react";
import { Transition, Dialog, FocusTrap } from "@headlessui/react";
import Button from "./Button";

interface Props {
  show: boolean;
  onClose: any;
  onClick: any;
  loading: boolean;
}

const Confirm: React.FC<Props> = ({ onClose, show, loading, onClick }) => {
  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-40 overflow-y-auto"
        onClose={onClose}
        open={show}
      >
        <div className="min-h-screen px-4 text-center">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div
              className={`inline-block w-full max-w-xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl`}
            >
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                Yakin Hapus Data
              </Dialog.Title>
              <div className="mt-2">
                <span className="text-gray-800">
                  Data yang sudah dihapus tidak akan kembali.
                </span>
                <div className="flex mt-4 justify-end">
                  <Button
                    type="button"
                    className="bg-gray-200 hover:bg-gray-300"
                    onClick={onClose}
                  >
                    Close
                  </Button>
                  <Button
                    type="submit"
                    className="bg-red-500 hover:bg-red-600 text-gray-50 ml-2"
                    loading={loading}
                    onClick={onClick}
                  >
                    Hapus
                  </Button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Confirm;
