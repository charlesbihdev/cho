import { Link } from "@inertiajs/react";

const AppLogo = ({ className, variant, blue = false, props }) => {
    return (
        <Link className={variant} href="/" {...props} prefetch>
            <img
                src="cho.png"
                alt="Cho-App Logo"
                className={`w-16 h-18
                    transition-all duration-300 hover:scale-110 ${
                        className ? className : ""
                    }`}
            />
        </Link>
    );
};

export default AppLogo;
