import React, { useState } from "react";
import { ArrowCircleUpIcon } from "@heroicons/react/outline";
import { Transition } from "@headlessui/react";

const ButtonScroll = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", toggleVisible);
  }

  return (
    <Transition
      show={visible}
      enter="transition-opacity duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <button
        type="button"
        className={
          "flex p-3 rounded fixed text-white bg-indigo-600 hover:bg-indigo-700 z-50 right-2 bottom-2 lg:right-8 lg:bottom-8"
        }
        onClick={scrollToTop}
      >
        <ArrowCircleUpIcon className="h-6 w-6" />
      </button>
    </Transition>
  );
};

export default ButtonScroll;
