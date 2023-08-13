function Home() {
  const fullHeightWrapperStyle = {
    minHeight: '87.2vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  };

  const headingStyle = {
    fontSize: '5rem',
    color: '#D89216',
    marginBottom: '1rem',
  };

  const subheadingStyle = {
    fontSize: '1.5rem',
    color: 'white',
  };

  const containerStyle = {
    textAlign: 'center',
    padding: '2rem',
    maxWidth: '800px',
  };

  return (
    <div style={fullHeightWrapperStyle}>
      <div className="container" style={containerStyle}>
        <h1 style={headingStyle}>Divide Xpert</h1>
        <p style={subheadingStyle}>
          Your ultimate destination for group management and expense tracking...
        </p>
      </div>
    </div>
  );
}

export default Home;
