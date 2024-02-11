import React from "react";
import img from "../../components/ui/prodimg.jpg";
import "./WhatsAppTemplate.css";

interface Props {
  header: string;
  message: string;
  footer: string;
  whatsappbutton: string;
  callbutton: string;
  linkbutton: string;
}

const Page: React.FC<Props> = ({
  header,
  message,
  footer,
  whatsappbutton,
  callbutton,
  linkbutton,
}) => {
  const handleWhatsAppDirect = () => {
    
    window.open(whatsappbutton, "_blank"); 
  };

  const handleCallDirect = () => {
    window.open(`tel:${callbutton}`, "_self"); 
  };

  const handleLinkDirect = () => {
    
    window.open(linkbutton, "_blank"); 
  };

  return (
    <div className="parentdiv">
      <div className="template">
        <img src={img.src} alt="Product" className="templateimg" />
        <p className="headertext">{header}</p>
        <p className="messagetext">{message}</p>
        <p className="footertext">{footer}</p>
        <div className="buttondiv">
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
        </div>
      </div>
    </div>
  );
};

export default Page;
