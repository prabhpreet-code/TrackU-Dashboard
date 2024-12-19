import * as React from 'react';
import { Connector, useConnect } from 'wagmi';
import metaMaskImg from "../../public/img/metamask.webp"

interface ConnectorDesign {
  name: string;
  logo: string;
  highlight: boolean;
}

const connectorDesigns: Record<string, ConnectorDesign> = {
  coinbaseWalletSDK: {
    name: 'Coinbase Wallet',
    logo: '/img/coinbase-wallet.png', // Replace with actual path
    highlight: true,
  },
  walletConnect: {
    name: 'WalletConnect',
    logo: '/img/walletConnect.png', // Replace with actual path
    highlight: false,
  },
  metaMaskSDK: {
    name: 'MetaMask',
    logo: '/img/metamask.webp', // Replace with actual path
    highlight: false,
  },
  safe: {
    name: 'Safe Wallet',
    logo: '/img/safeWallet.png', // Replace with actual path
    highlight: false,
  },
};

export function WalletOptions() {
  const { connectors, connect } = useConnect();

  return (
    <div className="wallet-options flex gap-5 flex-col">
      {connectors.map((connector) => (
        <WalletOption
          key={connector.uid}
          connector={connector}
          onClick={() => connect({ connector })}
        />
      ))}
    </div>
  );
}

interface WalletOptionProps {
  connector: Connector;
  onClick: () => void;
}

function WalletOption({ connector, onClick }: WalletOptionProps) {
  const [ready, setReady] = React.useState(false);
  const connectorDesign = connectorDesigns[connector.id];

  React.useEffect(() => {
    const fetchProvider = async () => {
      const provider = await connector.getProvider();
      setReady(!!provider);
    };

    fetchProvider();
  }, [connector]);

  return (
    <button
      disabled={!ready}
      onClick={onClick}
      className={`bg-blue-600 rounded-lg px-3 py-2 ${
        connectorDesign.highlight ? 'highlight-class' : ''
      }`}
      style={{
        backgroundColor: connectorDesign.highlight ? '#0052ff' : '',
      }}
    >
      <img
        src={connectorDesign.logo}
        alt={`${connectorDesign.name} logo`}
        className="inline-block w-6 h-6 mr-2"
      />
      {connectorDesign.name}
    </button>
  );
}
