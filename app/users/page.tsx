"use client";
import React, {  useState,useEffect } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import "./newpage.css";
import Page from "../WhatsAppTemplate/page";
import { set } from "react-hook-form";

interface FormValues {
  companyName: string;
  bio: string;
  message: string;
  tonee: string;
}
interface ButtonState {
  [key: string]: string;
}

const Form: React.FC = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    companyName: "",
    bio: "",
    message: "",
    tonee: "",
  });
  const [header, setHeader] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [footer2, setFooter2] = useState<string>("");
  const [template, setTemplate] = useState<string>("");
  const[buttontxt, setButtontxt] = useState<ButtonState>({});
  const[emojitoggle, setEmojiToggle] = useState<boolean>(false);
  const[state,setState]=useState<string>("");
  const [selectedTone, setSelectedTone] = useState<string>(""); // State to store the selected tone

 

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
   const handleToneButtonClick = (tone:string) => {
     setSelectedTone(tone);
     console.log(selectedTone);
   };

  const convertStringToJson = (str: string) => {
    try {
      return JSON.parse(str);
    } catch (error) {
      console.error("Error converting string to JSON:", error);
      return null;
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { companyName, bio, message, tonee } = formValues;
      const messageText = `Imagine you are a senior content writer. You are writing a WhatsApp template for ${companyName} they ${bio}.** Write a short WhatsApp template about **${message}** .** The tone must be **${tonee}**.
   
    **Fields to fill in WhatsApp template**
   
    - Template name - It is a mandatory field
    - Category - It is a mandatory field
    - Language - It is a mandatory field
    - Header - It is optional field
    - Body - It is a mandatory field
    - Footer - It is optional field
    - Buttons - It is optional field
   
    **Best practices of WhatsApp template creation**
   
    - A variable has to be in the format of {{1}}, i.e curly braces with a number.
    - A variable should be enclosed in double curly braces. example ‘{{1}}’
    - variable must not contain any special characters such as a #, $, or %.
    - Variable parameters are not sequential. example {{1}}, {{2}}, {{3}}, {{4}}, {{5}}
    - The message template shouldn’t violate WhatsApp’s Commerce Policy
    - The content must not contain potentially abusive or threatening content, such as threatening a customer with legal action or threatening to publicly shame them.
   
    **Knowledge about WhatsApp template**
   
    1. Template name
        1. Maximum 512 characters
        2. only lowercase characters and ‘_’ can be used.
    2. Category
        1. Utility templates
            1. Utility templates relate to a specific, agreed-upon transaction and accomplish one of the following: Confirm, suspend, or change a transaction or subscription.
            2. Any template that has a mix of utility and marketing content will be classified as a marketing template.
        2. Marketing templates
            1.  are our most flexible. They do not relate to a specific, agreed-upon transaction and instead may relate to the business and/or its products/services.
            2. These templates may include promotions or offers; welcoming or closing messages; updates, invitations or recommendations; or requests to respond or complete a new transaction.
    3. Language
        1. Can select any human language
    4. Header
        1. One can choose to create a template with no header
        2. Or they can choose one of the following options - text, image, video, Document
        3. If text is chosen, it can have upto 1 variable and can be of 60 characters length
    5. Body
        1. The main message content must be added here
        2. It could be of maximum 1024 char
        3. Emojis and markdown are supported.
        4. Supports variables
    6. Footer
        1. It could be of maximum 60 characters
        2. When creating marketing templates, add a unsubscribe message with a keyword ‘STOP’ in the footer
    7. Button
        1. One can choose to create a template with no button
        2. They can choose Call to action (CTA) option or Quick replies option
        3. The button text can be of 25 characters
        4. CTA
            1. one CTA is minimum is required, maximum 2 CTA can be added
            2. Template can have one phone number and one URL
            3. URL of website that loads in the device's default mobile web browser when the button is tapped by the app user.
            4. URL Supports 1 variable, appended to the end of the URL string.
            5. URL can be of 2000 characters maximum.
        5. Quick replies
            1. Minimum of 1 and maximum of 3 buttons can be added
      Give response in JSON Format.
      Generate button names in same format . Do not change the format of generation of button names.
      The keys of JSON should not have any spaces or special characters.
      The keys shoulld be in the format of camelCase.
      Also ${state}`;
      sendMessage(messageText);
    } catch (error) {
      setLoading(false);
      console.error("Error generating template:", error);
      // setLoading(false);
    }
  };

  const sendMessage = (message:string) => {
    const url = "https://api.openai.com/v1/chat/completions";
    const data = {
      model: "gpt-3.5-turbo-0125",
      response_format: { type: "json_object" },
      messages: [{ role: "user", content: message }],
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
    };

    axios
      .post(url, data, { headers: headers })
      .then((response) => {
        console.log(response);
        const generatedContent = response.data.choices[0].message.content;
        const jsonContent = convertStringToJson(generatedContent);
        console.log(jsonContent);
        const body= jsonContent.body;
        const footer= jsonContent.footer;
        const header= jsonContent.header.content;
        const templateName= jsonContent.templateName;
        setButtontxt(jsonContent.buttons);
        setBody(body);
        setFooter2(footer);
        setHeader(header);
        setTemplate(templateName);
        console.log(body);
        console.log(footer);
        console.log(header);
        console.log(templateName);
        console.log(buttontxt);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error sending message to OpenAI:", error);
        setLoading(false);
      });
  };
   const handleemojitoggle = () => {
     setEmojiToggle(!emojitoggle);
     console.log(emojitoggle);
     if (emojitoggle == true) {
       setState("Do not add emojis to the template");
     } else {
       setState("Add emojis to the template");
     }
     console.log(state);
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
      <p className="formheader">AI WhatsApp Template Generator</p>
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
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="tonee">Choose a Tone ..</Label>
          <div className="tonesbuttondiv">
            <button
              className={`tonesbutton ${
                selectedTone === "Formal" ? "active" : ""
              }`}
              onClick={() => handleToneButtonClick("Formal")}
            >
              Formal
            </button>
            <button
              className={`tonesbutton ${
                selectedTone === "Informal" ? "active" : ""
              }`}
              onClick={() => handleToneButtonClick("Informal")}
            >
              Informal
            </button>
            <button
              className={`tonesbutton ${
                selectedTone === "Humorous" ? "active" : ""
              }`}
              onClick={() => handleToneButtonClick("Humorous")}
            >
              Humorous
            </button>
            <button
              className={`tonesbutton ${
                selectedTone === "Quirky" ? "active" : ""
              }`}
              onClick={() => handleToneButtonClick("Quirky")}
            >
              Quirky
            </button>
            <button
              className={`tonesbutton ${
                selectedTone === "Creative" ? "active" : ""
              }`}
              onClick={() => handleToneButtonClick("Creative")}
            >
              Creative
            </button>
          </div>
        </div>
        <FormGroup>
          <FormControlLabel
            control={<Switch defaultChecked />}
            onChange={handleemojitoggle}
            label="Emojis &#128526;"
          />
        </FormGroup>

        {/* <div>
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
        </div> */}
        {/* <div>
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
        </div> */}
        <button type="submit" className="submitbutton">
          Generate Your Template Now!!
        </button>
      </form>
      {loading && <div>Loading...</div>}
      <Page
        templatename={template}
        header={header}
        body={body}
        footer={footer2}
        buttonValues={{ ...buttontxt }}
        // whatsappbutton={
        //   whatsappbutton.whatsappbuttonobj.value
        //     ? whatsappbutton.whatsappbuttonobj.value
        //     : ""
        // }
        // callbutton={
        //   callbutton.callbuttonobj.value ? callbutton.callbuttonobj.value : ""
        // }
        // linkbutton={
        //   linkbutton.linkbuttonobj.value ? linkbutton.linkbuttonobj.value : ""
        // }
        // img={image.img.value}
      />
    </div>
  );
};
export default Form;

