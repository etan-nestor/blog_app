import { FaFacebook, FaLinkedin, FaTwitter, FaInstagram, FaEnvelope } from 'react-icons/fa';

const FooterAuth = () => {
    return (
        <footer className="py-8 border-t border-gray-700 bg-[#0b162e]">
            <div className="container mx-auto max-w-4xl text-center px-4">

                {/* Réseaux sociaux */}
                <div className="mt-4 flex justify-center flex-wrap gap-4 md:gap-6">
                    {[
                        { href: "https://facebook.com", icon: <FaFacebook size={28} />, label: "Facebook" },
                        { href: "https://linkedin.com", icon: <FaLinkedin size={28} />, label: "LinkedIn" },
                        { href: "https://twitter.com", icon: <FaTwitter size={28} />, label: "Twitter" },
                        { href: "https://instagram.com", icon: <FaInstagram size={28} />, label: "Instagram" },
                        { href: "mailto:tech00.02in@gmail.com", icon: <FaEnvelope size={28} />, label: "Email" }
                    ].map((item, index) => (
                        <a
                            key={index}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-300 hover:text-white transition transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white p-2"
                            aria-label={`Visitez notre page ${item.label}`}
                        >
                            {item.icon}
                        </a>
                    ))}
                </div>

                {/* Auteur et droits réservés */}
                <div className="mt-6 text-center">
                    <p className="text-white text-sm md:text-md font-semibold">
                        © {new Date().getFullYear()} Nestor COMPAORE. Tous droits réservés.
                    </p>
                    <p className="text-gray-400 text-xs md:text-sm">
                        Conception et développement par <a href="mailto:tech00.02in@gmail.com" className="hover:text-white transition">tech00.02in@gmail.com</a>
                    </p>
                </div>

            </div>
        </footer>
    );
};

export default FooterAuth;
