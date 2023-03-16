import React, { useState } from "react";
import { BsFillClipboardCheckFill, BsFillClipboardFill } from "react-icons/bs";

export const Hash = ({ password, generate }) => {
  const [result, setResult] = useState("");
  const [copyAlert, setCopyAlert] = useState(false);

  async function Sha512(str) {
    return crypto.subtle
      .digest("SHA-512", new TextEncoder("utf-8").encode(str))
      .then((buf) => {
        return Array.prototype.map
          .call(new Uint8Array(buf), (x) => ("00" + x.toString(16)).slice(-2))
          .join("");
      });
  }

  const encrypt = (item) => {
    Sha512(item).then((x) => setResult(x));
  };

  const copyToClipboard = () => {
    if (result.length > 0) {
      navigator.clipboard.writeText(result);
      setCopyAlert(true);
      setTimeout(() => {
        setCopyAlert(false);
      }, 1000);
    }
  };

  generate && encrypt(password);

  return (
    <div className="flex relative flex-col mt-5 items-between justify-center bg-500-red">
      <div className="relative w-auto h-auto">
        <span className="select-none">SHA512:</span>
        <div
          onClick={copyToClipboard}
          type="text"
          className="cursor-pointer break-words p-2.5 pb-10 sm:h-24 text-sm focus bg-gray-50 rounded-lg border border-gray-300"
        >
          {result}
        </div>
        <div
          onClick={copyToClipboard}
          className="absolute bottom-0 right-0 p-3 text-sm flex cursor-pointer"
        >
          {copyAlert ? (
            <BsFillClipboardCheckFill size="20" className="text-green-500" />
          ) : (
            <BsFillClipboardFill size="20" className="text-gray-300" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Hash;
