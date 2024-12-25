import { Link } from "@inertiajs/react";

const AppLogo = ({ className, variant, blue = false, props }) => {
    return (
        <Link className={variant} href="/" {...props} prefetch>
            <img
                src="cho.png"
                alt="Cho-App Logo"
                className={`md:w-[120px] md:h-[110px] w-[90px] h-[80px]
                    transition-all duration-300 hover:scale-110 ${
                        className ? className : ""
                    }`}
            />
        </Link>
    );
};

export default AppLogo;
