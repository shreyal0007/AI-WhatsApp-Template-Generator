import React from 'react';
import img from "../../components/ui/prodimg.jpg";
import "./WhatsAppTemplate.css"
const Page = () => {
  return (
    <div className='parentdiv'>
      <div className='template' >
      <img src={img.src} alt="Product" className='templateimg' />
      <p className='headertext'>header</p>
      <p className='messagetext'>message</p>
      <p className='footertext'>footer text</p>
      <div className='buttondiv'>
      <button className='templatebutton'>WhatsApp message</button>
      <button className='templatebutton'>Call</button>
      <button className='templatebutton'>Link</button></div>
      
    </div>
    </div>
    
  );
};

export default Page;
