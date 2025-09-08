

function Navbar() {
  return (
    <div style={{background: 'rgba(30, 30, 30, 0.95)',margin: '10px', padding: '10px', borderRadius: '10px', display: 'flex', gap: '10px', justifyContent: 'space-between', alignItems: 'center' , width: '100%'}}>
        <a href="/" style={{color: 'white', textDecoration: 'none', fontSize: '16px', fontWeight: 'bold'}}>Home</a>
        <a href="/login" style={{color: 'white', textDecoration: 'none', fontSize: '16px', fontWeight: 'bold'}}>Login</a>
        <a href="/register" style={{color: 'white', textDecoration: 'none', fontSize: '16px', fontWeight: 'bold'}}>Register</a>
    </div>
  )
}

export default Navbar