import React, { useState } from "react";
import Hash from "./Hash";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export const Input = () => {
  const [passwords, setPasswords] = useState({
    password: { value: "", visible: false },
    confirm: { value: "", visible: false },
  });

  // !!!Merge 'update' functions!!!
  const updatePasswords = (e, item) => {
    setPasswords({
      ...passwords,
      [item]: { ...passwords[item], value: e },
    });
  };

  const updateVisible = (item) => {
    setPasswords({
      ...passwords,
      [item]: { ...passwords[item], visible: !passwords[item].visible },
    });
  };
  //

  return (
    <>
      <div className="border rounded-lg shadow mx-3 mt-3 p-5 bg-gray-800 border-gray-700">
        <form className="space-y-2">
          {Object.keys(passwords).map((item, index) => (
            <div key={index} className="relative">
              <label className="block mb-2 text-sm font-mediumtext-white">
                {item}
              </label>
              <input
                type={passwords[item].visible ? "text" : "password"}
                className="block p-2.5 w-full z-20 text-sm rounded-lg border-l-2 border dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="••••••••"
                maxLength="20"
                value={passwords[item].value}
                onChange={(e) => updatePasswords(e.target.value, item)}
              />
              {item === "password" && (
                <p className="text-gray-400 p-1 text-sm text-center sm:text-start">
                  Your Password must be 8-20 characters long and be combination
                  of uppercase letters, lowercase letters, numbers and symbols.{" "}
                </p>
              )}
              <div
                onClick={() => updateVisible(item)}
                className="absolute top-7 right-0 p-3 text-sm text-gray-500"
              >
                {passwords[item].visible ? (
                  <AiFillEye size="20" />
                ) : (
                  <AiFillEyeInvisible size="20" />
                )}
              </div>
            </div>
          ))}
        </form>
        <Hash passwords={passwords} />
      </div>
    </>
  );
};

export default Input;
