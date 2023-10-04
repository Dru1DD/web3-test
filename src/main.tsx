import { useWeb3Modal } from '@web3modal/wagmi/react'
import {useAccount, useContractWrite } from "wagmi";
import {contractABI} from "./contracts/test";

export const Main = () => {
    const { open } = useWeb3Modal()
    const { address } = useAccount();
    const { data, isLoading, isSuccess, write } = useContractWrite({
        address: '0xeCB504D39723b0be0e3a9Aa33D646642D1051EE1',
        abi: contractABI,
        functionName: 'feed'
    })

    console.log("Data", data);

    return (
            <div className="w-[100wh] h-[100vh] flex justify-center items-center flex-col bg-gray-700 border-2">
                <h1 className="font-bold text-white ">Web3Test</h1>
                {address && <h2 className={"text-white"}>{address}</h2>}
                <button className={"p-5 rounded-lg text-white bg-purple-800"} onClick={() => open()}>Connect</button>

                { address ? (
                    <div className={"mt-5"}>
                        <button className={"p-5 rounded-lg text-white bg-purple-800"} onClick={() => write({
                            value: BigInt(16),
                        })}>Feed</button>
                        {isLoading && <div className={"text-white"}>Check Wallet</div>}
                        {isSuccess && <div className={"text-white"}>Transaction: {JSON.stringify(data)}</div>}
                    </div>
                ) : <h1>Connect firstly wallet</h1>}
            </div>

    )
}