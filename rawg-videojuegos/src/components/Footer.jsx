import { FaTiktok, FaTwitter, FaInstagram } from "react-icons/fa";

function Footer() {
    return (
        <footer className="bg-gradient-to-r from-[#212121] to-[#3498db] text-gray-300 py-8 left-0 right-0  w-full mt-auto ">
            <div className="container mx-auto px-4 lg:px-16">
                {/* Top Section */}
                <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start border-b border-gray-700 pb-6 mb-6">
                    {/* Logo Section */}
                    <div className="text-center lg:text-left mb-6 lg:mb-0">
                        <div className="flex items-center justify-center lg:justify-start space-x-2">
                            <img 
                                src="/logo.png" 
                                alt="RAWG Logo" 
                                className="w-12 h-12 object-contain"
                            />
                            <h2 className="text-2xl font-bold text-white">RAWG Videojuegos</h2>
                        </div>
                        <p className="mt-2">&copy; 2025 Todos los derechos reservados.</p>
                    </div>
                    <nav className="space-y-2 lg:space-y-0 lg:space-x-6">
                        <a href="/privacy" className="text-white hover:text-yellow-400 transition">Política de Privacidad</a>
                        <a href="/terms" className="text-white hover:text-yellow-400 transition">Términos y Condiciones</a>
                    </nav>
                </div>

                {/* Social Media Section */}
                <div className="text-center">
                    <p className="mb-4">Síguenos en nuestras redes sociales:</p>
                    <div className="flex justify-center space-x-6">
                        <a
                            href="https://www.tiktok.com/@ivvn.cr?_t=ZN-8tRfgFQxYF4&_r=1"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="TikTok"
                            className="text-gray-300 hover:text-yellow-400 text-xl transition"
                        >
                            <FaTiktok />
                        </a>
                        <a
                            href="https://x.com/IvnCr33?t=5t_ohj2JSfideMibQO4Ang&s=09"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Twitter"
                            className="text-gray-300 hover:text-yellow-400 text-xl transition"
                        >
                            <FaTwitter />
                        </a>
                        <a
                            href="https://www.instagram.com/ivn.cr/profilecard/?igsh=a285OG01cWg3dHk0"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram"
                            className="text-gray-300 hover:text-yellow-400 text-xl transition"
                        >
                            <FaInstagram />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;


