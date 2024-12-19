import { Container } from "@/components/landing/Container";
import { use, useEffect, useState } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { FaPlus } from "react-icons/fa";
import { BACKEND_URL, COUNTRIES } from "@/constants"
import axios from 'axios';
import { IoIosSettings } from "react-icons/io";
import { FaClipboard } from 'react-icons/fa';
import { FaUser } from "react-icons/fa";
import { signMessage } from '@wagmi/core'
import React from "react";
import { wagmiConfig } from '@/wagmi'
import { switchChain } from '@wagmi/core'
import { base } from '@wagmi/core/chains'
import { FaPhoneAlt } from "react-icons/fa";
import Heatmap from "@/components/Heatmap"
import { Pie, Cell, PieChart, BarChart, Bar, Rectangle, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
    const router = useRouter()

    const { address } = useAccount()
    const { disconnect } = useDisconnect()
    const [projects, setProjects] = useState([])
    const [cta, setCta] = useState(true);
    const [contentArea, setContentArea] = useState("Dashboard")
    const [refetch, setRefetch] = useState(false)
    const [userData, setUserData] = useState({})
    const [projectData, setProjectData] =useState({})
    const [selectedProject, setSelectedProject] = useState(projects ? projects[0]?._id : "")
    const [selectedUser, setSelectedUser] = useState("NA")
    const [selectedUserData, setSelectedUserData] = useState({})

    const code = "npm install @mrkc2303/tracku-sdk"

    const COLORS = ['#00C49F', '#FF8042'];

    const copyToClipboard = (codeToCopy) => {
        navigator.clipboard.writeText(codeToCopy);
        alert('Copied to clipboard');
    };

    const formatDuration = (duration, isTotalDuration = false) => {
        if (isTotalDuration) {
          const milliseconds = duration % 1000;
          const seconds = Math.floor((duration / 1000) % 60);
          const minutes = Math.floor((duration / (1000 * 60)) % 60);
          const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
      
          return `${hours} Hours ${minutes} Minutes ${seconds} Seconds ${milliseconds} Milliseconds`;
        } else {
          const seconds = duration / 1000;
          if (seconds < 60) {
            return `${seconds.toFixed(2)} Seconds`;
          }
      
          const minutes = seconds / 60;
          if (minutes < 60) {
            return `${minutes.toFixed(2)} Minutes`;
          }
      
          const hours = minutes / 60;
          return `${hours.toFixed(2)} Hours`;
        }
    };

    const getData = async () => {

        let prj = 0;

        await axios.get(`${BACKEND_URL}/checkUser?walletAddress=${address}`)
        .then(function (response) {
            console.log(response);
            setUserData(response.data)
        })
        .catch(function (error) {
            console.log(error);
        })
        .finally(function () {
        });

        await axios.get(`${BACKEND_URL}/getProjectsByUser?walletAddress=${address}`)
            .then(function (response) {
                console.log(response);
                setProjects(response.data)
                prj = response.data.length
                if(response.data.length != 0 || response.data) {
                    setSelectedProject(response.data[0]?._id)
                }
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {
            });
       
        if(prj) {
            console.log(userData)
            await axios.get(`${BACKEND_URL}/getProjectDetails?projectId=${selectedProject}&apiKey=${userData?.apiKey}`)
                .then(function (response) {
                    console.log(response);
                    // setUserData(response.data)
                    setContentArea("Dashboard")
                    setProjectData(response.data)
                })
                .catch(function (error) {
                    console.log(error);
                })
                .finally(function () {
                });
        } else {
            setContentArea("Add_Project")
        }
    }

    const getProjects = async() => {
        if(projects) {
            await axios.get(`${BACKEND_URL}/getProjectDetails?projectId=${selectedProject}&apiKey=${userData?.apiKey}`)
                .then(function (response) {
                    console.log(response);
                    // setUserData(response.data)
                    setProjectData(response.data)
                })
                .catch(function (error) {
                    console.log(error);
                })
                .finally(function () {
                });
        }
    }

    // useEffect(() => {
    //     if(!address) {
    //         return;
    //     }
    //     getData()
    // }, [])

    useEffect(() => {
        if(!address) {
            return;
        }
        getData()
    }, [address, refetch])

    useEffect(() => {
        getProjects()
    }, [selectedProject])

    useEffect(() => {
        setSelectedUserData(projectData?.uniqueUsers?.find((user) => user?.userId === selectedUser))
    }, [selectedUser])

    if(!address) {
        return(
            <Container>
                <div className="flex items-center justify-center">
                    <h1 className="text-6xl">Unauthorized Access!!!</h1>
                </div>
            </Container>
        )
    }

    const Layout = () => {

        if(!projects || projects.length === 0) {
            return (
                <div className="p-4 sm:ml-64">
                    <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                        NO PROJECTS FOUND!! <br />
                        PLEASE CREATE ONE
                    </div>
                </div>
            );
        }
        
        return(
            <div className="p-4 sm:ml-64">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                            <p className="text-2xl text-gray-400 dark:text-gray-500">
                            <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
                            </svg>
                            </p>
                        </div>
                        <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                            <p className="text-2xl text-gray-400 dark:text-gray-500">
                            <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
                            </svg>
                            </p>
                        </div>
                        <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                            <p className="text-2xl text-gray-400 dark:text-gray-500">
                            <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
                            </svg>
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
                        <p className="text-2xl text-gray-400 dark:text-gray-500">
                            <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
                            </svg>
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                            <p className="text-2xl text-gray-400 dark:text-gray-500">
                            <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
                            </svg>
                            </p>
                        </div>
                        <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                            <p className="text-2xl text-gray-400 dark:text-gray-500">
                            <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
                            </svg>
                            </p>
                        </div>
                        <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                            <p className="text-2xl text-gray-400 dark:text-gray-500">
                            <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
                            </svg>
                            </p>
                        </div>
                        <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                            <p className="text-2xl text-gray-400 dark:text-gray-500">
                            <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
                            </svg>
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
                        <p className="text-2xl text-gray-400 dark:text-gray-500">
                            <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
                            </svg>
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                            <p className="text-2xl text-gray-400 dark:text-gray-500">
                            <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
                            </svg>
                            </p>
                        </div>
                        <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                            <p className="text-2xl text-gray-400 dark:text-gray-500">
                            <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
                            </svg>
                            </p>
                        </div>
                        <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                            <p className="text-2xl text-gray-400 dark:text-gray-500">
                            <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
                            </svg>
                            </p>
                        </div>
                        <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                            <p className="text-2xl text-gray-400 dark:text-gray-500">
                            <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
                            </svg>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        );
    }

    const Settings = () => {
        return(
            <div className="p-4 sm:ml-64">
                <div className="w-full flex flex-col p-4 border-2 text-gray-200 border-gray-200 rounded-lg dark:border-gray-700 bg-transparent">
                    <div>
                        <h2 className="font-semibold text-3xl">Personal Information</h2>
                        <div className="w-full flex flex-col gap-10 mt-5">
                            <div className="w-full flex justify-between gap-20">
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input value={userData?.email} type="email" id="email" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" />

                                    <p id="helper-text-explanation" className="mt-2 text-sm text-gray-500 dark:text-gray-400">We’ll never share your details. Read our <a href="#" className="font-medium text-blue-600 hover:underline dark:text-blue-500">Privacy Policy</a>.</p>
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Country</label>

                                    <select 
                                        // onChange={(e) => setCountry(e.target.value)}
                                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                    >
                                        {
                                        COUNTRIES.map((item, index) => {
                                            return(
                                            <option key={index} selected={userData?.country === item.countryName} value={item.countryName}> {item.emoji} {item.countryName}</option>
                                            );
                                        })
                                        }
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contact Number</label>
                                <div className="flex">
                                    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                        <FaPhoneAlt />
                                    </span>
                                    <input value={userData?.phone} type="text" id="website-admin" className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Bonnie Green" />
                                </div>

                            </div>
                           
                        </div>
                    </div>
                    <div className="mt-20">
                        <div className="mb-5">
                            <h2 className="font-semibold text-3xl">Your API KEY</h2>
                            <div className="relative p-4 bg-gray-800 text-white rounded-lg mt-5">
                                <button
                                    onClick={() => copyToClipboard(userData?.apiKey)}
                                    className="absolute top-2 right-2 p-1 bg-gray-700 hover:bg-gray-600 rounded"
                                >
                                    <FaClipboard className="text-white" />
                                </button>
                                <pre className="whitespace-pre-wrap">{userData?.apiKey.slice(0, 19) + "****-************"}</pre>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const DashboardData = () => {
        return(
            <div className="p-4 sm:ml-64">
                <div className="w-full border-2 p-4 flex gap-10 border-gray-200 rounded-lg text-gray-200 dark:border-gray-700 mb-10 bg-transparent">
                    <div className="w-1/2">
                        <span className="font-bold text-lg">Your Project Name</span>
                        <div className="relative p-4 bg-gray-800 text-white rounded-lg mt-3">
                            <button
                                onClick={() => copyToClipboard(projects && projects?.find((e) => e._id === selectedProject)?.projectName)}
                                className="absolute top-2 right-2 p-1 bg-gray-700 hover:bg-gray-600 rounded"
                            >
                                <FaClipboard className="text-white" />
                            </button>
                            <pre className="whitespace-pre-wrap">{projects && projects?.find((e) => e._id === selectedProject)?.projectName}</pre>
                        </div>
                    </div>
                    <div className="w-1/2">
                        <span className="font-bold text-lg">Your Project ID</span>
                        <div className="relative p-4 bg-gray-800 text-white rounded-lg mt-3">
                            <button
                                onClick={() => copyToClipboard(code)}
                                className="absolute top-2 right-2 p-1 bg-gray-700 hover:bg-gray-600 rounded"
                            >
                                <FaClipboard className="text-white" />
                            </button>
                            <pre className="whitespace-pre-wrap">{selectedProject}</pre>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col p-4 border-2 text-gray-200 border-gray-200 rounded-lg dark:border-gray-700 bg-transparent">
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="flex flex-col py-3 px-5 items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                            <span className="font-semibold text-sm">Project Visits</span>
                            <p className="text-6xl font-semibold text-gray-200">
                                {projectData?.totalPageViews}
                            </p>
                        </div>
                        <div className="flex flex-col py-3 px-5 items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                            <span className="font-semibold text-sm">Unique Project Visits</span>
                            <p className="text-6xl font-semibold text-gray-200">
                                {projectData?.uniquePageViews}
                            </p>
                        </div>
                        <div className="flex flex-col py-3 px-5 items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                            <span className="font-semibold text-sm">Average Visits per User</span>
                            <p className="text-6xl font-semibold text-gray-200">
                                {projectData?.averagePageViewsPerUser?.toFixed(2) || 0}
                            </p>
                        </div>
                    </div>
                    <div className="mt-10">
                        <h1 className="text-4xl font-semibold">
                            Views Per Day
                        </h1>
                        <div className="mt-5 bg-gray-50 dark:bg-gray-800 pt-10">
                            {/* <ResponsiveContainer width="100%" height="100%"> */}
                                <LineChart
                                    width={500}
                                    height={300}
                                    data={projectData?.pageViewsPerDay}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                    className="mx-auto"
                                    >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    {/* <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} /> */}
                                    <Line type="monotone" dataKey="views" stroke="#82ca9d" />
                                </LineChart>
                            {/* </ResponsiveContainer> */}
                        </div>
                        
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4 mt-10">
                        <div className="col-span-3 flex flex-col py-3 px-5 items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                            <span className="font-semibold text-sm">Total Site Stay Duration</span>
                            <p className="text-4xl font-semibold text-gray-200">
                                {formatDuration(projectData?.totalPageStayDuration, true)}
                            </p>
                        </div>
                        <div className="flex flex-col py-3 px-5 items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                            <span className="font-semibold text-sm">Stay Duration in last 24 Hours</span>
                            <p className="text-4xl font-semibold text-gray-200">
                                {formatDuration(projectData?.last24HoursPageStayDuration)}
                            </p>
                        </div>
                        <div className="flex flex-col py-3 px-5 items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                            <span className="font-semibold text-sm">Stay Duration in last 7 Days</span>
                            <p className="text-4xl font-semibold text-gray-200">
                                {formatDuration(projectData?.last7DaysPageStayDuration)}
                            </p>
                        </div>
                        <div className="flex flex-col py-3 px-5 items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                            <span className="font-semibold text-sm">Average User Stay Duration</span>
                            <p className="text-4xl font-semibold text-gray-200">
                                {formatDuration(projectData?.averageStayDurationPerUser)}
                            </p>
                        </div>
                    </div>

                    <div className="mt-10">
                        <h1 className="text-4xl font-semibold">
                            Stay Duration Per Day
                        </h1>
                        <div className="mt-5 bg-gray-50 dark:bg-gray-800 pt-10">
                            {/* <ResponsiveContainer width="100%" height="100%"> */}
                                <BarChart
                                    width={500}
                                    height={300}
                                    data={projectData?.sessionDataPerDay}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                    className="mx-auto"
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    {/* <YAxis /> */}
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="duration" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                                </BarChart>
                            {/* </ResponsiveContainer> */}
                        </div>
                    </div>

                    <div className="mt-10">
                        <h1 className="text-4xl font-semibold">
                            HeatMap
                        </h1>
                        <div className="mt-5 bg-gray-50 dark:bg-gray-800 py-5 flex items-center justify-center">
                            <Heatmap clickData={projectData?.totalInteractions?.clicks} scrollData={projectData?.totalInteractions?.scrolls} />
                        </div>
                    </div>

                    <div className="mt-10">
                        <h1 className="text-4xl font-semibold">
                            Page Views
                        </h1>
                        <div className="mt-5 bg-gray-50 dark:bg-gray-800 py-5 flex items-center justify-center">
                            <div className="relative overflow-x-auto">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                Link / URL
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Page Views
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Unique Views
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            projectData?.urlPageViewCounts?.map((item, index) => {
                                                return(
                                                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                            {item?.link}
                                                        </th>
                                                        <td className="px-6 py-4">
                                                            {item?.views}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {item?.uniqueViews}
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        }
                                        
                                        
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>

                    <div className="mt-10">
                        <h1 className="text-4xl font-semibold">
                            Performance Analysis
                        </h1>
                        <div className="grid grid-cols-3 gap-4 mb-4 mt-10">
                            {/* <div className="col-span-3 flex flex-col py-3 px-5 items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                                <span className="font-semibold text-sm">Total Site Stay Duration</span>
                                <p className="text-4xl font-semibold text-gray-200">
                                    {formatDuration(projectData?.fastestLoadTime)}
                                </p>
                            </div> */}
                            <div className="flex flex-col py-3 px-5 items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                                <span className="font-semibold text-sm">Fastest Load Time</span>
                                <p className="text-4xl font-semibold text-gray-200">
                                    {formatDuration(projectData?.fastestLoadTime)}
                                </p>
                            </div>
                            <div className="flex flex-col py-3 px-5 items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                                <span className="font-semibold text-sm">Average Load Time</span>
                                <p className="text-4xl font-semibold text-gray-200">
                                    {formatDuration(projectData?.averageLoadTime)}
                                </p>
                            </div>
                            <div className="flex flex-col py-3 px-5 items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                                <span className="font-semibold text-sm">Slowest Load Time</span>
                                <p className="text-4xl font-semibold text-gray-200">
                                    {formatDuration(projectData?.slowestLoadTime)}
                                </p>
                            </div>
                        </div>
                        <div className="w-full flex gap-5 mt-5">
                            <div className="w-1/2">
                                <h3 className="font-semibold text-2xl">Operating System Analysis</h3>
                                <table className="mt-5 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                OS
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Count
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            projectData?.uniqueOs?.map((item, index) => {
                                                return(
                                                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                            {item?.type}
                                                        </th>
                                                        <td className="px-6 py-4">
                                                            {item?.count}
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        }
                                        
                                        
                                    </tbody>
                                </table>
                            </div>
                            <div className="w-1/2">
                                <h3 className="font-semibold text-2xl">Browser Analysis</h3>
                                <table className="mt-5 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                Browser
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Count
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            projectData?.uniqueBrowsers?.map((item, index) => {
                                                return(
                                                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                            {item?.type}
                                                        </th>
                                                        <td className="px-6 py-4">
                                                            {item?.count}
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        }
                                        
                                        
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10">
                        <h1 className="text-4xl font-semibold">
                            Registered Users
                        </h1>
                        <div className="mt-5 bg-gray-50 dark:bg-gray-800 py-5 flex items-center justify-center">
                            <div className="flex flex-wrap p-5 gap-8">
                            {
                                projectData?.uniqueUsers?.map((item, index) => {
                                    if(index > 50) {
                                        return;
                                    }
                                    return(
                                        <button key={index} className="bg-white dark:bg-gray-700 px-4 py-2 rounded-lg">
                                            {item?.userId}
                                        </button>
                                    );
                                })
                            }
                            </div>

                        </div>
                    </div>

                    <div className="mt-10">
                        <h1 className="text-4xl font-semibold">
                            Errors Track
                        </h1>
                        <div className="mt-5 bg-gray-50 dark:bg-gray-800 py-5 flex items-center justify-center">
                            {
                                projectData && (
                                    <PieChart width={400} height={400}>
                                        <Pie
                                            dataKey="value"
                                            isAnimationActive={false}
                                            data={[
                                                {
                                                    name: "Total Page Views",
                                                    value: projectData?.totalPageViews,
                                                },
                                                {
                                                    name: "Errors Faced by Users",
                                                    value: projectData?.errorsFacedByUser
                                                }
                                            ]}
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={200}
                                            fill="#8884d8"
                                            label
                                        >
                                            {[
                                                {
                                                    name: "Total Page Views",
                                                    value: projectData?.totalPageViews,
                                                },
                                                {
                                                    name: "Errors Faced by Users",
                                                    value: projectData?.errorsFacedByUser
                                                }
                                            ].map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                )
                            }
                            
                            <div className="flex flex-col py-3 px-5 ml-5 items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                                <span className="font-semibold text-sm">Error Percentage</span>
                                <p className="text-6xl font-semibold text-gray-200">
                                    {(Number(Number(projectData?.errorsFacedByUser) / (Number(projectData?.totalPageViews) + Number(projectData?.errorsFacedByUser))) * 100).toFixed(2)}%
                                </p>
                            </div>

                        </div>
                        <div className="relative h-96 overflow-x-auto overflow-y-auto">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                Link / URL
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Error
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                TimeStamp
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Line Number
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Column Number
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                User
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            projectData?.errorTrackData?.map((item, index) => {
                                                return(
                                                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                            {item?.data?.errors?.source}
                                                        </th>
                                                        <td className="px-6 py-4">
                                                            {item?.data?.errors?.error}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {item?.data?.errors?.timestamp}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {item?.data?.errors?.lineno}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {item?.data?.errors?.colno}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {item?.userId}
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        }
                                        
                                        
                                    </tbody>
                                </table>
                            </div>
                    </div>
                </div>
            </div>
        )
    }

    const UserDataDashboard = () => {
        return(
            <div className="p-4 sm:ml-64">
                <div className="w-full border-2 p-4 flex flex-col gap-10 border-gray-200 rounded-lg text-gray-200 dark:border-gray-700 mb-10 bg-transparent">
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="w-full flex flex-col py-3 px-5 items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                            <span className="font-semibold text-sm">Users Registered</span>
                            <p className="text-6xl font-semibold text-gray-200">
                                {projectData?.uniqueUsers?.length}
                            </p>
                        </div>
                    
                    </div>
                    <div className="w-full">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an User</label>
                        <select id="countries" onChange={(e) => setSelectedUser(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="NA" selected={selectedUser === "NA"}>Choose an User</option>
                            {projectData?.uniqueUsers?.map((user, index) => {
                                return(
                                    <option key={index} selected={selectedUser === user?.userId} value={user?.userId}>
                                        {user?.userId}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="mt-5">
                        {
                            selectedUser === "NA" 
                                ? (<div>
                                    <h1 className="font-semibold text-4xl">Please Select a User to see User Specific Data</h1>
                                </div>)
                                : (
                                    <div>
                                        <div className="grid grid-cols-3 gap-4 mb-4 mt-10">
                                            <div className="col-span-2 flex flex-col py-3 px-5 items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                                                <span className="font-semibold text-sm">Total Site Stay Duration</span>
                                                <p className="text-2xl font-semibold text-gray-200">
                                                    {formatDuration(selectedUserData?.stayDuration, true)}
                                                </p>
                                            </div>
                                            <div className="flex flex-col py-3 px-5 items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                                                <span className="font-semibold text-sm">Total Page Visits</span>
                                                <p className="text-4xl font-semibold text-gray-200">
                                                    {selectedUserData?.count}
                                                </p>
                                            </div>
                                            <div className="flex flex-col py-3 px-5 items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                                                <span className="font-semibold text-sm">Stay Duration in last 24 Hours</span>
                                                <p className="text-4xl font-semibold text-gray-200">
                                                    {selectedUserData?.pageViewsLast24Hours}
                                                </p>
                                            </div>
                                            <div className="flex flex-col py-3 px-5 items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                                                <span className="font-semibold text-sm">Stay Duration in last 7 Days</span>
                                                <p className="text-4xl font-semibold text-gray-200">
                                                    {selectedUserData?.pageViewsLast7Days}
                                                </p>
                                            </div>
                                            <div className="flex flex-col py-3 px-5 items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                                                <span className="font-semibold text-sm">Errors Faced while Browsing</span>
                                                <p className="text-4xl font-semibold text-gray-200">
                                                    {selectedUserData?.errors}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mt-10">
                                            <h1 className="text-4xl font-semibold">
                                                HeatMap
                                            </h1>
                                            {
                                                (!selectedUserData?.clicks || !selectedUserData?.scrolls || selectedUserData?.scrolls.length === 0 || selectedUserData?.clicks.length === 0) ? (
                                                    <div className="mt-5 bg-gray-50 dark:bg-gray-800 py-5 flex items-center justify-center">
                                                        <h1 className="text-2xl font-bold">Insufficient Data to Generate Heat Map</h1>
                                                    </div>
                                                ) : (
                                                    <div className="mt-5 bg-gray-50 dark:bg-gray-800 py-5 flex items-center justify-center">
                                                        <Heatmap clickData={selectedUserData?.clicks} scrollData={selectedUserData?.scrolls} />
                                                    </div>
                                                )
                                            }
                                            
                                        </div>
                                        <div className="mt-10">
                                            <h1 className="text-4xl font-semibold">
                                                Performance Analysis
                                            </h1>
                                            <div className="grid grid-cols-3 gap-4 mb-4 mt-10">
                                                <div className="flex flex-col py-3 px-5 items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                                                    <span className="font-semibold text-sm">Fastest Load Time</span>
                                                    <p className="text-4xl font-semibold text-gray-200">
                                                        {formatDuration(selectedUserData?.fastestLoadTime)}
                                                    </p>
                                                </div>
                                                <div className="flex flex-col py-3 px-5 items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                                                    <span className="font-semibold text-sm">Average Load Time</span>
                                                    <p className="text-4xl font-semibold text-gray-200">
                                                        {formatDuration(selectedUserData?.averageLoadTime)}
                                                    </p>
                                                </div>
                                                <div className="flex flex-col py-3 px-5 items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                                                    <span className="font-semibold text-sm">Slowest Load Time</span>
                                                    <p className="text-4xl font-semibold text-gray-200">
                                                        {formatDuration(selectedUserData?.slowestLoadTime)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                   
                                )
                        }
                    </div>
                </div>
            </div>
        );
    }

    const AddProject = () => {

        const [projectName, setProjectName] = useState("")
        const [estimatedUsers, setEstimatedUsers] = useState("0-1000")

        const addProject = async () => {
            const provider = window.ethereum;
            try {
                // await provider
                //         .request({
                //           method: "wallet_addEthereumChain",
                //           params: [
                //             {
                //               chainId: base.id,
                //               chainName: base.name,
                //               rpcUrls: base.rpcUrls.default.http,
                //               nativeCurrency: base.nativeCurrency
                //             },
                //           ],
                //         });
                // await switchChain(wagmiConfig, { chainId: base.id })
                await signMessage(wagmiConfig, { message: `${address}-${projectName}` })

                await axios.post(`${BACKEND_URL}/addProject`, {
                    walletAddress: address,
                    projectName: projectName,
                    estimatedUsers: estimatedUsers
                  })
                    .then(function (response) {
                      console.log(response);
                      //   router.push("/dashboard")
                      setContentArea("Dashboard")
                    })
                    .catch(function (error) {
                      console.log(error);
                      alert("Something Went Wrong")
                    })
                    .finally(function () {
                    });
            } catch(e) {
                console.log(e)
            }
            setRefetch(!refetch)
        }

        // const NameProject = () => {
            
        //     return(
                
        //     );
        // }

        const steps = [
            { title: "Name your Project", description: "Look out for some awesome name for your project ;)" },
            { title: "Project information", description: "We need some data from you. We will keep this a secret." },
            { title: "Set-Up your Project", description: "Let's begin to setup your project" },
            // { title: "Theme", description: "Faucibus nec enim leo et." },
            // { title: "Preview", description: "Iusto et officia maiores porro ad non quas." },
        ];

        const [currentStep, setCurrentStep] = useState(0);
      
        const nextStep = () => {
          if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
          }
        };
      
        const prevStep = () => {
          if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
          }
        };
      
        const goToStep = (stepIndex) => {
          setCurrentStep(stepIndex);
        };
      
        return (
            <div className="p-4 sm:ml-64">
              <div className="flex p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 bg-transparent">
                <div className="w-1/3 p-6">
                  <div className="space-y-4">
                    {steps.map((step, index) => (
                      <div
                        key={index}
                        onClick={() => goToStep(index)}
                        className={`cursor-pointer flex items-start space-x-3 ${index <= currentStep ? 'text-indigo-400' : 'text-gray-600'}`}
                      >
                        <div className={`flex-shrink-0 w-6 h-6 border-2 rounded-full flex items-center justify-center ${index <= currentStep ? 'border-indigo-400' : 'border-gray-600'}`}>
                          {index <= currentStep && <span className="text-indigo-400 font-bold">{index + 1}</span>}
                        </div>
                        <div>
                          <p className={`font-medium ${index <= currentStep ? 'text-indigo-400' : 'text-gray-600'}`}>{step.title}</p>
                          <p className={`text-sm ${index <= currentStep ? 'text-gray-200' : 'text-gray-600'}`}>{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="w-2/3 p-6 text-gray-200">
                  <div className="mb-4">
                    {/* Form content goes here. Change content based on currentStep */}
                    <div>
                      <h2 className="text-xl font-bold mb-2">{steps[currentStep].title}</h2>
                      <p className="text-gray-400 mb-4">{steps[currentStep].description}</p>
                      {/* Replace with your form fields based on currentStep */}
                      <div className="border p-4 border-gray-600 bg-transparent">
                        {/* {`Form content for step ${currentStep + 1}`} */}
                        { steps[currentStep].title === "Name your Project" && (
                            <div className="mb-5">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Project Name</label>
                                <input 
                                    onChange={(e) => setProjectName(e.target.value)}
                                    value={projectName || ""}
                                    type="text" 
                                    id="base-input" 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                />
                            </div>
                        )}

                        { steps[currentStep].title === "Project information" && (
                            <div className="mb-5">
                                {/* EMAIL CODE */}
                                {/* <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                                            <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
                                            <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
                                        </svg>
                                    </div>
                                    <input 
                                        type="text" 
                                        id="email-address-icon" 
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        placeholder="name@tracku.com" 

                                    />
                                </div> */}
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Current Userbase</label>
                                <select id="currUserBase" onChange={(e) => setEstimatedUsers(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option value="0-1000">0-1000</option>
                                    <option value="1000-10000">1000-10,000</option>
                                    <option value="10000-1000000">10,000-1,000,000</option>
                                    <option value="1000000+">1,000,000+</option>
                                </select>
                            </div>
                        )}

                        { steps[currentStep].title === "Set-Up your Project" && (
                            <div className="mb-5">
                                <div className="relative p-4 bg-gray-800 text-white rounded-lg">
                                    <button
                                        onClick={() => copyToClipboard(code)}
                                        className="absolute top-2 right-2 p-1 bg-gray-700 hover:bg-gray-600 rounded"
                                    >
                                        <FaClipboard className="text-white" />
                                    </button>
                                    <pre className="whitespace-pre-wrap">{code}</pre>
                                </div>
                            </div>
                        )}

                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <button
                      onClick={prevStep}
                      className={`px-4 py-2 text-white bg-gray-500 rounded ${currentStep === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-600'}`}
                      disabled={currentStep === 0}
                    >
                      Previous
                    </button>
                    <button
                      onClick={currentStep === steps.length -1 ? addProject :  nextStep}
                      className={`px-4 py-2 text-white bg-indigo-600 rounded ${(currentStep === 0 && !projectName) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-600'}`}
                      disabled={(currentStep === 0 && !projectName)}
                    >
                        {currentStep === steps.length - 1 ? "Finish" : "Next"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
    };

    return(
        <Container>
            <button data-drawer-target="sidebar-multi-level-sidebar" data-drawer-toggle="sidebar-multi-level-sidebar" aria-controls="sidebar-multi-level-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>

            <aside id="sidebar-multi-level-sidebar" className="fixed top-24 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
            <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 ">
                <div>
                    <ul className="space-y-2 font-medium">
                        <li>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Project</label>
                            <select id="projects" onChange={(e) => setSelectedProject(e.target.value)} disabled={(!projects || projects.length === 0)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                {(!projects || projects.length === 0) 
                                    ?
                                        <option value={"null"}>
                                            No Projects Found
                                        </option>
                                    : projects?.map((item, index) => {
                                    return(
                                        <option key={index} value={item?._id}>{item?.projectName}</option>
                                    );
                                })}
                            </select>
                        </li>
                        <li>
                            <button onClick={() => setContentArea("Add_Project")} className={`w-full flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${contentArea === "Add_Project" ? "bg-gray-100 dark:bg-gray-700" : ""}`}>
                                <FaPlus className="text-gray-500 dark:text-gray-400" />
                                <span className="ms-3">Add a Project</span>
                            </button>
                        </li>
                        <li>
                            <button onClick={() => setContentArea("Dashboard")} className={`w-full flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${contentArea === "Dashboard" ? "bg-gray-100 dark:bg-gray-700" : ""}`}>
                                <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
                                </svg>
                                <span className="ms-3">Dashboard</span>
                            </button>
                        </li>
                        <li>
                            <button onClick={() => setContentArea("UserData")} className={`w-full flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${contentArea === "UserData" ? "bg-gray-100 dark:bg-gray-700" : ""}`}>
                                <FaUser />
                                <span className="ms-3">User Data</span>
                            </button>
                        </li>
                    
                        {/* <li>
                            <button onClick={() => setContentArea("")} className={`w-full flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${contentArea === "" ? "bg-gray-100 dark:bg-gray-700" : ""}`}>
                                <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                                    <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/>
                                </svg>
                                <span className="ms-3">Kanban</span>
                            </button>
                        </li>
                        <li>
                            <button onClick={() => setContentArea("")} className={`w-full flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${contentArea === "" ? "bg-gray-100 dark:bg-gray-700" : ""}`}>
                                <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z"/>
                                </svg>
                                <span className="ms-3">Inbox</span>
                                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span>
                            </button>
                        </li>
                        <li>
                            <button onClick={() => setContentArea("")} className={`w-full flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${contentArea === "" ? "bg-gray-100 dark:bg-gray-700" : ""}`}>
                            <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
                            </svg>
                            <span className="ms-3">Users</span>
                            </button>
                        </li> */}

                        <li>
                            <button onClick={() => setContentArea("Settings")} className={`w-full flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${contentArea === "Settings" ? "bg-gray-100 dark:bg-gray-700" : ""}`}>
                                <IoIosSettings className="text-gray-500 dark:text-gray-400 h-5 w-5" />
                                <span className="ms-3">Settings</span>
                            </button>
                        </li>
                        {/* <li>
                            <button onClick={() => setContentArea("")} className={`w-full flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${contentArea === "" ? "bg-gray-100 dark:bg-gray-700" : ""}`}>
                                <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"/>
                                </svg>
                                <span className="ms-3">Sign In</span>
                            </button>
                        </li>
                        <li>
                            <button onClick={() => setContentArea("")} className={`w-full flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${contentArea === "" ? "bg-gray-100 dark:bg-gray-700" : ""}`}>
                                <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z"/>
                                    <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z"/>
                                    <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z"/>
                                </svg>
                                <span className="ms-3">Sign Up</span>
                            </button>
                        </li> */}
                    </ul>
                    <div id="dropdown-cta" className={`p-4 mt-6 rounded-lg bg-blue-50 dark:bg-blue-900 ${cta ? "" : "hidden"}`} role="alert">
                        <div className="flex items-center mb-3">
                            <span className="bg-orange-100 text-orange-800 text-sm font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-orange-200 dark:text-orange-900">Beta</span>
                            <button onClick={() => setCta(false)} type="button" className="ms-auto -mx-1.5 -my-1.5 bg-blue-50 inline-flex justify-center items-center w-6 h-6 text-blue-900 rounded-lg focus:ring-2 focus:ring-blue-400 p-1 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-400 dark:hover:bg-blue-800" data-dismiss-target="#dropdown-cta" aria-label="Close">
                                <span className="sr-only">Close</span>
                                <svg className="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                            </button>
                        </div>
                        <p className="mb-3 text-sm text-blue-800 dark:text-blue-400">
                            Preview the new Flowbite dashboard navigation! You can turn the new navigation off for a limited time in your profile.
                        </p>
                    </div>
                </div>
                <div>
                    <button 
                        onClick={async() => {
                            await disconnect()
                            router.push('/')
                        }} 
                        className="w-full mt-4 flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                    >
                        <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"/>
                        </svg>
                        <span className="ms-3">Sign Out</span>
                    </button>
                </div>
            </div>
            
            </aside>

            {/* MAIN CONTENT */}

            {contentArea === "" && <Layout />}
            {contentArea === "Add_Project" && <AddProject />}
            {contentArea === "Settings" && <Settings />}
            {contentArea === "Dashboard" && <DashboardData /> }
            {contentArea === "UserData" && <UserDataDashboard /> }

        </Container>
    )
}

export default Dashboard;