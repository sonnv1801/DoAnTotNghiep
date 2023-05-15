import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import feedback from "../../../assets/feedback.png";



export const FeedBack = () => {

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 1280);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_3fg4a3q",
        "template_uysiv2m",
        e.target,
        "cwYhvmQeBzVTrDpYe"
      )
      .then(
        (result) => {
          console.log(result.text);
          toast.success("Đã nhận phản hồi. Chúng tôi sẽ phản hồi bạn sớm!", {
            position: toast.POSITION.TOP_RIGHT,
          });
        },
        (error) => {
          console.log(error.text);
          toast.error("Lỗi mất rồi!", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      );
    e.target.reset();

    
  };
  return (
    <div className="main-contact w-full p-12 bg-gradient-to-r from-cyan-500 to-blue-200" style={{ marginTop: "-50px" }}>
      <ToastContainer />
      <div className=" flex gap-4 justify-center items-center w-[80%] m-auto bg-white shadow-md shadow-gray rounded-lg">
        <div className="contact-img max-w-[400px] pl-[50px] ">
        {isMobile ? null : (
          <img src={feedback} alt="ffff"/>
        )}
        </div>
        <div className="contact-form max-w-[800px] mr-[50px] p-12 flex-1">
          <h2 className="text-center text-2xl uppercase mb-[30px] mt-12 font-medium">Phản hồi với chúng tôi</h2>
          <form
            className="w-full"
            action=""
            onSubmit={sendEmail}
            method="post"
          >
            <input
              type="text"
              name="fullName"
              className="mb-3 border-none w-full h-[50px] p-3 text-[18px] rounded-md shadow-md shadow-gray  outline-none hover:shadow-xl bg-gray-200"
              placeholder="Your Name"
              required
            />
            <input
              type="email"
              name="email"
              class="mb-3 border-none w-full h-[50px] p-3 text-[18px] rounded-md shadow-md shadow-gray  outline-none bg-gray-200 hover:shadow-xl"
              placeholder="Your Email"
              required
            />
            <textarea
            name="message"
              className="mb-3 bg-gray-200 border-none w-full  p-3 text-[18px] rounded-md shadow-md shadow-gray  outline-none hover:shadow-xl"
              rows="5"
              placeholder="Your Message"
              required
            ></textarea>
            <input type="submit" name="submit" className="mb-12 float-right bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-none w-[120px] h-[40px] text-md font-semibold uppercase cursor-pointer rounded-md hover:bg-blue-500 " value="Send" />
          </form>
        </div>
      </div>
    </div>
  );
};
