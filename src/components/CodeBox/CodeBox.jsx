import React, { useRef, useState } from "react";
import "./CodeBox.css";

// Java - java
// Python - python
// Python3 - python3
// C - c
// C++ - cpp
// C++14 - cpp14
// C# - Csharp
// Perl - perl
// PHP - php
// Scala - scala

const CodeBox = () => {
  const [output, setOutput] = useState({});
  const [ipCode, setIpCode] = useState("");
  const [ipInput, setIpInput] = useState("");
  const [ipLang, setIpLang] = useState("python3");

  const handleCode = async () => {
    const ipData = { language: ipLang, code: ipCode, input: ipInput };
    try {
      const response = await fetch("http://localhost:3001/api/compiler", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ipData),
      });

      const data = await response.json();
      setOutput(data);
      console.log(data); // Log the received data
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleIpCode = (e) => {
    setIpCode(e.target.value);
  };
  const handleIpInput = (e) => {
    setIpInput(e.target.value);
  };
  const handleIpLang = () => {};

  return (
    <div>
      <textarea
        value={ipCode}
        onChange={handleIpCode}
        name="codeText"
        id="codeText"
        cols="30"
        rows="10"
      />
      <textarea
        value={ipInput}
        onChange={handleIpInput}
        name="ipText"
        id="ipText"
        cols="30"
        rows="10"
      />
      <textarea name="opText" id="ipText" cols="30" rows="10" readOnly />
      <button onClick={handleCode}>Run</button>
    </div>
  );
};

export default CodeBox;
