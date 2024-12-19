import {
    FaceSmileIcon,
    ChartBarSquareIcon,
    CursorArrowRaysIcon,
    DevicePhoneMobileIcon,
    AdjustmentsHorizontalIcon,
    SunIcon,
  } from "@heroicons/react/24/solid";
  
  import benefitOneImg from "../../public/img/image-1.jpg";
  import benefitTwoImg from "../../public/img/image-2.jpg";
  
  const benefitOne = {
    title: "Understand your customers",
    desc: "Gain comprehensive insights across different platforms by consolidating user activity data from various applications into a single dashboard.",
    image: benefitOneImg,
    bullets: [
      {
        title: "Improve acquisition",
        desc: "Enjoy cost-effective, auto-scaling features that reduce overhead costs compared to traditional analytics solutions.",
        icon: <FaceSmileIcon />,
      },
      {
        title: "Drive customer retention",
        desc: "Make data-driven decisions with real-time updates and visualizations. Improve user engagement and retention by understanding user behavior in depth.",
        icon: <ChartBarSquareIcon />,
      },
      {
        title: "Enhanced Security",
        desc: "Decentralized storage provides self-sovereignty and reduces central points of failure.",
        icon: <CursorArrowRaysIcon />,
      },
    ],
  };
  
  const benefitTwo = {
    title: "Some Extra Features",
    desc: "",
    image: benefitTwoImg,
    bullets: [
      {
        title: "Seamless Integration",
        desc: "Easily integrate the SDK with any application, whether web2 or web3.",
        icon: <DevicePhoneMobileIcon />,
      },
      {
        title: "Advanced Analytics",
        desc: "Real-time data processing and visualization through a user-friendly dashboard.",
        icon: <AdjustmentsHorizontalIcon />,
      },
      {
        title: "Web3 Infrastructure Benefits",
        desc: "Reduced latency and minimized overhead through edge Fleek functions.",
        icon: <SunIcon />,
      },
    ],
  };
  
  
  export {benefitOne, benefitTwo};