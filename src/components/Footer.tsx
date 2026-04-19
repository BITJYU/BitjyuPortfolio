import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <p className="footer-copy">
          © {new Date().getFullYear()} Soomin Jo. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
