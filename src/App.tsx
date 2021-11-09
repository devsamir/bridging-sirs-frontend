import React from "react";
import { Switch, Route } from "react-router-dom";
import Template from "./components/Template";
import PasienKeluar from "./screens/pasien/PasienKeluar";
import PasienKomorbid from "./screens/pasien/PasienKomorbid";
import PasienMasuk from "./screens/pasien/PasienMasuk";
import PasienNonKomorbid from "./screens/pasien/PasienNonKomorbid";
import PasienTriase from "./screens/pasien/PasienTriase";
import Apd from "./screens/Apd";
import Oksigen from "./screens/Oksigen";
import Ruangan from "./screens/Ruangan";
import Sdm from "./screens/Sdm";

function App() {
  return (
    <>
      <Switch>
        <Template>
          <Route path="/admin/pasien/pasienMasuk">
            <PasienMasuk />
          </Route>
          <Route path="/admin/pasien/pasienKeluar">
            <PasienKeluar />
          </Route>
          <Route path="/admin/pasien/pasienKomorbid">
            <PasienKomorbid />
          </Route>
          <Route path="/admin/pasien/pasienNonKomorbid">
            <PasienNonKomorbid />
          </Route>
          <Route path="/admin/pasien/pasienTriase">
            <PasienTriase />
          </Route>
          <Route path="/admin/apd">
            <Apd />
          </Route>
          <Route path="/admin/oksigen">
            <Oksigen />
          </Route>
          <Route path="/admin/ruangan">
            <Ruangan />
          </Route>
          <Route path="/admin/sdm">
            <Sdm />
          </Route>
        </Template>
      </Switch>
    </>
  );
}

export default App;
