import "./App.css";
import React from "react";
import { useContext, useEffect, useState } from "react";
import { AppContextProvider } from "./context/AppContextProvider";
import { UserContext } from "./context/UserContext";
import LoadComponent from "./components/load";
import AuthRouterPage from "./router/AuthRouterPage";
import { cookies } from "./services/config";
import { UsersServices } from "./services/AuthServices";
import OperatorRouterPage from "./router/OperatorRouterPage";
import AdminRouterPage from "./router/AdminRouterPage";
import { UserServices } from "./services/UserServices";

// const queryClient = new QueryClient();

function App() {
  return (
    <AppContextProvider>
      <UserManager />
    </AppContextProvider>
  );
}

export default App;

function UserManager() {
  const userServices = new UserServices();
  const { user, setUser } = useContext(UserContext);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    fetch();
  }, []);

  async function fetch() {
    const token = cookies?.token ?? "";

    if (token === "" || token === undefined) {
      setUser(null);
    } else {
      const res = await userServices.myProfile();
      if (res) {
        setUser(res.data);
      } else {
        setUser(null);
      }
    }

    setLoad(false);
  }

  if (load) {
    return (
      <div className="w-full h-screen flex justify-center items-center bg-white">
        <LoadComponent />
      </div>
    );
  } else if (user == null && load == false) {
    return <AuthRouterPage />;
  } else if (user.role === "operator") {
    return <OperatorRouterPage />;
  } else if (user.role === "admin") {
    return <AdminRouterPage />;
  } else {
    return <AuthRouterPage />;
  }
}
