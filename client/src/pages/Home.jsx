function Home() {
  const fullHeightWrapperStyle = {
    minHeight: '87.2vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  };

  return (
    <div style={fullHeightWrapperStyle}>
      <div className="container mb-5" style={{ textAlign: 'center' }}>
        <p style={{ fontSize: '200px',color:'#D89216' }}>Divide Xpert</p>
        <p style={{ fontSize: '30px' ,color:'white'}}>
          Your ultimate destination for group management and expense tracking...
        </p>
      </div>
    </div>
  );
}

export default Home;
