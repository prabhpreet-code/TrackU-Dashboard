// src/components/Registration.js
"use client";
import React, { useState } from 'react';
import { FaCheckCircle, FaClipboard } from 'react-icons/fa';
import { WalletOptions } from './connections/walletOptions';
import { useAccount } from 'wagmi';
import { Account } from './connections/account';
import { useRouter } from 'next/navigation'
import { BACKEND_URL, COUNTRIES } from "@/constants"
import axios from 'axios';
import { CldImage } from 'next-cloudinary';

const steps = [
  { id: '01', title: 'Connect Wallet' },
  { id: '02', title: 'Company Details' },
  { id: '03', title: 'Preview' },
];

const ConnectWallet = () => {

  const { address } = useAccount()

  return(
    <div className='flex gap-10'>
      {
        address ? <Account /> : <WalletOptions />
      }
    </div>
  );
}

const ApplicationForm = ({ email, setEmail, phone, setPhone, setCountry, country, setImgUrl }: any) => {

  const [image, setImage ] = useState("");

  const uploadImage = () => {
    const data = new FormData()
      data.append("file", image)
      data.append("upload_preset", "tutorial")
      data.append("cloud_name","breellz")
      fetch("https://api.cloudlinary.com/v1_1/dwwcryioj/image/upload",{
          method:"post",
          body: data
      })
      .then(resp => resp.json())
      .then(data => {
        setImgUrl(data.url)
      })
      .catch(err => console.log(err))
  }

  return(
    <div className='flex gap-10'>
      <form className="max-w-sm mx-auto">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
              <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
              <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
            </svg>
          </div>
          <input type="text" onChange={(e) => setEmail(e.target.value)} value={email} id="email-address-icon" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@tracku.com" />
        </div>

        <div className='mt-5'>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Country</label>
          <select 
            onChange={(e) => setCountry(e.target.value)}
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          >
            {
              COUNTRIES.map((item: any, index: any) => {
                return(
                <option key={index} selected={country === item.countryName} value={item.countryName}> {item.emoji} {item.countryName}</option>
                );
              })
            }
          </select>
        </div>

        <div className='mt-5'>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Contact</label>
          <div className='flex gap-3'>
            <select className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/5 ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
              {
                COUNTRIES.map((item: any, index: any) => {
                  return(
                  <option key={index} value={item.countryName}>{item.emoji}</option>
                  );
                })
              }
            </select>
            <input type="text" onChange={(e) => setPhone(e.target.value)} value={phone} id="mobile" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-3/5 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123-456-789" />
          </div>
          
        </div>
        <div>
          {/* <input type="file" onChange= {(e)=> setImage(e?.target?.files[0])}></input>
          <button onClick={() => uploadImage()}>Upload</button> */}
          {/* <CldImage
            src={image} // Use this sample image or upload your own via the Media Explorer
            width="500" // Transform the image: auto-crop to square aspect_ratio
            height="500"
            crop={{
              type: 'auto',
              source: true
            }} alt={''} /> */}
        </div>

      </form>
    </div>
  );
}

const Registration = () => {
  const router = useRouter()

  const [currentStep, setCurrentStep] = useState(1);
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [loading, setLoading] = useState(false)
  const [apiKey, setApiKey] = useState("")
  const [country, setCountry] = useState(COUNTRIES[0].countryName)
  const [imgUrl, setImgUrl] = useState("")

  const { address } = useAccount()

  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiKey);
    alert('Copied to clipboard');
  };

  const saveData = async (data: Object) => {  
    // API needs to be connected 
    setLoading(true)
    await axios.post(`${BACKEND_URL}/registerUser`, {
      walletAddress: address,
      email,
      phone,
      country
    })
      .then(function (response) {
        console.log(response);
        setCurrentStep(3)
        setApiKey(response.data.apiKey)
      })
      .catch(function (error) {
        console.log(error);
        alert("Something Went Wrong")
        setCurrentStep(2)
      })
      .finally(function () {
      });
      setLoading(false)
  }

  const checkUserRegistered = async () => {
    setLoading(true)
    
    await axios.get(`${BACKEND_URL}/checkUser?walletAddress=${address}`)
      .then(function (response) {
          console.log(response);
          if(response.data) {
            router.push("/dashboard")
          } else {
            setCurrentStep((prev) => Math.min(prev + 1, steps.length))
          }
      })
      .catch(function (error) {
          console.log(error);
          setCurrentStep((prev) => Math.min(prev + 1, steps.length))
      })
      .finally(function () {
      });

    setLoading(false)
  }

  return (
    <div className="container mx-auto mt-10 p-4">
      <div className="flex justify-between items-center mb-8">
        {steps.map((step, index) => (
          <div key={step.id} className="flex-1 flex items-center">
            <div className={`relative flex items-center justify-center w-10 h-10 rounded-full ${currentStep > index + 1 ? 'bg-blue-600 text-white' : 'bg-white border-2 border-gray-300'}`}>
              {currentStep > index + 1 ? <FaCheckCircle className='text-3xl' /> : <span className={`${currentStep === index + 1 ? 'text-blue-600' : 'text-gray-500'}`}>{step.id}</span>}
            </div>
            <div className={`ml-2 ${currentStep === index + 1 ? 'text-blue-600 font-medium' : 'text-gray-200'}`}>
              {step.title}
            </div>
            {index < steps.length && (
              <div className={`flex-auto border-t-2 transition duration-500 ease-in-out mx-4 ${currentStep > index + 1 ? 'border-blue-600' : 'border-gray-300'}`}></div>
            )}
          </div>
        ))}
      </div>
      <div className="p-8 border rounded-lg shadow-lg bg-trueGray-800 text-gray-200">
        {currentStep === 1 && !loading && <ConnectWallet />}
        {currentStep === 2 && !loading && <ApplicationForm country={country} setCountry={setCountry} email={email} setLoading={setLoading} setCurrentStep={setCurrentStep} setEmail={setEmail} phone={phone} setPhone={setPhone} setImgUrl={setImgUrl} />}
        {currentStep === 3 && !loading && (
          <div className="mb-5">
            <h3 className='text-2xl font-semibold'>Copy Your API KEY</h3>
            <div className="relative p-4 bg-gray-800 text-white rounded-lg mt-3">
                <button
                    onClick={copyToClipboard}
                    className="absolute top-2 right-2 p-1 bg-gray-700 hover:bg-gray-600 rounded"
                >
                    <FaClipboard className="text-white" />
                </button>
                <pre className="whitespace-pre-wrap">{apiKey}</pre>
                </div>
        </div>
        )}
        {loading && (
          <div className="flex items-center justify-center w-56 h-56 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
            <div role="status">
                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
                <span className="sr-only">Loading...</span>
            </div>
        </div>
        )}
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 1))}
          className={`px-4 py-2 rounded ${currentStep === 1 ? 'bg-gray-300 text-gray-700 cursor-not-allowed' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'}`}
          disabled={currentStep === 1}
        >
          Previous
        </button>
        <button
          onClick={() => {
            if(currentStep === 1 && address) {
              checkUserRegistered()
              return;
            }
            if(currentStep === 1 && !address) {
              return;
            }
            if(currentStep === steps.length - 1) {
              saveData({
                walletAddress: address,
              })
            }
            if(currentStep === steps.length) {
              router.push("/dashboard")
            }
            setCurrentStep((prev) => Math.min(prev + 1, steps.length))
          }}
          className={`px-4 py-2 rounded ${(currentStep === 1 && !address) ? 'bg-blue-300 text-white cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
          disabled={(currentStep === 1 && !address)}
        >
          {currentStep === steps.length ? "Submit" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default Registration;
