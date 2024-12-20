import React, { useEffect, useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { FaBus } from "react-icons/fa6";
import { GoBellFill } from "react-icons/go";
import { GrBus } from "react-icons/gr";
import { TbUser } from "react-icons/tb";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdTime } from "react-icons/io";
import My from "../assests/My.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

export default function Home() {
  const user_id = sessionStorage.getItem("user_id");
  const [userData, setUserData] = useState({});
  const [busData, setBusData] = useState({});
  const [notificationData, setNotification] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [curr_notification, setCurrNotification] = useState({
    title: "",
    message: "",
  });
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    async function getUserInfo() {
      setLoading(true);
      try {
        let response = await axios.post(
          "https://putms.onrender.com/get_user_info",
          { user_id },
          { withCredentials: true }
        );
        if (response.success) {
          setUserData(response.data);
        } else {
          toast.error(response.data.message);
          navigate("/");
        }
        const busArea = response.data.Area;
        let busResponse = await axios.post(
          "https://putms.onrender.com/get_bus_info",
          { busArea }
        );
        setBusData(busResponse.data);
      } catch (error) {
        toast.error(error);
      } finally {
        setLoading(false);
      }
    }
    getUserInfo();
  }, [navigate, user_id]);
  useEffect(() => {
    async function getNotification() {
      let response = await axios.get(
        "https://putms.onrender.com/get_notifications"
      );
      setNotification(response.data);
    }
    getNotification();
  }, []);

  return (
    <>
      {loading && <Spinner />}
      {user_id === "admin" ? navigate("/") : null}
      <Header />

      <div className="main h-[50rem] bg-slate-200 flex">
        <div className="m-3 bg-slate-100 h-[45rem] w-1/4 shadow-lg flex space-y-2 flex-col items-center py-3 overflow-hidden cursor-pointer">
          <img
            src={
              user_id === "210305105661"
                ? My
                : "https://toppng.com/uploads/preview/instagram-default-profile-picture-11562973083brycehrmyv.png"
            }
            alt="UserIMG"
            className="border border-black object-cover rounded-full h-[15rem] w-[15rem] mix-blend-normal"
          />
          <div className="h-[0.1rem] bg-slate-200 w-[90%]"></div>
          <h2 className="hover:underline p-2 font-extrabold">
            {userData.Name || "----"}
          </h2>
          <div className="h-[0.1rem] bg-slate-200 w-[90%]"></div>
          <h4 className="hover:underline p-2">
            {userData.Department || "----"}
          </h4>
          <div className="h-[0.1rem] bg-slate-200 w-[90%]"></div>
          <h4 className="hover:underline p-2 font-semibold">
            {userData.Enrollment || userData.MIS_ID || "----"}
          </h4>
          <div className="h-[0.1rem] bg-slate-200 w-[90%]"></div>
          <h4 className="hover:underline p-2">
            {userData.Designation === "Student"
              ? `Semester : ${userData.Semester}`
              : "Faculty"}
          </h4>
          <div className="h-[0.1rem] bg-slate-200 w-[90%]"></div>
          <h4 className="hover:underline p-2  ">
            Mobile : {userData.Mobile || "----"}
          </h4>
          <div className="h-[0.1rem] bg-slate-200 w-[90%]"></div>
          <h4 className="hover:underline p-2">
            Area : {userData.Area || "----"}
          </h4>
          <div className="h-[0.1rem] bg-slate-200 w-[90%]"></div>
          <h5 className="hover:underline p-2">
            Boarding Point : {userData.Boarding_Point || "----"}
          </h5>
          <div className="h-[0.1rem] bg-slate-200 w-[90%]"></div>
        </div>
        <div className="m-3 bg-slate-100 h-[45rem] w-3/4 shadow-lg flex flex-col space-y-5 py-3 px-3">
          <div className="h-[21rem] ">
            <div className="flex space-x-2 text-center items-center text-blue-500">
              <div className="">
                <FaBus className="text-3xl mb-2" />
              </div>
              <h4 className="text-center font-semibold">BUS INFORMATION</h4>
            </div>
            <div className="h-[0.1rem] bg-slate-200 w-[100%]"></div>
            <div className="flex h-[85%] my-2 gap-3 space-x-4">
              <div className="flex flex-col w-1/3 bg-yellow-100 p-4 text-center rounded-lg shadow-sm cursor-pointer">
                <h5 className="font-bold uppercase text-3xl">
                  <GrBus className="inline mr-3 text-[2rem]" />
                  Current Bus
                </h5>
                <div className="h-[0.01rem] bg-black w-[100%]"></div>
                <h4 className="text-center w-full text-[2.5rem] mt-3 tracking-widest">
                  GJ 06 BY
                </h4>
                <h2 className="text-center w-full text-[5rem] font-extrabold tracking-wide">
                  {busData.Bus_Number || "----"}
                </h2>
              </div>

              <div className="flex w-2/3 flex-col justify-center space-y-2">
                <h3 className="bg-slate-100 p-2 rounded-md cursor-pointer hover:bg-gray-300">
                  <TbUser className="inline mr-2 text-[2rem] justify-center" />
                  Driver Name : {busData.Driver_Name || "----"}
                </h3>
                <div className="h-[0.15rem] bg-slate-200 w-[100%]"></div>
                <h3 className="bg-slate-200 p-2 rounded-md cursor-pointer hover:bg-gray-300">
                  <FaPhoneAlt className="inline mr-3 ml-1 text-[1.5rem] justify-center" />
                  Contact : {busData.Driver_Contact || "----"}
                </h3>
                <div className="h-[0.15rem] bg-slate-200 w-[100%]"></div>
                <h3 className="bg-slate-100 p-2 rounded-md cursor-pointer hover:bg-gray-300">
                  <FaLocationDot className="inline mr-3 ml-1 text-[1.5rem] justify-center" />
                  Area : {busData.Area || "----"}
                </h3>
                <div className="h-[0.15rem] bg-slate-200 w-[100%]"></div>
                <h3 className="bg-slate-200 p-2 rounded-md cursor-pointer hover:bg-gray-300">
                  <IoMdTime className="inline mr-3 ml-1 text-[1.5rem] justify-center" />
                  Departure Time : 5:15 PM
                </h3>
              </div>
            </div>
          </div>

          <div className="h-[0.1rem] bg-slate-300 w-[100%]"></div>

          <div className="h-[21rem]">
            <div className="flex space-x-2 text-center items-center text-blue-500">
              <div className="">
                <GoBellFill className="text-3xl mb-2" />
              </div>
              <h4 className="text-center font-semibold">NOTICE</h4>
            </div>
            <div className="h-[0.1rem] bg-slate-200 w-[100%]"></div>
            <div className="w-full h-[15rem] my-3 overflow-y-scroll">
              {notificationData.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="px-2 py-2 m-2 rounded-md cursor-pointer bg-blue-100 "
                  >
                    <h6
                      className="hover:underline text-blue-500 m-0"
                      onClick={() => {
                        setCurrNotification({
                          title: item.title,
                          message: item.message,
                        });
                        handleShow();
                      }}
                    >
                      {item.title}
                    </h6>
                  </div>
                );
              })}
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>{curr_notification.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{curr_notification.message}</Modal.Body>
                <Modal.Footer>
                  <Button variant="danger" onClick={handleClose}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
