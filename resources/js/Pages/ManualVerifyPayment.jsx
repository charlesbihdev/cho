import { Head, useForm } from "@inertiajs/react";
import ToastProvider from "@/Layouts/ToastProvider";
import Header from "@/Components/Header";
import { router } from "@inertiajs/react";

import InputError from "@/Components/InputError";
import DeliveryInfoBanner from "@/Components/DeliveryInfoBanner";

export default function ManualVerifyPayment({ trxref }) {
    const { get, processing, errors } = useForm();

    const handleVerify = (e) => {
        e.preventDefault();

        get(
            route("paystack.callback", {
                trxref: trxref,
            }),
            {
                preserveScroll: true,
                preserveState: true,
            }
        );
    };

    return (
        <>
            <Head title="Verify Payment" />

            <ToastProvider>
                <Header />
                <div className="w-full flex items-center justify-center mx-auto py-10 px-4 text-center min-h-[75vh]">
                    <div>
                        <h1 className="text-2xl font-bold mb-4">
                            Having trouble with payment?
                        </h1>
                        <p className="mb-6 text-gray-600">
                            Click the button below to manually verify your
                            payment.
                        </p>
                        <form onSubmit={handleVerify}>
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-[#FBB60E] text-[#493711] px-6 py-3 rounded-full font-bold hover:bg-[#E4BF57] transition-colors"
                            >
                                {processing ? "Verifying..." : "Verify Payment"}
                            </button>
                            <InputError
                                message={errors.trxref}
                                className="mt-4"
                            />
                        </form>
                    </div>
                </div>
            </ToastProvider>
            <DeliveryInfoBanner />
        </>
    );
}
