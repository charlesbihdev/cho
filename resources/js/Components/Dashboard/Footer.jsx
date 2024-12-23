import { FaUtensils } from "react-icons/fa6";
const Footer = () => {
    return (
        <footer className="bg-blue-900 ">
            <p className="text-white p-4 text-base text-center font-semibold">
                Copyright &copy; {new Date().getFullYear()} Cho.
            </p>
        </footer>
    );
};

export default Footer;
