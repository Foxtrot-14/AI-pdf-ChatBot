import React, { useState, useRef } from "react";
import "./Home.css";

interface Message {
  type: "text" | "pdf";
  content: string;
}

const Home: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  const handleUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processPDF(file);
    }
  };

  const processPDF = (file: File) => {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      if (e.target?.result && typeof e.target.result === "string") {
        const pdfMessage: Message = {
          type: "pdf",
          content: e.target.result,
        };
        setMessages((prevMessages) => [...prevMessages, pdfMessage]);
        if (chatRef.current) {
          chatRef.current.scrollTop = chatRef.current.scrollHeight;
          chatRef.current.scrollIntoView({
            behavior: "smooth",
            block: "end",
            inline: "nearest",
          });
        }
      }
    };
    fileReader.readAsDataURL(file);
  };

  const handleMessageSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (inputRef.current && inputRef.current.value.trim() !== "") {
      const newMessage: Message = {
        type: "text",
        content: inputRef.current.value.trim(),
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      inputRef.current.value = "";
      if (chatRef.current) {
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
      }
    }
  };

  return (
    <div className="container">
      <header>
        <h1 className="head">CleverDoc</h1>
      </header>
      <main className="parent">
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileSelect}
          accept=".pdf"
        />
        <section className="chat" ref={chatRef}>
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.type}`}>
              {message.type === "text" ? (
                <p>{message.content}</p>
              ) : (
                <embed
                  src={message.content}
                  type="application/pdf"
                  width="200px"
                  height="300px"
                />
              )}
            </div>
          ))}
        </section>
        <button className="but" onClick={handleUpload}>
          Upload PDF
        </button>
        <form onSubmit={handleMessageSubmit} className="inp">
          <input type="text" ref={inputRef} placeholder="Enter Prompt" />
          <button type="submit" className="send">
            Send
          </button>
        </form>
      </main>
    </div>
  );
};

export default Home;
