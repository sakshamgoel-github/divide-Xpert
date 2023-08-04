import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function NewGroupForm() {
  const navigate = useNavigate();
  const [groupName, setGroupName] = useState("");
  const [members, setMembers] = useState([{ id: 1, email: "" }]);
  const [error, setError] = useState(""); // State for displaying error message

  const handleMemberEmailChange = (id, newEmail) => {
    const updatedMembers = members.map((member) => {
      if (member.id === id) {
        return { ...member, email: newEmail };
      }
      return member;
    });
    setMembers(updatedMembers);
  };

  const handleAddMember = () => {
    const newMemberId = members.length + 1;
    setMembers([...members, { id: newMemberId, email: "" }]);
  };

  const handleRemoveMember = (id) => {
    const updatedMembers = members.filter((member) => member.id !== id);
    setMembers(updatedMembers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const memberEmails = members
      .filter((member) => member.email.length > 0)
      .map((member) => member.email);

    if (!isValidEmails(memberEmails)) {
      setError("Invalid email format");
      return;
    }

    const formData = {
      name: groupName,
      members: memberEmails,
    };
    try {
      // Send POST request using Axios
      await axios.post("http://localhost:3000/groups/", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        // Reset input fields after successful submission
        setGroupName("");
        setMembers([{ id: 1, email: "" }]);
        setError(""); // Clear error message
        const {id} = response.data;
        navigate(`/groups/${id}`); 
      });
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message); // Set error message from server response
      } else {
        setError("Error creating group");
      }
      console.error("Error creating group:", error.message);
    }
  };

  const isValidEmails = (emails) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emails.every((email) => emailPattern.test(email));
  };

  return (
    <>
      <h1>Create Group</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="groupName">Group Name</label>
        <input
          type="text"
          name="groupName"
          id="groupName"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        {members.map((member) => (
          <div key={member.id}>
            <label htmlFor="memberEmail">Member Email</label>
            <input
              id="memberEmail"
              type="email"
              value={member.email}
              onChange={(e) =>
                handleMemberEmailChange(member.id, e.target.value)
              }
            />
            <button type="button" onClick={handleAddMember}>
              +{" "}
            </button>
            {members.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveMember(member.id)}
              >
                -{" "}
              </button>
            )}
          </div>
        ))}
        <button type="submit">Create Group</button>
      </form>
    </>
  );
}

export default NewGroupForm;