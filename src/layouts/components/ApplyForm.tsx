"use client";

import config from "@/config/config.json";
import { useEffect, useState } from "react";
import IntlTelInput from "intl-tel-input/react";
import "intl-tel-input/styles";
import { FaInfoCircle } from "react-icons/fa";
import { useTranslate } from "@/hooks/useTranslate";

const ApplyForm = ({
  className = "mt-6",
  lang,
}: {
  className?: string;
  lang: string;
}) => {
  const {
    full_name,
    full_name_placeholder,
    mail,
    mail_placeholder,
    age,
    age_placeholder,
    submit,
  } = useTranslate();
  const { contact_form_action } = config.params;
  const [number, setNumber] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) {
    return null;
  }

  return (
    <form action={contact_form_action} method="POST" className="form">
      <div className="mb-6 form-info">
        <FaInfoCircle
          className="flex-shrink-0 mr-4"
          color="#374acb"
          size={20}
        />
        Please ensure that the WhatsApp number you provide is correct;
        otherwise, we will not be able to contact you. We will reach out to you
        via WhatsApp within the next 24 hours, so please check your messages and
        respond promptly.
      </div>
      <div className="mb-6">
        <label htmlFor="name" className="form-label">
          {full_name} <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          name="name"
          className="form-input"
          placeholder={full_name_placeholder}
          type="text"
        />
      </div>
      {/* WhatsApp Number */}
      <div className="mb-6">
        <label htmlFor="whatsapp" className="form-label">
          WhatsApp Number <span className="text-red-500">*</span>
        </label>
        <IntlTelInput
          onChangeNumber={setNumber}
          onChangeValidity={setIsValid}
          inputProps={{
            className: "form-input",
          }}
          initOptions={{
            initialCountry: "us",
            utilsScript: "path/to/utils.js",
          }}
        />
      </div>
      <div className="mb-6">
        <label htmlFor="email" className="form-label">
          {mail} <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          name="email"
          className="form-input"
          placeholder={mail_placeholder}
          type="email"
        />
      </div>
      {/* age */}
      <div className="mb-6">
        <label htmlFor="age" className="form-label">
          {age} <span className="text-red-500">*</span>
        </label>
        <input
          id="age"
          name="age"
          className="form-input"
          placeholder={age_placeholder}
          type="number"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        {submit}
      </button>
    </form>
  );
};

export default ApplyForm;
