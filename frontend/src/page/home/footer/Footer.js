import React from 'react'
import { Link } from "react-router-dom";
import {
    FaFacebook,
    FaGithub,
    FaInstagram,
    FaTwitter,
    FaTwitch,
} from 'react-icons/fa'

const Footer = () => {
  return (
    <div className='w-full  bg-slate-900 text-gray-300 py-y px-2'>
        <div className='max-w-[1240px] mx-auto grid grid-cols-2 md:grid-cols-5 border-b-2 border-gray-600 py-8'>
            <div>
                <h6 className='font-bold uppercase pt-2'>Phòng</h6>
                <ul>
                    <li className='py-1'>Marketing</li>
                    <li className='py-1'>Human</li>
                    <li className='py-1'>IT</li>
                    <li className='py-1'>Computer</li>
                </ul>
            </div>
            <div>
                <h6 className='font-bold uppercase pt-2'>Hỗ trợ</h6>
                <ul>
                    <li className='py-1'>Pricing</li>
                    <li className='py-1'>Guides</li>
                    <li className='py-1'>API Status</li>
                </ul>
            </div>
            <div>
                <h6 className='font-bold uppercase pt-2'>Trang chủ</h6>
                <ul>
                    <Link to="/timekp">
                    <li className='py-1'>Thời gian đi làm</li></Link>
                    <Link to="/statistic">
                    <li className='py-1'>Xem công</li></Link>
                </ul>
            </div>
            <div className='col-span-2 pt-8 md:pt-2'>
                <p className='font-bold uppercase'>I-Work Company</p>
                <p className='py-4'>Các thông tin, thông báo mới nhất sẽ được gửi đến hộp thư của bạn</p>
                <form className='flex flex-col sm:flex-row'>
                    <input className='w-[80%] p-2 mr-2 rounded-md mb-4' type="email" placeholder='Enter email..'/>
                    <button className='px-2 mb-4 '>Đăng ký</button>
                </form>
            </div>
        </div>

        <div className='flex flex-col max-w-[1240px] px-2 py-4 mx-auto justify-between sm:flex-row text-center text-gray-500'>
        {/* <p className='py-4'>2022 Workflow, LLC. All rights reserved</p> */}
        <div className='flex justify-between sm:w-[300px] pt-4 text-2xl'>
            <FaFacebook />
            <FaInstagram />
            <FaTwitter />
            <FaTwitch />
            <FaGithub />
        </div>
        </div>
    </div>
  )
}

export default Footer