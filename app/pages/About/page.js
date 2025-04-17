import { ModeToggle } from "@/components/theme/darkmode";
import Topbar from "@/components/Topbar";
import Link from "next/link";

import { GrLinkedin, GrGithub } from "react-icons/gr";
import { BsGlobe2 } from "react-icons/bs";

export default function page() {
  return (
    <>
      <Topbar />
      <div className="contain flex lg:flex-row flex-col h-screen p-8 text-3xl w-screen items-start lg:mt-20">
        <div className="info flex-col justify-center p-4 h-max w-full lg:w-1/2 lg:py-20 ">
          <h2 className=" lg:text-5xl">
            simple weather application built for easy to read{" "}
            <span className="underline heading underline-offset-8 lg:text-5xl ">at-a-glance</span>{" "}
            weather report
          </h2>
          <div className="about my-10">
            <div>
              <p>
                {" "}
                by <span className="underline underline-offset-8 title">Abhishek Maliyal</span>{" "}
                <span>
                  using :-{" "}
                  <span className="techstack lg:my-10 my-5 flex flex-col">
                    <span className="tech hover:text-4xl hover:font-bold">- NextJS</span>
                    <span className="tech hover:text-4xl hover:font-bold">- TailwindCSS</span>
                    <span className="tech hover:text-4xl hover:font-bold">- OpenWeatherMapAPI</span>
                    <span className="tech hover:text-4xl hover:font-bold">- ContextAPI</span>
                  </span>
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="links flex lg:flex-col gap-10 lg:gap-0 p-4 w-full lg:w-1/2 h-max lg:py-20 items-center justify-center">
          <Link href="https://www.linkedin.com/in/abhishek-maliyal-a3113b217/" className="lg:p-6 flex flex-col lg:flex-row items-center text-xl lg:text-3xl">
            <GrLinkedin className="w-20 h-20" />
            <p className="lg:p-10">linkedin</p>
          </Link>
          <Link href="https://github.com/abhishekmaliyal" className="lg:p-6  flex flex-col lg:flex-row items-center text-xl lg:text-3xl">
            <GrGithub className="w-20 h-20" />
            <p className="lg:p-10">github</p>
          </Link>
          <Link href="https://abhishekmaliyal.netlify.app/" className="lg:p-6  flex flex-col lg:flex-row items-center text-xl lg:text-3xl">
            <BsGlobe2 className="w-20 h-20" />
            <p className="lg:p-10">portfolio</p>
          </Link>
        </div>
      </div>
      <ModeToggle />
    </>
  );
}
