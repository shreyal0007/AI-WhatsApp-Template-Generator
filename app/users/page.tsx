"use client";
import React, {  useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  const[footervalue, setFooterValue] = useState<string>("");
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
      const messageText = `Company Name: ${companyName}\n\nBio: ${bio}\n\nRequirements: ${message} \ngenerate a whatsapp template in 1 paragraph describing the needs and the tone of the message should be ${selectedOption} `;
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
  const { checked } = e.target;
  setImage((prevState) => ({
    ...prevState,
    img: {
      ...prevState.img,
      iscontain: checked,
      value: checked ? prevState.img.value : "", // Clear the value if checkbox is unchecked
    },
  }));
};

const handleimagechange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files && e.target.files[0]; 
  if (file) {
    const imageUrl = URL.createObjectURL(file); 
    console.log(imageUrl)
    setImage((prevState) => ({
      ...prevState,
      img: {
        ...prevState.img,
        value: imageUrl, // Store the image URL in the value property
      },
    }));
  } else {
    setImage((prevState) => ({
      ...prevState,
      img: {
        ...prevState.img,
        value: "", // Reset value if no file selected
      },
    }));
  }
  console.log(image.img.value);
  console.log(image.img.iscontain);
};



 const changefooter = (
   e: React.ChangeEvent<HTMLInputElement>
 ) => {
   const { checked } = e.target;
   setFooter((prevState) => ({
     ...prevState,
     footerobj: {
       ...prevState.footerobj,
       iscontain: checked,
       value: checked ? prevState.footerobj.value : "",
     },
   }));
   
 };
   const handleChangeFooterInput = (e: React.ChangeEvent<HTMLInputElement>) => {
     const { value } = e.target;
     setFooter((prevState) => ({
       ...prevState,
       footerobj: {
         ...prevState.footerobj,
         value: value,
       },
     }));
     console.log(footer.footerobj.value);
     console.log(footer.footerobj.iscontain);
   };

  const handlewhatsappbuttoninput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setWhatsappButton((prevState) => ({
      ...prevState,
      whatsappbuttonobj: {
        ...prevState.whatsappbuttonobj,
        value: value,
      },
    }));
    console.log(whatsappbutton.whatsappbuttonobj.value);
    console.log(whatsappbutton.whatsappbuttonobj.iscontain);
  }

  const handlecallbuttoninput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCallButton((prevState) => ({
      ...prevState,
      callbuttonobj: {
        ...prevState.callbuttonobj,
        value: value,
      },
    }));
    console.log(callbutton.callbuttonobj.value);
    console.log(callbutton.callbuttonobj.iscontain);
  }
  const handlelinkbuttoninput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setLinkButton((prevState) => ({
      ...prevState,
      linkbuttonobj: {
        ...prevState.linkbuttonobj,
        value: value,
      },
    }));
    console.log(linkbutton.linkbuttonobj.value);
    console.log(linkbutton.linkbuttonobj.iscontain);
  }

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
              checked={image.img.iscontain}
              onChange={changeimg}
            />
            Add image
          </label>
          {image.img.iscontain ? (
            <Input type="file" onChange={handleimagechange} />
          ) : null}
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={footer.footerobj.iscontain}
              onChange={changefooter}
            />
            Add footer
          </label>
          {footer.footerobj.iscontain ? (
            <Input
              type="text"
              value={footer.footerobj.value}
              onChange={handleChangeFooterInput}
            />
          ) : null}
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
            <Input
              type="link"
              value={whatsappbutton.whatsappbuttonobj.value}
              onChange={handlewhatsappbuttoninput}
            ></Input>
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
          {callbutton.callbuttonobj.iscontain ? (
            <Input
              type="tel"
              value={callbutton.callbuttonobj.value}
              onChange={handlecallbuttoninput}
            />
          ) : null}
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={linkbutton.linkbuttonobj.iscontain}
              value={linkbutton.linkbuttonobj.value}
              onChange={changelinkbutton}
            />
            Add linkbutton
          </label>
          {linkbutton.linkbuttonobj.iscontain ? (
            <Input
              type="link"
              value={linkbutton.linkbuttonobj.value}
              onChange={handlelinkbuttoninput}
            />
          ) : null}
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
      <Page
        header={formValues.header}
        message={template}
        footer={footer.footerobj.value ? footer.footerobj.value : ""}
        whatsappbutton={
          whatsappbutton.whatsappbuttonobj.value
            ? whatsappbutton.whatsappbuttonobj.value
            : ""
        }
        callbutton={
          callbutton.callbuttonobj.value ? callbutton.callbuttonobj.value : ""
        }
        linkbutton={
          linkbutton.linkbuttonobj.value ? linkbutton.linkbuttonobj.value : ""
        }
        img={image.img.value}
      />
    </div>
  );
};
export default Form;

