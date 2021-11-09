import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaDatabase, FaSyringe } from "react-icons/fa";
import {
  MdDashboard,
  MdExpandMore,
  MdMenu,
  MdPerson,
  MdAirlineSeatFlat,
} from "react-icons/md";
import Button from "./Button";
import SidebarButton from "./SidebarButton";
import Sidebar from "./SidebarDropdown";

interface Props {}

const Template: React.FC<Props> = ({ children }) => {
  const [sidenav, setSidenav] = useState(false);
  const [pasienOpen, setPasienOpen] = useState(false);
  const [active, setActive] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/admin/pasien/pasienMasuk") {
      setActive("pasienMasuk");
      setPasienOpen(true);
    }
    if (location.pathname === "/admin/pasien/pasienKomorbid") {
      setActive("pasienKomorbid");
      setPasienOpen(true);
    }
    if (location.pathname === "/admin/pasien/pasienNonKomorbid") {
      setActive("pasienNonKomorbid");
      setPasienOpen(true);
    }
    if (location.pathname === "/admin/pasien/pasienKeluar") {
      setActive("pasienKeluar");
      setPasienOpen(true);
    }
    if (location.pathname === "/admin/pasien/pasienTriase") {
      setActive("pasienTriase");
      setPasienOpen(true);
    }
    if (location.pathname === "/admin/ruangan") {
      setActive("ruangan");
    }
    if (location.pathname === "/admin/sdm") {
      setActive("sdm");
    }
    if (location.pathname === "/admin/apd") {
      setActive("apd");
    }
    if (location.pathname === "/admin/oksigen") {
      setActive("oksigen");
    }
  }, [location.pathname]);
  return (
    <div className="min-w-full min-h-screen m-0 p-0 relative">
      <div
        className={
          sidenav
            ? "w-screen h-screen fixed bg-gray-700 bg-opacity-20 lg:w-0 lg:h-0 z-30"
            : ""
        }
        id="sidenav-container"
        onClick={(e: any) => {
          if (e.target.id === "sidenav-container") {
            setSidenav(!sidenav);
          }
        }}
      >
        {/* GANTI WARNA SIDEBAR */}
        <div
          className={`fixed top-0 left-0 min-h-screen z-30  w-72 shadow-inner custom-bg-sidebar transform  transition-all overflow-y-auto lg:translate-x-0 ${
            sidenav ? "translate-x-0" : "-translate-x-72"
          }`}
        >
          <div className="py-8 text-center text-2xl font-bold text-white">
            SIRS RSSK
          </div>
          <div className="flex flex-col">
            {/* PASIEN NAVIGATION */}
            <Sidebar.Dropdown
              onClick={setPasienOpen}
              open={pasienOpen}
              setSidenav={setSidenav}
            >
              <Sidebar.Button>
                <MdPerson className="mr-4" />
                Pasien
                <MdExpandMore className="ml-auto" />
              </Sidebar.Button>
              <Sidebar.Container>
                <Sidebar.Link
                  active={active === "pasienMasuk" ? true : false}
                  href="/admin/pasien/pasienMasuk"
                >
                  Pasien Masuk
                </Sidebar.Link>
                <Sidebar.Link
                  active={active === "pasienKomorbid" ? true : false}
                  href="/admin/pasien/pasienKomorbid"
                >
                  Pasien Komorbid
                </Sidebar.Link>
                <Sidebar.Link
                  active={active === "pasienNonKomorbid" ? true : false}
                  href="/admin/pasien/pasienNonKomorbid"
                >
                  Pasien Tanpa Komorbid
                </Sidebar.Link>
                <Sidebar.Link
                  active={active === "pasienKeluar" ? true : false}
                  href="/admin/pasien/pasienKeluar"
                >
                  Pasien Keluar
                </Sidebar.Link>
                <Sidebar.Link
                  active={active === "pasienTriase" ? true : false}
                  href="/admin/pasien/pasienTriase"
                >
                  Pasien IGD Triase
                </Sidebar.Link>
              </Sidebar.Container>
            </Sidebar.Dropdown>

            <SidebarButton
              href="/admin/ruangan"
              active={active === "ruangan" ? true : false}
            >
              <MdAirlineSeatFlat className="mr-4" />
              Ruangan
            </SidebarButton>
            <SidebarButton
              href="/admin/sdm"
              active={active === "sdm" ? true : false}
            >
              <MdPerson className="mr-4" />
              SDM
            </SidebarButton>
            <SidebarButton
              href="/admin/apd"
              active={active === "apd" ? true : false}
            >
              <FaSyringe className="mr-4" />
              APD
            </SidebarButton>
            <SidebarButton
              href="/admin/oksigen"
              active={active === "oksigen" ? true : false}
            >
              <FaDatabase className="mr-4" />
              Oksigen
            </SidebarButton>
          </div>
        </div>
      </div>
      <div className="shadow-md w-full p-4 flex justify-between ml-0">
        <Button className="text-lg z-10" onClick={setSidenav.bind(this, true)}>
          <MdMenu />
        </Button>
      </div>
      <div className="mt-4 flex">
        <div className="custom-sidebar-mixin"></div>
        <div className="custom-container">
          <div className="p-4">
            {children}

          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Template;
