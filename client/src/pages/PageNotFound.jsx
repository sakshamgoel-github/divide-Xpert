function PageNotFound() {
  const fullHeightWrapperStyle = {
    minHeight: "87.2vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#252525",
  };

  const headingStyle = {
    fontSize: "5rem",
    color: "red",
    marginBottom: "1rem",
  };

  const textBlockStyle = {
    fontSize: "1.5rem",
    color: "white",
    maxWidth: "80%",
    textAlign: "center",
  };

  return (
    <div style={fullHeightWrapperStyle}>
      <div className="container" style={{ textAlign: "center" }}>
        <h1 style={headingStyle}>404 Error</h1>
        <p style={textBlockStyle}>
        The Survey Corps is out there, mapping this page&lsquo;s location.
        Meanwhile, let&rsquo;s wait at the Wall and hope for updates.
        </p>
      </div>
    </div>
  );
}

export default PageNotFound;
