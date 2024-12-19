import Image from 'next/image'
import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi'
import { Avatar } from '@coinbase/onchainkit/identity';

export function Account() {
  const { address } = useAccount()
  const { disconnect } = useDisconnect()
  const { data: ensName } = useEnsName({ address })
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! })

  return (
    <div>
      {/* {ensAvatar && <Image alt="ENS Avatar" src={ensAvatar} height={10} width={10} />} */}
      {address && <Avatar address={address} />}
      {address && <div>{ensName ? `${ensName} (${address})` : address}</div>}
      <button onClick={() => disconnect()}>Disconnect</button>
    </div>
  )
}