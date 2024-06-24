import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { SidebarProvider, Sidebar } from "./components/Sidebar";
import LandingPage from "./components/LandingPage";
import Task from "./components/Tasks";
import Task1 from "./components/Tasks1";
import Users from "./components/Users";
import UserSB from "./components/Users";
import Userid from "./components/Userid";
import Navbar from "./components/Navbar";
// import WebLayout from './components/HodComp';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Router>
      {/* <WebLayout> */}
      <SidebarProvider>
        <div className={`app-wrapper ${sidebarOpen ? "sidebar-open" : ""}`}>
          <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
          <div className="main-content">
            <Navbar toggleSidebar={toggleSidebar} />
            <div className="content">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/landingpage" element={<LandingPage />} />

                {/*Routes for My Tasks*/}

                <Route path="/alltasks1" element={<Task1 />} />
                <Route
                  path="/pendingtasks1"
                  element={<Task1 filterType="progress" />}
                />
                <Route
                  path="/completedtasks1"
                  element={<Task1 filterType="completed" />}
                />
                <Route path="/yettasks1" element={<Task1 filterType="yet" />} />

                {/*Routes for My Profile*/}

                <Route path="/alltasks" element={<Task />} />
                <Route
                  path="/pendingtasks"
                  element={<Task filterType="progress" />}
                />
                <Route
                  path="/completedtasks"
                  element={<Task filterType="completed" />}
                />
                <Route path="/yettasks" element={<Task filterType="yet" />} />
                <Route path="/users" element={<UserSB />} />
                <Route path="/user/:userName" element={<Userid />} />
                <Route path="/allusers" element={<Users />} />
              </Routes>
            </div>
          </div>
        </div>
      </SidebarProvider>
      {/* </WebLayout> */}
    </Router>
  );
}
