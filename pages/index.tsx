import Image from "next/image";
import { Inter } from "next/font/google";
import Registration from "@/components/Registration";

const inter = Inter({ subsets: ["latin"] });

import { Container } from "@/components/landing/Container";
import { Hero } from "@/components/landing/Hero";
import { SectionTitle } from "@/components/landing/SectionTitle";
import { Benefits } from "@/components/landing/Benefits";
import { Video } from "@/components/landing/Video";
import { Testimonials } from "@/components/landing/Testimonials";
import { Faq } from "@/components/landing/Faq";
import { Cta } from "@/components/landing/Cta";

import { benefitOne, benefitTwo } from "@/components/landing/data";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  

  return (
    // <main
    //   className=""
    // >
    //   <Registration />
    // </main>
    <Container>
      <Hero />
      <SectionTitle
        preTitle="TrackU Benefits"
        title="Why should you use our Analytics SDK"
      >
        TrackU is a state-of-the-art analytics tool for seamless integration across web3 and web2 applications. Utilizing Fleek on-chain edge functions, it offers reduced latency, minimal overhead, auto-scaling, and cost-effective pricing, bridging web3 and web2 ecosystems.
      </SectionTitle>

      <Benefits data={benefitOne} />
      <Benefits imgPos="right" data={benefitTwo} />

      <SectionTitle
        preTitle="Watch a video"
        title="Learn how to setup our Analytics SDK"
      >
        TrackU bridges the gap between web3 and web2, providing seamless integration for all applications. Enjoy the benefits of reduced latency, minimized overhead, auto-scaling capabilities, cost-effective pricing, and self-sovereignty with our cutting-edge analytics tool.
      </SectionTitle>

      <Video videoId="fZ0D0cnR88E" />

      {/* <SectionTitle
        preTitle="Testimonials"
        title="Here's what our customers said"
      >
        Testimonials is a great way to increase the brand trust and awareness.
        Use this section to highlight your popular customers.
      </SectionTitle>

      <Testimonials /> */}

      <SectionTitle preTitle="FAQ" title="Frequently Asked Questions">
        
      </SectionTitle>

      <Faq />
      <Cta />
      {/* <Footer /> */}
    </Container>
  );
}
