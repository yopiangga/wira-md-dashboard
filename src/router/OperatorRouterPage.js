import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DashboardLayout } from "src/layouts/dahsboard";
import { HomeOperatorPage } from "src/pages/home/operator";
import { MapPage } from "src/pages/map";
import { MedicalRecordPage } from "src/pages/medical-record";
import { MedicalRecordAddPage } from "src/pages/medical-record/add";
import { MedicalRecordEditPage } from "src/pages/medical-record/edit";
import { MyProfilePage } from "src/pages/my-profile";
import { MyProfileEditPage } from "src/pages/my-profile/edit";
import { PatientPage } from "src/pages/patient";
import { PatientAddPage } from "src/pages/patient/add";
import { PatientEditPage } from "src/pages/patient/edit";

export default function OperatorRouterPage() {
  return (
    <BrowserRouter>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<HomeOperatorPage />} />

          <Route path="/patient" element={<PatientPage />} />
          <Route path="/patient/add" element={<PatientAddPage />} />
          <Route path="/patient/edit/:id" element={<PatientEditPage />} />

          <Route path="/medical-record" element={<MedicalRecordPage />} />
          <Route
            path="/medical-record/add"
            element={<MedicalRecordAddPage />}
          />
          <Route
            path="/medical-record/edit/:id"
            element={<MedicalRecordEditPage />}
          />

          <Route path="/map" element={<MapPage />} />

          <Route path="/me" element={<MyProfilePage />} />
          <Route path="/me/edit" element={<MyProfileEditPage />} />

          <Route path="*" element={<HomeOperatorPage />} exact />
        </Routes>
      </DashboardLayout>
    </BrowserRouter>
  );
}
