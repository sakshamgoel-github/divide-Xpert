import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

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
      const response = await axios.get(`http://localhost:3000/groups/${id}`, {
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
      await axios.delete(`http://localhost:3000/groups/${id}`, {
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
      await axios.delete(`http://localhost:3000/groups/${id}/leaveGroup`, {
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
        `http://localhost:3000/groups/${id}/addUser`,
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
    <>
      <h1>Group Details</h1>
      {group ? (
        <>
          <h2>Group Name: {group.name}</h2>
          <p>Created At: {new Date(group.created_at).toLocaleDateString()}</p>
          <h3>Members:</h3>
          <ul>
            {group.members.map((member) => (
              <li key={member._id}>{member.name} </li>
            ))}
          </ul>
          {group.members.length > 1 && (
            <button onClick={handleLeaveGroup}>Leave Group</button>
          )}
          <button onClick={handleDeleteGroup}>Delete Group</button>
          <button
            onClick={() => {
              setAddMemberForm(true);
            }}
          >
            Add Member
          </button>
          {error && <p>{error}</p>}
          {addMemberForm && (
            <form onSubmit={addMemberFormSubmit}>
              <label htmlFor="memberEmail">Member Email</label>
              <input
                id="memberEmail"
                type="email"
                value={addMemberEmail}
                onChange={(e) => {
                  setAddMemberEmail(e.target.value);
                }}
              />
              <button type="submit">submit</button>
            </form>
          )}
        </>
      ) : (
        <p>Loading group details...</p>
      )}
    </>
  );
}

export default ViewGroup;
