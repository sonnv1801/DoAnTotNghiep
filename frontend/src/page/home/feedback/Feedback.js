import React , { useState } from 'react';
import './style.css'
import emailjs from '@emailjs/browser';

const Result = () => {
  return(
      <p>Your message has been successfully sent. I will contact you soon</p>
  )
}

export const FeedBack = () => {
  const [result, showResult] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
        .sendForm('service_3fg4a3q', 'template_uysiv2m', e.target, 'cwYhvmQeBzVTrDpYe')
        .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
      e.target.reset();
      showResult(true);
  };
  return (
   <div className="contact-section" >
    <div className="contact-info">
        <div><i class='fas fa-map-marker-alt'></i>Address, City, Country</div>
        <div><i class='fas fa-envelope'></i>contact@gmail.com</div>
        <div><i class='fas fa-phone'></i>+98 0254 554 223</div>
        <div><i class='fas fa-clock'></i>Mon - Fri 8:00 AM to 5:00 PM</div>

    </div>
    <div className='contact-form' >
        <h2>Phản hồi với chúng tôi</h2>
        <form className='contact' action='' onSubmit={sendEmail} method='post'>
            <input type="text" name='fullName' class='text-box' placeholder='Your Name' required/>
            <input type="email" name='email' class='text-box' placeholder='Your Email' required/>
            <textarea name='message' rows='5' placeholder='Your Message' required></textarea>
            <input type="submit" name='submit' class='send-btn' value="Send"/>
            <div className='row'>
                {result ? <Result/> : null}
            </div>

        </form>
    </div>
   </div>

  )
}
