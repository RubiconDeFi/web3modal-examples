import { useAccount, useDisconnect } from "wagmi";
import { useConnectModal } from "@rubicondefi/rainbowkit";

export default function () {
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { openConnectModal } = useConnectModal();
  const label = isConnected ? "Disconnect" : "Connect Custom";

  function onClick() {
    if (isConnected) {
      disconnect();
    } else {
      openConnectModal?.();
    }
  }

  return (
    <button onClick={onClick}>
      {label}
    </button>
  );
}
