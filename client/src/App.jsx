import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import GroupsList from "./components/GroupsList";
import NewGroupForm from "./components/NewGroupForm";
import PageNotFound from "./components/PageNotFound";
import ViewGroup from "./components/ViewGroup";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {user && (
          <>
            <Route path="/groups" element={<GroupsList />} />
            <Route path="/groups/new" element={<NewGroupForm />} />
            <Route path="/groups/:id" element={<ViewGroup />} />
          </>
        )}

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
