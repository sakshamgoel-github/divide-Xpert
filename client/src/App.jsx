import Home from "./components/Home";
import GroupsList from "./components/GroupsList";
import NewGroupForm from "./components/NewGroupForm";
import PageNotFound from "./components/PageNotFound";
import ViewGroup from "./components/ViewGroup";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom"

function App() {
  return (
    <>
    <nav>
      <Navbar />
    </nav>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/groups" element={<GroupsList/>}></Route>
        <Route path="/groups/:id" element={<ViewGroup/>}></Route>
        <Route path="/groups/new" element={<NewGroupForm/>}></Route>
        <Route path="*" element={<PageNotFound/>}></Route>
      </Routes>
    </>
  );
}

export default App;
