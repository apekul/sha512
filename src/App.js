import React from "react";
import { Input } from "./Components/Input";

function App() {
  return (
    // <div className={`flex flex-col w-auto ${darkMode ? "dark" : "light"}`}>
    <div className="w-screen h-screen flex flex-col items-center justify-center dark">
      <div className="max-w-xl w-full sm:w-94 h-auto flex flex-col justify-center">
        <div className="m-3 text-2xl text-center bg-blue-500 ">
          <h1>Password SHA512</h1>
        </div>
        <Input />
      </div>
    </div>
  );
}

export default App;
