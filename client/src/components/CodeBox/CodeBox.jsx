import React, { useRef, useState } from "react";
import "./CodeBox.css";
import Languages from "../../data/Languages";
import Loader from "../Loader/Loader";
import Editor from "@monaco-editor/react";

const CodeBox = () => {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");
  const [ipInput, setIpInput] = useState("");
  const [ipLang, setIpLang] = useState("python3");
  const editorRef = useRef(null);

  const handleCode = async () => {
    const ipData = {
      language: ipLang,
      code: editorRef.current.getValue(),
      input: ipInput,
    };
    try {
      console.log("hello", import.meta.env.VITE_API_BASE_URL);
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/compiler`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(ipData),
        }
      );

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
  const handleIpInput = (e) => {
    setIpInput(e.target.value);
  };
  const handleIpLang = (e) => {
    setIpLang(e.target.value);
  };
  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  return (
    <div className="codePage">
      <div className="title">
        CompileCraft
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
        <Editor
          id="codeText"
          name="codeText"
          height="40vh"
          defaultLanguage={ipLang}
          onMount={handleEditorDidMount}
        />
        ;
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
