// Footer.js 또는 Footer.tsx
import React from 'react'
import './footer.css' // Footer 컴포넌트의 스타일을 위한 CSS 파일

const Footer = () => (
    <footer className="storybook-footer">
        <div className="container">
            © {new Date().getFullYear()} Your Company. All rights reserved.
        </div>
    </footer>
)

export default Footer
