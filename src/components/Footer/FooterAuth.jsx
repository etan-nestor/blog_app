import { FaFacebook, FaLinkedin, FaTwitter, FaInstagram, FaEnvelope } from 'react-icons/fa';

const FooterAuth = () => {
    return (
        <footer className="p-6 border-t border-gray-800 bg-[#0b162e]">
            <div className="container mx-auto">
                {/* Logo et description */}


                {/* Réseaux sociaux */}
                <div className="mt-6 flex justify-center space-x-6">
                    <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white"
                    >
                        <FaFacebook size={30} />
                    </a>
                    <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white"
                    >
                        <FaLinkedin size={30} />
                    </a>
                    <a
                        href="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white"
                    >
                        <FaTwitter size={30} />
                    </a>
                    <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white"
                    >
                        <FaInstagram size={30} />
                    </a>
                    <a
                        href="mailto:tech00.02in@gmail.com"
                        className="text-gray-400 hover:text-white"
                    >
                        <FaEnvelope size={30} />
                    </a>
                </div>

                {/* Auteur et droits réservés */}
                <div className="mt-4 text-center">
                    <p className="text-white text-lg">
                        © {new Date().getFullYear()} Nestor COMPAORE. Tous droits réservés.
                    </p>
                    <p className="text-gray-400 text-md">
                        Conception et développement par tech00.02in@gmail.com
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default FooterAuth;
