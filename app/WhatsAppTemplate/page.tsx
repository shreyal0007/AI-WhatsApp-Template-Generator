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

  return (
    <div className="parentdiv">
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
