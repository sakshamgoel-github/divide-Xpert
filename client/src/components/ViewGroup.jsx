import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function ViewGroup() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [group, setGroup] = useState(null);

  async function fetchGroupDetails() {
    try {
      const response = await axios.get(`http://localhost:3000/groups/${id}`);
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
      await axios.delete(`http://localhost:3000/groups/${id}`);
      navigate("/groups"); // Use navigate to go back to home page
    } catch (error) {
      console.error("Error deleting group:", error.message);
    }
  };

  const handleDeleteMember = async (userId) => {
    try {
      await axios.put(
        `http://localhost:3000/groups/${id}/deleteUser/${userId}`
      );
      // Refresh the group details after deleting the member
      fetchGroupDetails();
    } catch (error) {
      console.error("Error deleting member:", error.message);
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
              <li key={member._id}>
                {member.name}{" "}
                {group.members.length > 1 && ( // Only render delete button if more than one member
                  <button onClick={() => handleDeleteMember(member._id)}>
                    Delete Member
                  </button>
                )}
              </li>
            ))}
          </ul>
          <button onClick={handleDeleteGroup}>Delete Group</button>
        </>
      ) : (
        <p>Loading group details...</p>
      )}
    </>
  );
}

export default ViewGroup;
