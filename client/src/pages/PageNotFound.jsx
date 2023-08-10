function PageNotFound() {
  const fullHeightWrapperStyle = {
    minHeight: "87.2vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#252525",
  };

  return (
    <div style={fullHeightWrapperStyle}>
      <div className="container mb-5" style={{ textAlign: "center" }}>
        <p style={{ fontSize: "200px", color: "red" }}>404Error</p>
        <p style={{ fontSize: "50px", color: "white" }}>
          The page took a vacation and forgot to leave a forwarding
          address...  
        </p>
      </div>
    </div>
  );
}

export default PageNotFound;
