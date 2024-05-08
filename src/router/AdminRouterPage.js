import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DashboardLayout } from "src/layouts/dahsboard";
import { HomeAdminPage } from "src/pages/home/admin";
import { HospitalPage } from "src/pages/hospital";
import { HospitalAddPage } from "src/pages/hospital/add";
import { HospitalEditPage } from "src/pages/hospital/edit";
import { MedicalRecordPage } from "src/pages/medical-record";
import { MedicalRecordAddPage } from "src/pages/medical-record/add";
import { MedicalRecordEditPage } from "src/pages/medical-record/edit";
import { MyProfilePage } from "src/pages/my-profile";
import { MyProfileEditPage } from "src/pages/my-profile/edit";
import { PatientPage } from "src/pages/patient";
import { PatientAddPage } from "src/pages/patient/add";
import { PatientEditPage } from "src/pages/patient/edit";
import { UserPage } from "src/pages/user";
import { UserAddPage } from "src/pages/user/add";
import { UserEditPage } from "src/pages/user/edit";

export default function AdminRouterPage() {
  return (
    <BrowserRouter>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<HomeAdminPage />} />

          <Route path="/hospital" element={<HospitalPage />} />
          <Route path="/hospital/add" element={<HospitalAddPage />} />
          <Route path="/hospital/edit/:id" element={<HospitalEditPage />} />

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

          <Route path="/user" element={<UserPage />} />
          <Route path="/user/add" element={<UserAddPage />} />
          <Route path="/user/edit/:id" element={<UserEditPage />} />

          <Route path="/me" element={<MyProfilePage />} />
          <Route path="/me/edit" element={<MyProfileEditPage />} />

          <Route path="*" element={<HomeAdminPage />} exact />
        </Routes>
      </DashboardLayout>
    </BrowserRouter>
  );
}
