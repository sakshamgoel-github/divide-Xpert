import { useState, useEffect } from "react";
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
      {groupsList.map((group) => {
        return (
            <div key={group._id}>
                <h3>{group.name}</h3>
                <h4>{group.members.map((m) => <p key={Math.random()}>{m}</p> )}</h4>
            </div>
        )
      })}
    </div>
  );
};

export default GroupsList;
