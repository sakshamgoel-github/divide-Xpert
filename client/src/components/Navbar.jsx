import { Link } from "react-router-dom"
function Navbar() {
  return (
    <>
    <h1>DX</h1>
    <ul>
        <li><Link to={"/"}>Home</Link></li>
        <li><Link to={"/groups"}>All Groups</Link></li>
        <li><Link to={"/groups/new"}>Add Group</Link></li>
    </ul>
    </>
  )
}

export default Navbar