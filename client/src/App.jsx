import Home from "./components/Home";
import GroupsList from "./components/GroupsList";
import NewGroupForm from "./components/NewGroupForm";
import { Route, Routes } from "react-router-dom"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/groups" element={<GroupsList/>}></Route>
        <Route path="/groups/new" element={<NewGroupForm/>}></Route>
      </Routes>
    </>
  );
}

export default App;
