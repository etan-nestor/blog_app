import Logo from '../../assets/Logo.png';
const Footer = () => {
  return (
    <footer className="p-4 border-t border-gray-800 bg-[#0b162e]">
      <p className="text-md text-center text-white">
      <div className="justify-center mb-1 flex items-center">
            <img className='cursor-pointer w-[100px]' src={Logo} alt="Logo" />
         </div>
        © {new Date().getFullYear()} tech00.02in@gmail.com ! All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
