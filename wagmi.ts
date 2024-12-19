import { http, createConfig } from 'wagmi';
import { base } from 'wagmi/chains';
import { coinbaseWallet, metaMask, walletConnect, safe, injected } from 'wagmi/connectors';
 
const projectId = '25a0b7252734f35314bdfed07bb2ed4c'

export const wagmiConfig = createConfig({
  chains: [base],
  multiInjectedProviderDiscovery: false,
  connectors: [
    // injected(),
    coinbaseWallet({
      appName: 'yourAppName',
      preference: 'all',
      version: '4',
    }),
    walletConnect({ projectId }),
    metaMask(),
    safe(),
  ],
  ssr: true,
  transports: {
    [base.id]: http(),
  },
});
