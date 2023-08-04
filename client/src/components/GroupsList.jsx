import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const GroupsList = () => {
  const [groupsList, setGroupsList] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3000/groups").then((response) => {
      setGroupsList(response.data);
    });
  }, []);
  return (
    <div>
      <h1>Groups List</h1>
      <Link to={"/"}>Home</Link>
      <br />
      <Link to={"new"}>Add Group</Link>
      {groupsList.map((group) => (
        <div key={group._id}>
          <h2>{group.name}</h2>
          <p>Created At: {new Date(group.created_at).toLocaleDateString()}</p>
          <Link to={group._id}>View Group</Link>
        </div>
      ))}
    </div>
  );
};

export default GroupsList;
