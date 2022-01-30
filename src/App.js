import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AddStudentstoMentor from "./pages/AddStudentstoMentor";
import AllStudentsforEachMentor from "./pages/AllStudentsforEachMentor";
import ChangeMentorforStudent from "./pages/ChangeMentorforStudent";
import NewMentor from "./pages/NewMentor";
import NewStudent from "./pages/NewStudent";
import ListAll from "./pages/ListAll";
import Navbar from "./pages/Navbar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <Routes>
            <Route path="/NewStudent" element={<NewStudent />} />

            <Route path="/NewMentor" element={<NewMentor />} />

            <Route
              path="/ChangeMentorforStudent"
              element={<ChangeMentorforStudent />}
            />
            <Route
              path="/AddStudentstoMentor"
              element={<AddStudentstoMentor />}
            />

            <Route
              path="/AllStudentsforEachMentor"
              element={<AllStudentsforEachMentor />}
            />

            <Route path="/"  element={<ListAll />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
