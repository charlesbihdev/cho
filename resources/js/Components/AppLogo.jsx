import { Link } from "@inertiajs/react";

const AppLogo = ({ className, variant, blue = false, props }) => {
    return (
        <Link className={variant} href="/" {...props} prefetch>
            <img
                src={blue ? "" : ""}
                alt="Cho-App Logo"
                className={`object-scale-down h-8 w-[8.8rem] xs:h-12 xs:w-[13.1rem]
                    transition-all duration-300 hover:scale-110 ${
                        className ? className : ""
                    }`}
            />
        </Link>
    );
};

export default AppLogo;
