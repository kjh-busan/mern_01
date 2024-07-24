import React from 'react'
import './footer.css'

const Footer = () => (
    <footer className="storybook-footer">
        <div className="container">
            © {new Date().getFullYear()} Your Company. All rights reserved.
        </div>
    </footer>
)

export default Footer
