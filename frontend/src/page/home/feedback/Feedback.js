import React, { useState } from "react";
import "./style.css";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import feedback from "../../../assets/feedback.png";

export const FeedBack = () => {
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
    <div className="main-contact" style={{ marginTop: "-50px" }}>
      <ToastContainer />
      <div className="contact-section">
        <div className="contact-info">
          {/* <div>
          <i class="fas fa-map-marker-alt"></i>33 Xô Viết Nghệ Tĩnh, Hải Châu,
          Đà Nẵng
        </div>
        <div>
          <i class="fas fa-envelope"></i>i-workcompany@gmail.com
        </div>
        <div>
          <i class="fas fa-phone"></i>+84 4742 844 40
        </div>
        <div>
          <i class="fas fa-clock"></i>08:00 AM - 18:00 PM
        </div> */}
          <img src={feedback} alt="ffff" />
        </div>
        <div className="contact-form">
          <h2>Phản hồi với chúng tôi</h2>
          <form
            className="contact"
            action=""
            onSubmit={sendEmail}
            method="post"
          >
            <input
              type="text"
              name="fullName"
              class="text-box"
              placeholder="Your Name"
              required
            />
            <input
              type="email"
              name="email"
              class="text-box"
              placeholder="Your Email"
              required
            />
            <textarea
              name="message"
              rows="5"
              placeholder="Your Message"
              required
            ></textarea>
            <input type="submit" name="submit" class="send-btn" value="Send" />
          </form>
        </div>
      </div>
    </div>
  );
};
