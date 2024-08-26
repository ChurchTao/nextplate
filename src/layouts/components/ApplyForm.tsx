"use client";

import { useEffect, useRef, useState } from "react";
import IntlTelInput, { IntlTelInputRef } from "intl-tel-input/react";
import "intl-tel-input/styles";
import { FaInfoCircle } from "react-icons/fa";
import { useTranslate } from "@/hooks/useTranslate";
import {
  RadioGroup,
  RadioGroupIndicator,
  RadioGroupItem,
} from "@radix-ui/react-radio-group";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
} from "@radix-ui/react-alert-dialog";
const utilsScriptURL =
  "https://cdn.jsdelivr.net/npm/intl-tel-input@24.3.4/build/js/utils.js";

const ApplyForm = ({
  className = "mt-6",
  baseUrl,
  lang,
}: {
  className?: string;
  baseUrl: string;
  lang: string;
}) => {
  const {
    full_name,
    full_name_placeholder,
    mail,
    mail_placeholder,
    age,
    age_placeholder,
    gender,
    submit,
  } = useTranslate();
  const [isClient, setIsClient] = useState(false);
  const telInputRef = useRef<IntlTelInputRef>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogInfo, setDialogInfo] = useState<
    | {
        title: string;
        description: string;
      }
    | undefined
  >();

  const formDataRef = useRef({});

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  const handleSubmit = () => {
    const mobile = telInputRef.current?.getInput()?.value;
    const contry = telInputRef.current?.getInstance()?.getSelectedCountryData();
    const { dialCode } = contry || {};
    const submitForm: any = {
      ...formDataRef.current,
      mobile: `+${dialCode}${mobile}`,
    };
    if (!submitForm.name) {
      setDialogOpen(true);
      setDialogInfo({
        title: "Error",
        description: "Please enter your full name.",
      });
      return;
    }
    if (!submitForm.mobile || submitForm.mobile.length < 5) {
      setDialogOpen(true);
      setDialogInfo({
        title: "Error",
        description: "Please enter your WhatsApp number.",
      });
      return;
    }
    if (!submitForm.email) {
      setDialogOpen(true);
      setDialogInfo({
        title: "Error",
        description: "Please enter your email address.",
      });
      return;
    }
    if (!submitForm.gender) {
      setDialogOpen(true);
      setDialogInfo({
        title: "Error",
        description: "Please, select your gender.",
      });
      return;
    }
    if (!submitForm.age) {
      setDialogOpen(true);
      setDialogInfo({
        title: "Error",
        description: "Please enter your age.",
      });
      return;
    }

    const queryString = Object.keys(submitForm)
      .map((key) => `${key}=${submitForm[key]}`)
      .join("&");

    fetch(`/api/survey/submit?${queryString}`, {
      method: "POST",
    }).then((res) => {
      setDialogOpen(true);
      setDialogInfo({
        title: "Congratulations!",
        description:
          "You have successfully submitted your application. We will reach out to you via WhatsApp within the next 24 hours, so please check your messages and respond promptly.",
      });
    });
  };

  return (
    <div className="form">
      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogPortal>
          <AlertDialogOverlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
          <AlertDialogContent className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
            <AlertDialogTitle
              className={`${dialogInfo?.title === "Error" ? "text-[red]" : ""} m-0 text-[17px] font-medium`}
            >
              {dialogInfo?.title || ""}
            </AlertDialogTitle>
            <AlertDialogDescription className="mt-4 mb-5 text-[15px] leading-normal dark:text-darkmode-theme-light">
              {dialogInfo?.description || ""}
            </AlertDialogDescription>
            <div className="flex justify-end gap-[25px]">
              <AlertDialogAction asChild>
                <button className="text-white dark:text-darkmode-theme-light bg-primary hover:ring inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
                  Ok
                </button>
              </AlertDialogAction>
            </div>
          </AlertDialogContent>
        </AlertDialogPortal>
      </AlertDialog>
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
          maxLength={200}
          onChange={(e) => {
            formDataRef.current = {
              ...formDataRef.current,
              name: e.target.value,
            };
          }}
        />
      </div>
      {/* WhatsApp Number */}
      <div className="mb-6">
        <label htmlFor="whatsapp" className="form-label">
          WhatsApp Number <span className="text-red-500">*</span>
        </label>
        <IntlTelInput
          ref={telInputRef}
          inputProps={{
            className: "form-input",
          }}
          initOptions={{
            initialCountry: "us",
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
          maxLength={200}
          onChange={(e) => {
            formDataRef.current = {
              ...formDataRef.current,
              email: e.target.value,
            };
          }}
        />
      </div>
      {/* gender */}
      <div className="mb-6">
        <label htmlFor="gender" className="form-label">
          {gender} <span className="text-red-500">*</span>
        </label>
        <RadioGroup
          className="flex gap-8"
          onValueChange={(e) => {
            console.log(e);
            formDataRef.current = {
              ...formDataRef.current,
              gender: e,
            };
          }}
        >
          <div className="flex items-center">
            <RadioGroupItem
              className="bg-white w-[22px] h-[22px] rounded-full outline-none cursor-default hover:shadow-md"
              value="male"
              id="gender-male"
            >
              <RadioGroupIndicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[12px] after:h-[12px] after:rounded-[50%] after:bg-primary" />
            </RadioGroupItem>
            <label
              className="text-base leading-none pl-2"
              htmlFor="gender-male"
            >
              Male
            </label>
          </div>
          <div className="flex items-center">
            <RadioGroupItem
              className="bg-white w-[22px] h-[22px] rounded-full outline-none cursor-default hover:shadow-md"
              value="female"
              id="gender-female"
            >
              <RadioGroupIndicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[12px] after:h-[12px] after:rounded-[50%] after:bg-primary" />
            </RadioGroupItem>
            <label
              className="text-base leading-none pl-2"
              htmlFor="gender-female"
            >
              Female
            </label>
          </div>
        </RadioGroup>
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
          min={0}
          max={100}
          onChange={(e) => {
            formDataRef.current = {
              ...formDataRef.current,
              age: e.target.value,
            };
          }}
        />
      </div>
      <button className="btn btn-primary" onClick={handleSubmit}>
        {submit}
      </button>
    </div>
  );
};

export default ApplyForm;
