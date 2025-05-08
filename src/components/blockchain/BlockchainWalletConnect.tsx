
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Database, Polygon, Shield } from "lucide-react";
import blockchainService from "@/services/BlockchainService";

interface BlockchainWalletConnectProps {
  className?: string;
}

export function BlockchainWalletConnect({ className = "" }: BlockchainWalletConnectProps) {
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [network, setNetwork] = useState<string>("polygon");
  
  useEffect(() => {
    // Check if wallet is already connected
    const isConnected = blockchainService.isWalletConnected();
    if (isConnected) {
      setWalletConnected(true);
      setWalletAddress(blockchainService.getWalletAddress());
      setNetwork(blockchainService.getNetwork());
    }
  }, []);
  
  const handleConnectWallet = async () => {
    try {
      const address = await blockchainService.connectWallet();
      if (address) {
        setWalletConnected(true);
        setWalletAddress(address);
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };
  
  const handleDisconnectWallet = () => {
    blockchainService.disconnectWallet();
    setWalletConnected(false);
    setWalletAddress(null);
  };
  
  const handleNetworkChange = async (value: string) => {
    const networkType = value as "ethereum" | "polygon" | "arbitrum";
    await blockchainService.switchNetwork(networkType);
    setNetwork(value);
  };
  
  return (
    <Card className={`p-4 ${className}`}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center">
          <Shield className="h-6 w-6 mr-2 text-primary" />
          <div>
            <h3 className="font-medium">Blockchain Connection</h3>
            {walletConnected ? (
              <p className="text-sm text-muted-foreground">
                Connected: {walletAddress?.substring(0, 6)}...{walletAddress?.substring(walletAddress.length - 4)}
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">Connect your wallet to use blockchain features</p>
            )}
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          {walletConnected && (
            <Select value={network} onValueChange={handleNetworkChange}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Select network" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="ethereum">
                    <div className="flex items-center">
                      <Database className="h-4 w-4 mr-2" />
                      Ethereum
                    </div>
                  </SelectItem>
                  <SelectItem value="polygon">
                    <div className="flex items-center">
                      <Polygon className="h-4 w-4 mr-2" />
                      Polygon
                    </div>
                  </SelectItem>
                  <SelectItem value="arbitrum">
                    <div className="flex items-center">
                      <Database className="h-4 w-4 mr-2" />
                      Arbitrum
                    </div>
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
          
          <Button 
            onClick={walletConnected ? handleDisconnectWallet : handleConnectWallet}
            variant={walletConnected ? "outline" : "default"}
            className="w-full sm:w-auto"
          >
            {walletConnected ? "Disconnect Wallet" : "Connect Wallet"}
          </Button>
        </div>
      </div>
      
      {walletConnected && (
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge variant="outline" className="bg-primary/5">
            Network: {network.charAt(0).toUpperCase() + network.slice(1)}
          </Badge>
          {network === "polygon" && (
            <Badge variant="outline" className="bg-primary/5">
              Low Gas Fees
            </Badge>
          )}
          {network === "arbitrum" && (
            <Badge variant="outline" className="bg-primary/5">
              Layer 2 Scaling
            </Badge>
          )}
        </div>
      )}
    </Card>
  );
}
