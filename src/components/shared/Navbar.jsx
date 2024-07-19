import React, { useEffect, useState } from "react";
import Avatar from "react-avatar";
import { CiCircleQuestion, CiSettings } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";
import { PiDotsNineBold } from "react-icons/pi";
import { RxHamburgerMenu } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { setSearchText, setUser } from "../../redux/appSlice";
import { AnimatePresence, motion } from "framer-motion";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

const Navbar = () => {
  const [input, setInput] = useState("");
  const [toggle, setToggle] = useState(false);
  const { user } = useSelector(store => store.appSlice);
  const dispatch = useDispatch();

  const signOutHandler = () => {
    signOut(auth).then(() => {
      dispatch(setUser(null));
    }).catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
    dispatch(setSearchText(input));
  }, [input])

  return (
    <div className="flex items-center justify-between mx-3 h-16">
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-2">
          <div className="p-3 rounded-full hover:bg-gray-100 cursor-pointer">
            <RxHamburgerMenu size={"20px"} />
          </div>
          <img
            className="w-8"
            src="data:image/png;base64,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"
            alt="gmail-logo"
          />
          <h1 className="text-2xl text-gray-500 font-medium">Gmail</h1>
        </div>
      </div>
      <div className="md:block hidden w-[50%] mr-60">
        <div className="flex items-center bg-[#EAF1FB] px-2 py-3 rounded-full">
          <IoIosSearch size={"24px"} className="text-gray-700" />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search Mail"
            className="rounded-full w-full bg-transparent outline-none px-1"
          />
        </div>
      </div>
      <div className="md:block hidden">
        <div className="flex items-center gap-2">
          <div className="p-3 rounded-full hover:bg-gray-100 cursor-pointer">
            <CiCircleQuestion size={"20px"} />
          </div>
          <div className="p-3 rounded-full hover:bg-gray-100 cursor-pointer">
            <CiSettings size={"20px"} />
          </div>
          <div className="p-3 rounded-full hover:bg-gray-100 cursor-pointer">
            <PiDotsNineBold size={"20px"} />
          </div>
          <div className="relative cursor-pointer">
            <Avatar
              onClick={() => setToggle(!toggle)}
              src={user?.photoURL}
              size="40"
              round={true}
            />
            <AnimatePresence>
              {
                toggle && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.1 }}
                    className="absolute right-2 z-20 shadow-lg bg-white rounded-md"
                  >
                    <p onClick={signOutHandler} className="p-2 underline">LogOut</p>
                  </motion.div>
                )
              }
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
