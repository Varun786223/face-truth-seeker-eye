
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Search, User, CheckCircle, XCircle, HelpCircle } from "lucide-react";
import { toast } from "sonner";
import blockchainService from "@/services/BlockchainService";

export function CreatorVerification() {
  const [walletAddress, setWalletAddress] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [creatorIdentity, setCreatorIdentity] = useState<any | null>(null);
  
  const handleSearch = async () => {
    if (!walletAddress) {
      toast.error("Please enter a wallet address");
      return;
    }
    
    setIsSearching(true);
    
    try {
      // Get creator identity
      const identity = await blockchainService.getCreatorIdentity(walletAddress);
      setCreatorIdentity(identity);
      
      if (!identity) {
        toast.info("Creator not found");
      }
    } catch (error) {
      console.error("Error getting creator identity:", error);
      toast.error("Error finding creator identity");
    } finally {
      setIsSearching(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Creator Identity Verification</h2>
        <p className="text-muted-foreground">
          Link media to verified creator wallets to combat impersonation and establish content authenticity.
          Organizations and creators can verify their identity on-chain to build trust with their audience.
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Lookup Creator Identity</CardTitle>
          <CardDescription>
            Verify if a wallet address belongs to a trusted creator or organization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="walletAddress">Wallet Address</Label>
              <div className="flex gap-2">
                <Input
                  id="walletAddress"
                  placeholder="Enter creator's wallet address (0x...)"
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  className="font-mono text-xs"
                />
                <Button 
                  onClick={handleSearch}
                  disabled={!walletAddress || isSearching}
                >
                  <Search className="h-4 w-4 mr-1" />
                  {isSearching ? "Searching..." : "Verify"}
                </Button>
              </div>
            </div>
            
            {creatorIdentity && (
              <div className="mt-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">
                        {creatorIdentity.organization || "Creator"}
                      </h3>
                      {creatorIdentity.verificationStatus === "verified" && (
                        <Badge className="bg-green-500">Verified</Badge>
                      )}
                      {creatorIdentity.verificationStatus === "pending" && (
                        <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50">Pending</Badge>
                      )}
                      {creatorIdentity.verificationStatus === "unverified" && (
                        <Badge variant="outline">Unverified</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {walletAddress.substring(0, 6)}...{walletAddress.substring(walletAddress.length - 4)}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4 mt-6">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Trust Score</span>
                      <span>{creatorIdentity.trustScore}%</span>
                    </div>
                    <Progress value={creatorIdentity.trustScore} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Verification Date</p>
                      <p className="font-medium">
                        {creatorIdentity.verificationDate ? new Date(creatorIdentity.verificationDate).toLocaleDateString() : "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Organization</p>
                      <p className="font-medium">
                        {creatorIdentity.organization || "Independent"}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-4 space-y-1">
                    {creatorIdentity.verificationStatus === "verified" ? (
                      <div className="flex gap-2 items-center text-green-600 text-sm">
                        <CheckCircle className="h-4 w-4" />
                        <span>This is a verified creator wallet</span>
                      </div>
                    ) : creatorIdentity.verificationStatus === "pending" ? (
                      <div className="flex gap-2 items-center text-amber-600 text-sm">
                        <HelpCircle className="h-4 w-4" />
                        <span>Verification is pending</span>
                      </div>
                    ) : (
                      <div className="flex gap-2 items-center text-destructive text-sm">
                        <XCircle className="h-4 w-4" />
                        <span>This wallet is not verified</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Get Verified</CardTitle>
          <CardDescription>
            Organizations and creators can apply for verification to establish their on-chain identity
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <p>
              Verification requirements:
            </p>
            
            <ul className="list-disc ml-6 space-y-1">
              <li>Must own the wallet address</li>
              <li>Provide official documentation of identity or organization status</li>
              <li>Public presence verification (social media, website, etc.)</li>
              <li>Complete KYC process with our verification partners</li>
            </ul>
            
            <Button 
              disabled={!blockchainService.isWalletConnected()}
              className="w-full sm:w-auto"
            >
              Apply for Verification
            </Button>
            
            {!blockchainService.isWalletConnected() && (
              <p className="text-sm text-muted-foreground">
                You must connect your wallet first to apply for verification
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
