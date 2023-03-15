import React, { useState } from "react";
import { AiFillCopy } from "react-icons/ai";

export const Hash = ({ passwords }) => {
  const [result, setResult] = useState("");
  const [alert, setAlert] = useState(false);

  async function Sha512(str) {
    return crypto.subtle
      .digest("SHA-512", new TextEncoder("utf-8").encode(str))
      .then((buf) => {
        return Array.prototype.map
          .call(new Uint8Array(buf), (x) => ("00" + x.toString(16)).slice(-2))
          .join("");
      });
  }

  const filter = () => {
    let p = passwords.password.value;
    let c = passwords.confirm.value;
    let regEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,20}$/;
    if (regEx.test(p) && p === c) {
      encrypt(p);
    }
  };

  const encrypt = (item) => {
    Sha512(item).then((x) => setResult(x));
  };

  const copyToClipboard = () => {
    if (result.length > 0) {
      navigator.clipboard.writeText(result);
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 2000);
    }
  };

  return (
    <div className="flex relative flex-col mt-5 items-between justify-center bg-500-red">
      <div className="flex items-center sm:mx-10 justify-end">
        <button
          onClick={filter}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Encrypt
        </button>
      </div>
      <div className="relative w-auto h-auto ">
        <span>SHA512 :</span>
        <div
          onClick={copyToClipboard}
          type="text"
          className="cursor-pointer break-words p-2.5 pb-10 sm:h-24 text-sm focus text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          {result}
        </div>
        <div className="absolute bottom-0 right-0 p-3 text-sm flex">
          <p
            className={`${!alert && "invisible"} pr-1 text-green-500 font-bold`}
          >
            Copied!
          </p>
          <AiFillCopy size="20" className={`${alert && "animate-spin"}`} />
        </div>
      </div>
    </div>
  );
};

export default Hash;
