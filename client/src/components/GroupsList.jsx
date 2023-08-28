import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import url from "../url";
import ClipLoader from "react-spinners/ClipLoader";

const GroupsList = () => {
  console.log(url);
  const [groupsList, setGroupsList] = useState([]);
  useEffect(() => {
    let user = localStorage.getItem("user");
    user = JSON.parse(user);
    axios
      .get(`${url}/groups`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        setGroupsList(response.data);
      });
  }, []);

  return (
    <div className="container pt-3">
      <h1 className="mb-4">Groups List</h1>
      {groupsList.length == 0 ? (
        <ClipLoader/>
      ) : (
        groupsList.map((group) => (
          <div className="card mb-3" key={group._id}>
            <div className="card-body">
              <h5 className="card-title">{group.name}</h5>
              <p className="card-text">
                Created At: {new Date(group.created_at).toLocaleDateString()}
              </p>
              <Link to={group._id} className="btn btn-primary">
                View Group
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default GroupsList;
