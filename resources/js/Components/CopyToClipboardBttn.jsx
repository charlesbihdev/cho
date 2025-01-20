import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

const CopyToClipboardBttn = ({ data }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset the "copied" state after 2 seconds
    };

    // Generate the text to copy
    const generateCopyText = () => {
        return `
      Order ID: ${data.orderId}
      Food Name: ${data.foodName}
      Variant: ${data.variant}
      Vendor: ${data.vendor}
      Note: ${data.note || "None"}
      Variant Price: ${data.price}
      Qty: ${data.quantity}
      Name: ${data.name}
      Phone: ${data.phone}
    `;
    };

    return (
        <div className="inline-block text-center mt-2 ">
            <CopyToClipboard text={generateCopyText()} onCopy={handleCopy}>
                <button
                    className={`px-6 py-1 rounded-lg text-white font-medium transition ${
                        copied
                            ? "bg-green-500"
                            : "bg-blue-500 hover:bg-blue-600"
                    }`}
                >
                    {copied ? "Copied!" : "Copy"}
                </button>
            </CopyToClipboard>
        </div>
    );
};

export default CopyToClipboardBttn;
