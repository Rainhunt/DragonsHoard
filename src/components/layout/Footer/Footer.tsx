import { useNavigate } from 'react-router-dom';
import Button from '../../Button/Button';
import './footer.scss';
import { ROUTES } from '../../../routes/routerModel';

export default function Footer() {
    const navigate = useNavigate();

    return (
        <footer>
            <div className="footer-content">
                <div className="footer-about">
                    <h3>Dragon's Hoard</h3>
                    <p>
                        Your ultimate D&D toolbox. We provide a comprehensive set of tools to enhance your gameplay, from monster guides to customizable themes and more!
                    </p>
                </div>
                <div className="footer-links">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><Button text="Home" onClick={() => navigate(ROUTES.ROOT)} /></li>
                        <li><Button text="About" onClick={() => navigate(ROUTES.ABOUT)} /></li>
                        <li><Button text="Codex" onClick={() => navigate(ROUTES.CODEX)} /></li>
                    </ul>
                </div>
                <div className="footer-links">
                    <h3>Follow Us</h3>
                    <ul>
                        <li><a href="https://rainhunt.github.io/webPortfolio/" target="_blank">Rain Made Studios</a></li>
                        <li><a href="https://www.linkedin.com/in/eitan-golombek-fullstack-developer/" target="_blank">LinkedIn</a></li>
                    </ul>
                </div>
            </div>
            <div className="footer-credits">
                <p>
                    {"\u00A9"} 2025 Dragon's Hoard. All Rights Reserved | Crafted by <a href="https://rainhunt.github.io/webPortfolio/" target="_blank">Rain Made Studios</a>
                </p>
            </div>
        </footer>
    )
}
