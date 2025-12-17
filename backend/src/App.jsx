import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./components/Layout";
import TeacherInfoPage from "./components/TeacherInfoPage";
import ExamSelectionPage from "./components/ExamSelectionPage";
import ContactSupport from "./components/ContactSupport";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route path="/info" element={<TeacherInfoPage />} />
          <Route path="/exams" element={<ExamSelectionPage />} />
          <Route path="/contact" element={<ContactSupport />} />
          {/* Redirect old path or default to info */}
          <Route path="/supervision-form" element={<Navigate to="/info" replace />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;