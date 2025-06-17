import { Clock, Phone } from "lucide-react";

const DeliveryInfoBanner = () => {
    const currentYear = new Date().getFullYear();

    return (
        <div className="w-full bg-[#493711] text-white p-4 shadow-lg">
            <div className="max-w-4xl mx-auto">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-amber-300" />
                        <p className="text-sm">
                            Delivery window:{" "}
                            <span className="font-medium">
                                11:30 AM - 9:30 PM
                            </span>
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <Phone className="w-5 h-5 text-amber-300" />
                        <p className="text-sm">
                            Support:{" "}
                            <span className="font-medium">053 721 0036</span>
                        </p>
                    </div>
                </div>

                <p className="text-xs text-amber-200 mt-2 text-center sm:text-left">
                    Note: Deliveries requested outside operating hours will be
                    scheduled for the next available delivery window.
                </p>

                <div className="mt-4 text-xs text-amber-200 text-center sm:text-right">
                    © {currentYear} CHO. Developed by{" "}
                    <a
                        href="https://linktr.ee/charlesbihdev"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-white"
                    >
                        charlesbihdev
                    </a>
                </div>
            </div>
        </div>
    );
};

export default DeliveryInfoBanner;
