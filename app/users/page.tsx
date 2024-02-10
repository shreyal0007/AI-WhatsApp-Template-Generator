"use client";
import React, { use, useEffect, useState } from "react";
import axios from "axios";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import "./newpage.css";
import Page from "../WhatsAppTemplate/page";

interface FormValues {
  companyName: string;
  bio: string;
  message: string;
  header: string;
}

const Form: React.FC = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    companyName: "",
    bio: "",
    message: "",
    header: "",
  });
  const [template, setTemplate] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [image, setImage] = useState<{
    img: { iscontain: boolean; value: string };
  }>({ img: { iscontain: false, value: "" } });
  const [footer, setFooter] = useState<{
    footerobj: { iscontain: boolean; value: string };
  }>({ footerobj: { iscontain: false, value: "" } });
  const [callbutton, setCallButton] = useState<{
    callbuttonobj: { iscontain: boolean; value: string };
  }>({ callbuttonobj: { iscontain: false, value: "" } });
  const [whatsappbutton, setWhatsappButton] = useState<{
    whatsappbuttonobj: { iscontain: boolean; value: string };
  }>({ whatsappbuttonobj: { iscontain: false, value: "" } });
  const [linkbutton, setLinkButton] = useState<{
    linkbuttonobj: { iscontain: boolean; value: string };
  }>({ linkbuttonobj: { iscontain: false, value: "" } });
  const content = template;

  const [selectedOption, setSelectedOption] = useState<string>("Formal");

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value);
    console.log(selectedOption);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { companyName, bio, message, header } = formValues;
      const messageText = `Company Name: ${companyName}\n\nBio: ${bio}\n\nRequirements: ${message}\n Header:${header} \ngenerate a whatsapp template`;
      sendMessage(messageText);
    } catch (error) {
      setLoading(false);
      console.error("Error generating template:", error);
      // setLoading(false);
    }
  };

  const sendMessage = (message: string) => {
    // setLoading(true);
    const url = "https://api.openai.com/v1/chat/completions";
    const data = {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
    };
    axios
      .post(url, data, { headers: headers })
      .then((response) => {
        console.log(response.data);
        const generatedContent = response.data.choices[0].message.content;
        console.log(generatedContent);
        setTemplate(generatedContent);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  const handleCopy = () => {
    navigator.clipboard
      .writeText(content)
      .then(() => {
        console.log("Content copied to clipboard");
        window.alert("Content copied to clipboard");
      })
      .catch((error) => {
        console.error("Failed to copy content to clipboard:", error);
      });
  };

 

  const changeimg = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Image checkbox clicked");
    const { checked, value } = e.target;
    setImage((prevState) => ({
      ...prevState,
      img: {
        ...prevState.img,
        iscontain: checked,
        value: checked ? value : e.target.value,
      },
    }));
    console.log(image.img.iscontain);
    console.log(image.img.value);
  };

  const changefooter = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Footer checkbox clicked");
    const { checked, value } = e.target;
    setFooter((prevState) => ({
      ...prevState,
      footerobj: {
        ...prevState.footerobj,
        iscontain: checked,
        value: checked ? value : e.target.value,
      },
    }));
    console.log(footer.footerobj.iscontain);
    console.log(footer.footerobj.value);
  };

  const changecallbutton = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Call Button checkbox clicked");
    const { checked, value } = e.target;
    setCallButton((prevState) => ({
      ...prevState,
      callbuttonobj: {
        ...prevState.callbuttonobj,
        iscontain: checked,
        value: checked ? value : e.target.value,
      },
    }));
  };

  const changewhatsappbutton = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("WhatsApp Button checkbox clicked");
    const { checked, value } = e.target;
    setWhatsappButton((prevState) => ({
      ...prevState,
      whatsappbuttonobj: {
        ...prevState.whatsappbuttonobj,
        iscontain: checked,
        value: checked ? value : e.target.value,
      },
    }));
    console.log(whatsappbutton.whatsappbuttonobj.value);
  };

  const changelinkbutton = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Link Button checkbox clicked");
    const { checked, value } = e.target;
    setLinkButton((prevState) => ({
      ...prevState,
      linkbuttonobj: {
        ...prevState.linkbuttonobj,
        iscontain: checked,
        value: checked ? value : e.target.value,
      },
    }));
    console.log(linkbutton.linkbuttonobj.iscontain);
  };

  // useEffect(() => {
  //   console.log("Form values:", formValues);
  // }, [formValues]);

  return (
    <div className="formdiv">
      <form onSubmit={handleSubmit} className="mainform">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="companyName">Company Name</Label>
          <Input
            type="text"
            id="companyName"
            className="label"
            name="companyName"
            value={formValues.companyName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            name="bio"
            className="label"
            value={formValues.bio}
            onChange={handleChange}
            required
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="header">Header</Label>
          <Input
            type="text"
            id="header"
            className="label"
            name="header"
            value={formValues.header}
            onChange={handleChange}
            required
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            name="message"
            value={formValues.message}
            className="label"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="img"
              id="img"
              value={image.img.value}
              checked={image.img.iscontain}
              onChange={changeimg}
            />
            Add image
          </label>
          {image.img.iscontain ? <Input type="file" /> : null}
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              // name="footer"
              // id="footer"
              // value=""
              checked={footer.footerobj.iscontain}
              onChange={changefooter}
            />
            Add footer
          </label>
          {footer.footerobj.iscontain ? <Input type="text" /> : null}
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              id="whatsappbutton"
              name="whatsappbutton"
              value={whatsappbutton.whatsappbuttonobj.value}
              checked={whatsappbutton.whatsappbuttonobj.iscontain}
              onChange={changewhatsappbutton}
            />
            Add whatsappbutton
          </label>
          {whatsappbutton.whatsappbuttonobj.iscontain ? (
            <Input type="link"></Input>
          ) : null}
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              id="callbutton"
              name="callbutton"
              value={callbutton.callbuttonobj.value}
              checked={callbutton.callbuttonobj.iscontain}
              onChange={changecallbutton}
            />
            Add call button
          </label>
          {callbutton.callbuttonobj.iscontain ? <Input type="tel" /> : null}
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={linkbutton.linkbuttonobj.iscontain}
              onChange={changelinkbutton}
            />
            Add linkbutton
          </label>
          {linkbutton.linkbuttonobj.iscontain ? <Input type="link" /> : null}
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="tones">Tone</Label>
          <div>
            <label>
              <input
                type="radio"
                value="Formal"
                checked={selectedOption === "Formal"}
                onChange={handleOptionChange}
              />
              InFormal
            </label>
            <br></br>
            <label>
              <input
                type="radio"
                value="InFormal"
                checked={selectedOption === "InFormal"}
                onChange={handleOptionChange}
              />
              Formal
            </label>
          </div>
        </div>
        <button type="submit" className="submitbutton">
          Submit
        </button>
      </form>
        {loading && <div>Loading...</div>}
        {/* {template && 
        <div className='templatediv'>
        <div className='templateheader'>
          <h2 className="heading">Generated Template</h2>
          <button onClick={handleCopy} className='copybutton'>Copy</button>
        </div>
        {template}</div>} */}
        <Page/>
              </div>
  );
};

export default Form;

//add tones
