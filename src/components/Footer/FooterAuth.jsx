import Logo from '../../assets/Logo.png';
import { FaFacebook, FaLinkedin, FaTwitter, FaInstagram, FaEnvelope } from 'react-icons/fa';

const FooterAuth = () => {
    return (
        <footer className="p-6 border-t border-gray-800 bg-[#0b162e]">
            <div className="container mx-auto">
                {/* Logo et description */}
                <div className="flex flex-col items-center md:items-start md:flex-row md:justify-between">
                    <div className="mb-4 md:mb-0 flex flex-col items-center md:items-start">
                        <img className="cursor-pointer w-[120px] mb-3" src={Logo} alt="Logo" />
                        <p className="text-white text-sm text-center md:text-left">
                            Simplifiez votre expérience numérique avec des solutions innovantes.
                        </p>
                    </div>

                    {/* Liens rapides */}
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                        <div className="text-center md:text-left">
                            <h4 className="text-white font-bold mb-2">Liens rapides</h4>
                            <ul className="space-y-1">
                                <li>
                                    <a href="#about" className="text-gray-400 hover:text-white text-sm">
                                        À propos
                                    </a>
                                </li>
                                <li>
                                    <a href="#services" className="text-gray-400 hover:text-white text-sm">
                                        Services
                                    </a>
                                </li>
                                <li>
                                    <a href="#contact" className="text-gray-400 hover:text-white text-sm">
                                        Contact
                                    </a>
                                </li>
                                <li>
                                    <a href="#blog" className="text-gray-400 hover:text-white text-sm">
                                        Blog
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Ressources */}
                        <div className="text-center md:text-left">
                            <h4 className="text-white font-bold mb-2">Ressources</h4>
                            <ul className="space-y-1">
                                <li>
                                    <a href="#help" className="text-gray-400 hover:text-white text-sm">
                                        Centre aide
                                    </a>
                                </li>
                                <li>
                                    <a href="#faq" className="text-gray-400 hover:text-white text-sm">
                                        FAQ
                                    </a>
                                </li>
                                <li>
                                    <a href="#privacy" className="text-gray-400 hover:text-white text-sm">
                                        Politique de confidentialité
                                    </a>
                                </li>
                                <li>
                                    <a href="#terms" className="text-gray-400 hover:text-white text-sm">
                                        Conditions générales
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Réseaux sociaux */}
                <div className="mt-6 flex justify-center space-x-6">
                    <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white"
                    >
                        <FaFacebook size={20} />
                    </a>
                    <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white"
                    >
                        <FaLinkedin size={20} />
                    </a>
                    <a
                        href="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white"
                    >
                        <FaTwitter size={20} />
                    </a>
                    <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white"
                    >
                        <FaInstagram size={20} />
                    </a>
                    <a
                        href="mailto:tech00.02in@gmail.com"
                        className="text-gray-400 hover:text-white"
                    >
                        <FaEnvelope size={20} />
                    </a>
                </div>

                {/* Auteur et droits réservés */}
                <div className="mt-4 text-center">
                    <p className="text-white text-sm">
                        © {new Date().getFullYear()} Nestor COMPAORÉ. Tous droits réservés.
                    </p>
                    <p className="text-gray-400 text-xs">
                        Conception et développement par tech00.02in@gmail.com
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default FooterAuth;
