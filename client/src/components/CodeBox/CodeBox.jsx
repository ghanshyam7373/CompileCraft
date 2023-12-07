import React, { useRef, useState } from "react";
import "./CodeBox.css";
import Languages from "../../data/Languages";
import Loader from "../Loader/Loader";

const CodeBox = () => {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");
  const [ipCode, setIpCode] = useState("");
  const [ipInput, setIpInput] = useState("");
  const [ipLang, setIpLang] = useState("python3");

  const handleCode = async () => {
    const ipData = { language: ipLang, code: ipCode, input: ipInput };
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3001/api/compiler", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ipData),
      });

      const data = await response.json();
      setLoading(false);
      if (data.rntError) {
        setOutput(data.rntError);
      } else if (data.cmpError) {
        setOutput(data.cmpError);
      } else {
        setOutput(data.output);
      }
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
  const handleIpLang = (e) => {
    setIpLang(e.target.value);
  };

  const handleTab = (event) => {
    if (event.key === "Tab") {
      event.preventDefault();

      // Get the current cursor position
      const start = event.target.selectionStart;
      const end = event.target.selectionEnd;

      // Insert a tab character at the cursor position
      const newCode = ipCode.substring(0, start) + "\t" + ipCode.substring(end);

      // Update the state with the new text
      setIpCode(newCode);

      // Move the cursor to the right position
      event.target.selectionStart = event.target.selectionEnd = start + 1;
    }
  };

  return (
    <div className="codePage">
      <div className="title">
        DevBoard
        <div className="runArea">
          <select
            name="codeLang"
            id="codeLang"
            value={ipLang}
            onChange={handleIpLang}
          >
            {Languages.map((data, index) => {
              return (
                <option key={index} value={data.langCode}>
                  {data.lang}
                </option>
              );
            })}
          </select>
          <button onClick={handleCode}>Run</button>
        </div>
      </div>
      <div className="codeArea">
        <p className="areaTag">Code</p>
        <textarea
          value={ipCode}
          onChange={handleIpCode}
          name="codeText"
          id="codeText"
          onKeyDown={handleTab}
        />
      </div>
      <div className="codeArea">
        <p className="areaTag">Input</p>
        <textarea
          value={ipInput}
          onChange={handleIpInput}
          name="ipText"
          id="ipText"
        />
      </div>
      <div className="codeArea">
        <p className="areaTag">Output</p>
        <textarea
          name="opText"
          id="opText"
          value={output ? output : ""}
          readOnly
        />
        {loading && <Loader />}
      </div>
    </div>
  );
};

export default CodeBox;
