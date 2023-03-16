import React, { useState } from "react";
import Hash from "./Hash";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export const Input = () => {
  const [fields, setFields] = useState({
    password: { value: "", visible: false, valid: true },
    confirm: { value: "", visible: false, valid: true },
  });

  const updateField = (name, key, value) => {
    setFields({
      ...fields,
      [name]: {
        ...fields[name],
        [key]: value,
        valid: isValid(fields, name, value),
      },
    });
  };

  const isValid = (fields, name, value) => {
    if (name === "confirm") {
      if (fields.password.value !== value) return "hasła musza się zgadzać";
      return true;
    }
    if (false === /[a-z]/g.test(value))
      return "Wymagana przynajmniej 1 mała litera";
    if (false === /[A-Z]/g.test(value))
      return "Wymagana przynajmniej 1 duża litera";
    if (false === /[0-9]/g.test(value)) return "Wymagana przynajmniej 1 liczba";
    if (false === /[#$@!%&*?]/g.test(value))
      return "Wymagana przynajmniej 1 znak specjalny";
    if (false === /.{8,}/g.test(value))
      return "Wymagana długośc to minimum 8 znaków";

    return true;
  };

  return (
    <>
      <div className="border rounded-lg shadow mx-3 mt-3 p-5 border-gray-700">
        <form className="space-y-2">
          {Object.keys(fields).map((item, index) => (
            <div key={index} className="relative">
              <label className="block mb-2 text-sm font-medium">
                {item[0].toUpperCase() + item.slice(1)}
                {index === 1 && " Password"}
              </label>
              <input
                type={fields[item].visible ? "text" : "password"}
                className={`block p-2.5 w-full z-20 text-sm rounded-lg border-l-2 border border-gray-500 focus:outline-black-500  ${
                  fields[item].valid !== true &&
                  "border-orange-500 border-2 focus:outline-orange-500"
                }`}
                placeholder="••••••••"
                maxLength="20"
                value={fields[item].value}
                onChange={(e) => updateField(item, "value", e.target.value)}
              />

              {item === "password" && (
                <p className="p-1 text-xs text-center sm:text-start text-gray-400">
                  Your password must be 8-20 characters long, contain uppercase
                  and lowercase letters, numbers and symbols.{" "}
                </p>
              )}

              <span
                className={`select-none text-xs px-2 font-bold text-red-400 ${
                  fields[item].valid !== true ? "visible" : "invisible"
                }`}
              >
                {fields[item].valid}
              </span>

              <div
                onClick={() =>
                  updateField(item, "visible", !fields[item].visible)
                }
                className="absolute top-7 right-0 p-3 text-sm"
              >
                {fields[item].visible ? (
                  <AiFillEye size="20" className="text-gray-500" />
                ) : (
                  <AiFillEyeInvisible size="20" className="text-gray-300" />
                )}
              </div>
            </div>
          ))}
        </form>

        <Hash
          password={fields.password.value}
          generate={
            fields.password.value === fields.confirm.value &&
            fields.password.valid === true &&
            fields.password.value !== ""
          }
        />
      </div>
    </>
  );
};

export default Input;
