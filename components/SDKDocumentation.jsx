import React from 'react';
import { FaDownload, FaPlay, FaUser, FaEye, FaMousePointer, FaBug, FaCode, FaFileCode } from 'react-icons/fa';
import { SiNpm } from 'react-icons/si';

const SDKDocumentation = () => {
  return (
    <div className="sdk-docs p-8 bg-black text-gray-200">
      <h1 className="text-4xl text-center mb-8 font-bold">@mrkc2303/tracku-sdk</h1>

      <div className="text-center mb-8">
        <p className="mb-4 text-lg leading-relaxed">
          <span className="font-bold text-gray-100">TrackU SDK</span> is a cutting-edge analytics tool designed to track user activities across 
          web3 and web2 applications seamlessly. Leveraging on-chain edge functions provided by <span className="font-bold text-gray-100">Fleek</span>, 
          this SDK offers reduced latency, minimized overhead, auto-scaling capabilities, cost-effective pricing, and self-sovereignty. Our goal 
          is to bridge the gap between web3 and web2 ecosystems, providing all applications with the robust benefits of web3 infrastructure.
        </p>
        <p className="mb-4 text-lg leading-relaxed">
          By providing a comprehensive, secure, and scalable solution, we empower developers and businesses to leverage the full potential of web3 
          infrastructure while gaining invaluable insights into their user base. Join us in bringing the future of analytics to the present, and 
          enjoy the myriad benefits that TrackU offers.
        </p>
        <p className="text-lg leading-relaxed">
          This SDK can be used to track user interactions, page views, custom events, errors, and performance metrics.
        </p>
      </div>

      <hr className="my-8 border-gray-700" />

      <h2 className="text-2xl mb-4 font-semibold">➤ Installation</h2>
      <pre className="bg-gray-800 p-4 rounded mb-8">
        <code className="text-gray-200">
          <SiNpm className="inline mr-2" /> npm install @mrkc2303/tracku-sdk
        </code>
      </pre>

      <hr className="my-8 border-gray-700" />

      <h2 className="text-2xl mb-4 font-semibold">➤ Initialization</h2>
      <pre className="bg-gray-800 p-4 rounded mb-8">
        <code className="text-gray-200">
{`import TrackU from '@mrkc2303/tracku-sdk';

const apiKey = 'YOUR_API_KEY';
const projectId = 'YOUR_PROJECT_ID';

const trackingSDK = new TrackU(apiKey, projectId);`}
        </code>
      </pre>

      <hr className="my-8 border-gray-700" />

      <h2 className="text-2xl mb-4 font-semibold">➤ Methods</h2>

      <h3 className="text-xl mb-2 flex items-center font-semibold"><FaUser className="mr-2" /> setUser(userId, userDetails)</h3>
      <p className="mb-4">Sets the user ID and user details for tracking purposes. This should be called when a user logs in or when you have user information to track.</p>
      <pre className="bg-gray-800 p-4 rounded mb-8">
        <code className="text-gray-200">
{`trackingSDK.setUser('USER_ID', {
  name: 'John Doe',
  email: 'john.doe@example.com'
});`}
        </code>
      </pre>

      <h3 className="text-xl mb-2 flex items-center font-semibold"><FaPlay className="mr-2" /> endSession()</h3>
      <p className="mb-4">Ends the current user session and tracks the session duration.</p>
      <pre className="bg-gray-800 p-4 rounded mb-8">
        <code className="text-gray-200">
{`trackingSDK.endSession();`}
        </code>
      </pre>

      <h3 className="text-xl mb-2 flex items-center font-semibold"><FaEye className="mr-2" /> setupPageViewTracking()</h3>
      <p className="mb-4">Tracks a page view, including the current URL and document title.</p>
      <pre className="bg-gray-800 p-4 rounded mb-8">
        <code className="text-gray-200">
{`trackingSDK.setupPageViewTracking();`}
        </code>
      </pre>

      <h3 className="text-xl mb-2 flex items-center font-semibold"><FaMousePointer className="mr-2" /> setupInteractionTracking()</h3>
      <p className="mb-4">Sets up tracking for user interactions such as clicks and scrolls. This method also sends heatmap data when the user unloads the page.</p>
      <pre className="bg-gray-800 p-4 rounded mb-8">
        <code className="text-gray-200">
{`trackingSDK.setupInteractionTracking();`}
        </code>
      </pre>

      <h3 className="text-xl mb-2 flex items-center font-semibold"><FaCode className="mr-2" /> setUpCustomEvent(eventName, properties)</h3>
      <p className="mb-4">Tracks a custom event with the specified name and properties.</p>
      <pre className="bg-gray-800 p-4 rounded mb-8">
        <code className="text-gray-200">
{`trackingSDK.setUpCustomEvent('custom_event', {
  property1: 'value1',
  property2: 'value2'
});`}
        </code>
      </pre>

      <h3 className="text-xl mb-2 flex items-center font-semibold"><FaBug className="mr-2" /> setUpErrorAndPerformanceEvent()</h3>
      <p className="mb-4">Sets up tracking for JavaScript errors and performance metrics.</p>
      <pre className="bg-gray-800 p-4 rounded mb-8">
        <code className="text-gray-200">
{`trackingSDK.setUpErrorAndPerformanceEvent();`}
        </code>
      </pre>

      <hr className="my-8 border-gray-700" />

      <h2 className="text-2xl mb-4 font-semibold">➤ Example</h2>
      <p className="mb-4">Here’s an example of how to use the TrackU SDK in a React application:</p>
      <pre className="bg-gray-800 p-4 rounded mb-8">
        <code className="text-gray-200">
{`import React, { useEffect } from 'react';
import TrackU from '@mrkc2303/tracku-sdk';

function App() {
  useEffect(() => {
    const apiKey = 'YOUR_API_KEY';
    const projectId = 'YOUR_PROJECT_ID';
    const trackingSDK = new TrackU(apiKey, projectId);

    trackingSDK.setUser('USER_ID', { name: 'John Doe' });
    trackingSDK.setupPageViewTracking();
    trackingSDK.setupInteractionTracking();
    trackingSDK.setUpErrorAndPerformanceEvent();

    return () => {
      trackingSDK.endSession();
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to TrackU</h1>
      </header>
    </div>
  );
}

export default App;`}
        </code>
      </pre>
    </div>
  );
};

export default SDKDocumentation;
