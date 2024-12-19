"use client";
import React from "react";
import { Container } from "@/components/landing/Container";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";

export const Faq = () => {
  return (
    <Container className="!p-0">
      <div className="w-full max-w-2xl p-2 mx-auto rounded-2xl">
        {faqdata.map((item, index) => (
          <div key={item.question} className="mb-5">
            <Disclosure>
              {({ open }) => (
                <>
                  <DisclosureButton className="flex items-center justify-between w-full px-4 py-4 text-lg text-left text-gray-800 rounded-lg bg-gray-50 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-indigo-100 focus-visible:ring-opacity-75 dark:bg-trueGray-800 dark:text-gray-200">
                    <span>{item.question}</span>
                    <ChevronUpIcon
                      className={`${
                        open ? "transform rotate-180" : ""
                      } w-5 h-5 text-indigo-500`}
                    />
                  </DisclosureButton>
                  <DisclosurePanel className="px-4 pt-4 pb-2 text-gray-500 dark:text-gray-300">
                    {item.answer}
                  </DisclosurePanel>
                </>
              )}
            </Disclosure>
          </div>
        ))}
      </div>
    </Container>
  );
}

const faqdata = [
  {
    question: "What is TrackU and how does it benefit my application?",
    answer: "TrackU is a cutting-edge analytics tool designed for seamless integration across both web3 and web2 applications. It leverages on-chain edge functions to offer reduced latency, minimized overhead, auto-scaling capabilities, cost-effective pricing, and self-sovereignty. By using TrackU, your application can enjoy the robust benefits of web3 infrastructure while gaining comprehensive insights into user activities.",
  },
  {
    question: "How does TrackU ensure data security and compliance?",
    answer: "TrackU ensures data security through end-to-end encryption and decentralized storage. This approach provides self-sovereignty and reduces central points of failure, ensuring that your data is protected and compliant with data protection regulations.",
  },
  {
    question: "What features does TrackU offer for tracking user interactions?",
    answer:
      "TrackU offers a comprehensive set of features for tracking user interactions, including page view tracking, event heatmaps, custom event tracking, error and performance tracking, and automated reward assignment. These features enable you to gain real-time insights into user behavior and improve engagement and retention.",
  },
  {
    question: "Can TrackU handle high traffic loads and scale as needed?",
    answer:
      "Yes, TrackU is designed with auto-scaling capabilities to handle varying traffic loads. It can manage millions of events per second, ensuring performance and reliability during high-traffic periods. This makes it a cost-effective solution that adapts to your needs and reduces overhead costs associated with traditional centralized analytics solutions.",
  },
];