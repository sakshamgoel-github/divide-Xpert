import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Transaction from "./Transaction";
import url from "../url";
import ClipLoader from "react-spinners/ClipLoader";

function ViewGroup() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [group, setGroup] = useState(null);
  const [addMemberForm, setAddMemberForm] = useState(false);
  const [addMemberEmail, setAddMemberEmail] = useState("");
  const [error, setError] = useState("");

  async function fetchGroupDetails() {
    try {
      let user = localStorage.getItem("user");
      user = JSON.parse(user);
      const response = await axios.get(`${url}/groups/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setGroup(response.data);
    } catch (error) {
      console.error("Error fetching group details:", error.message);
    }
  }
  useEffect(() => {
    fetchGroupDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleDeleteGroup = async () => {
    try {
      let user = localStorage.getItem("user");
      user = JSON.parse(user);
      await axios.delete(`${url}/groups/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      navigate("/groups"); // Use navigate to go back to home page
    } catch (error) {
      console.error("Error deleting group:", error.message);
    }
  };

  const handleLeaveGroup = async () => {
    try {
      let user = localStorage.getItem("user");
      user = JSON.parse(user);
      await axios.delete(`${url}/groups/${id}/leaveGroup`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      navigate("/");
    } catch (error) {
      console.error("Error leaving group:", error.message);
    }
  };

  const addMemberFormSubmit = async (e) => {
    e.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(addMemberEmail)) {
      setError("Invalid email format");
      return;
    }
    try {
      let user = localStorage.getItem("user");
      user = JSON.parse(user);
      await axios.put(
        `${url}/groups/${id}/addUser`,
        {
          email: addMemberEmail,
        }, // Send member email in the request body
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setAddMemberEmail(""); // Clear the input field
      setAddMemberForm(false); // Close the form
      setError("");
      fetchGroupDetails(); // Refresh group details
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred while adding the member.");
      }
    }
  };

  return (
    <div className="container pt-3">
      <h1>Group Details</h1>
      {group ? (
        <div>
          <h2>Group Name: {group.name}</h2>
          <p>Created At: {new Date(group.created_at).toLocaleDateString()}</p>
          <h3>Members:</h3>
          <ul className="list-group">
            {group.members.map((member) => (
              <li className="list-group-item" key={member._id}>
                {member.name}
              </li>
            ))}
          </ul>
          {group.members.length > 1 && (
            <button className="btn btn-danger me-2 mb-2 mt-2" onClick={handleLeaveGroup}>
              Leave Group
            </button>
          )}
          <button className="btn btn-danger me-2 mb-2 mt-2" onClick={handleDeleteGroup}>
            Delete Group
          </button>
          <button
            className="btn btn-primary me-2 mb-2 mt-2"
            onClick={() => {
              setAddMemberForm(true);
            }}
          >
            Add Member
          </button>
          {error && <p className="alert alert-danger">{error}</p>}
          {addMemberForm && (
            <form onSubmit={addMemberFormSubmit}>
              <div className="mb-3">
                <label htmlFor="memberEmail" className="form-label">
                  Member Email
                </label>
                <input
                  id="memberEmail"
                  type="email"
                  className="form-control"
                  value={addMemberEmail}
                  onChange={(e) => {
                    setAddMemberEmail(e.target.value);
                  }}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          )}
          <Transaction />
        </div>
      ) : (
        <ClipLoader/>
      )}
    </div>
);
}

export default ViewGroup;
