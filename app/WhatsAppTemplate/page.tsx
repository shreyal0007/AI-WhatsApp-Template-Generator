"use client"
import React from "react";
import img from "../../components/ui/prodimg.jpg";
import "./WhatsAppTemplate.css";

interface Props {
  templatename: string;
  header: string;
  body: string;
  footer: string;
  buttonValues: { [key: string]:  string };
}

const Page: React.FC<Props> = ({
  templatename,
  header,
  body,
  footer,
  buttonValues,
}) => {
  // const handleWhatsAppDirect = () => {
    
  //   window.open(whatsappbutton, "_blank"); 
  // };

  // const handleCallDirect = () => {
  //   window.open(`tel:${callbutton}`, "_self"); 
  // };

  // const handleLinkDirect = () => {
    
  //   window.open(linkbutton, "_blank"); 
  // };
  const handleCopy = () => {
    const contentToCopy = `${templatename}\n${header}\n${body}\n${footer}\n${Object.values(
      buttonValues
    ).join("\n")}`;
    navigator.clipboard
      .writeText(contentToCopy)
      .then(() => {
        console.log("Content copied to clipboard");
        window.alert("Content copied to clipboard");
      })
      .catch((error) => {
        console.error("Failed to copy content to clipboard:", error);
      });
  };

  return (
    <div className="parentdiv">
      <button className="copybutton" onClick={handleCopy}>
        Copy Template
      </button>
      <div className="template">
        <p className="templatename">{templatename}</p>
        <p className="messagetext">{header}</p>
        <p className="body">{body}</p>
        <p className="footertext">{footer}</p>
        {buttonValues &&
          Object.entries(buttonValues).map(([key, value]) => (
            <button key={key} className="templatebutton">
              {value}
            </button>
          ))}
        {/* <div className="buttondiv">
          {whatsappbutton && (
            <button className="templatebutton" onClick={handleWhatsAppDirect}>
              WhatsApp message
            </button>
          )}
          {callbutton && (
            <button className="templatebutton" onClick={handleCallDirect}>
              Call
            </button>
          )}
          {linkbutton && (
            <button className="templatebutton" onClick={handleLinkDirect}>
              Link
            </button>
          )}
        </div> */}
      </div>
    </div>
  );
};

export default Page;
