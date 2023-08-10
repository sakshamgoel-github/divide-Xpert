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
          Looks like this page embarked on a journey to find the legendary
          &lsquo;One Piece.&rsquo; We&apos;re still navigating the Grand Line
        </p>
      </div>
    </div>
  );
}

export default PageNotFound;
