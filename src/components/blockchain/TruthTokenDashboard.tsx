
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Shield, Award, Zap } from "lucide-react";
import { toast } from "sonner";
import blockchainService from "@/services/BlockchainService";

export function TruthTokenDashboard() {
  const [tokenInfo, setTokenInfo] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [stakeAmount, setStakeAmount] = useState(0);
  const [isStaking, setIsStaking] = useState(false);
  
  useEffect(() => {
    if (blockchainService.isWalletConnected()) {
      loadTokenInfo();
    }
  }, []);
  
  const loadTokenInfo = async () => {
    setIsLoading(true);
    
    try {
      const info = await blockchainService.getTruthTokens();
      setTokenInfo(info);
    } catch (error) {
      console.error("Error loading token info:", error);
      toast.error("Failed to load token information");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleStakeTokens = async () => {
    if (!stakeAmount || stakeAmount <= 0) {
      toast.error("Please enter a valid amount to stake");
      return;
    }
    
    if (tokenInfo && stakeAmount > tokenInfo.balance) {
      toast.error("You cannot stake more tokens than you own");
      return;
    }
    
    setIsStaking(true);
    
    try {
      const success = await blockchainService.stakeTokens(stakeAmount);
      
      if (success) {
        // Refresh token info
        loadTokenInfo();
        setStakeAmount(0);
      }
    } catch (error) {
      console.error("Error staking tokens:", error);
      toast.error("Failed to stake tokens");
    } finally {
      setIsStaking(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">TRUTH Token Economy</h2>
        <p className="text-muted-foreground">
          Earn and stake TRUTH tokens to participate in the ecosystem, receive rewards for accurate reports,
          and contribute to decentralized governance of the platform.
        </p>
      </div>
      
      {!blockchainService.isWalletConnected() ? (
        <Card>
          <CardContent className="pt-6 text-center">
            <Award className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <h3 className="text-lg font-medium mb-2">Connect Your Wallet</h3>
            <p className="text-muted-foreground mb-4">
              You need to connect your wallet to view your TRUTH token balance and participate in the token economy.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Your TRUTH Tokens</CardTitle>
              <CardDescription>
                View your token balance and activity
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {isLoading ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Loading token information...</p>
                </div>
              ) : tokenInfo ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Available Balance</p>
                      <p className="text-3xl font-bold">{tokenInfo.balance} TRUTH</p>
                    </div>
                    <Zap className="h-8 w-8 text-primary" />
                  </div>
                  
                  <Separator />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Earned</p>
                      <p className="text-xl font-medium">{tokenInfo.totalEarned} TRUTH</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Currently Staked</p>
                      <p className="text-xl font-medium">{tokenInfo.stakingAmount || 0} TRUTH</p>
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 p-3 rounded-md">
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-medium">Benefits</p>
                      {tokenInfo.stakingAmount ? (
                        <Badge className="bg-green-500">Active</Badge>
                      ) : (
                        <Badge variant="outline">None</Badge>
                      )}
                    </div>
                    
                    <ul className="mt-2 text-sm space-y-1">
                      {tokenInfo.stakingAmount ? (
                        <>
                          <li className="flex items-center gap-1">
                            <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                            <span>Ad-free experience</span>
                          </li>
                          {tokenInfo.stakingAmount >= 50 && (
                            <li className="flex items-center gap-1">
                              <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                              <span>DAO voting rights</span>
                            </li>
                          )}
                          {tokenInfo.stakingAmount >= 100 && (
                            <li className="flex items-center gap-1">
                              <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                              <span>API access</span>
                            </li>
                          )}
                        </>
                      ) : (
                        <li className="text-muted-foreground">Stake tokens to receive benefits</li>
                      )}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No token information available</p>
                  <Button onClick={loadTokenInfo} variant="outline" className="mt-2">
                    Refresh
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Stake Your Tokens</CardTitle>
              <CardDescription>
                Stake TRUTH tokens to unlock benefits and earn rewards
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="flex justify-between">
                  <span>Stake Amount</span>
                  {tokenInfo && <span className="text-muted-foreground">Max: {tokenInfo.balance} TRUTH</span>}
                </Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    type="number"
                    min="0"
                    max={tokenInfo?.balance || 0}
                    step="1"
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(Number(e.target.value))}
                    disabled={!tokenInfo}
                  />
                </div>
              </div>
              
              {tokenInfo && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Amount</span>
                    <span>{stakeAmount} TRUTH</span>
                  </div>
                  <Slider
                    defaultValue={[0]}
                    max={tokenInfo.balance}
                    step={1}
                    onValueChange={(value) => setStakeAmount(value[0])}
                  />
                  <div className="grid grid-cols-3 text-xs text-muted-foreground mt-1">
                    <div>No Benefits</div>
                    <div className="text-center">Voting Rights</div>
                    <div className="text-right">API Access</div>
                  </div>
                </div>
              )}
              
              <div className="bg-muted/50 p-3 rounded-md mt-4">
                <p className="font-medium text-sm">Benefits at {stakeAmount} TRUTH</p>
                <ul className="mt-2 text-sm space-y-1">
                  {stakeAmount > 0 ? (
                    <>
                      <li className="flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                        <span>Ad-free experience</span>
                      </li>
                      {stakeAmount >= 50 && (
                        <li className="flex items-center gap-1">
                          <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                          <span>DAO voting rights</span>
                        </li>
                      )}
                      {stakeAmount >= 100 && (
                        <li className="flex items-center gap-1">
                          <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                          <span>API access</span>
                        </li>
                      )}
                    </>
                  ) : (
                    <li className="text-muted-foreground">No benefits at current stake level</li>
                  )}
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleStakeTokens}
                disabled={!tokenInfo || stakeAmount <= 0 || stakeAmount > tokenInfo?.balance || isStaking}
                className="w-full"
              >
                {isStaking ? "Staking..." : "Stake Tokens"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
      
      <Card>
        <CardHeader>
          <CardTitle>How to Earn TRUTH Tokens</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                <Shield className="h-3.5 w-3.5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Report Deepfakes</p>
                <p className="text-sm text-muted-foreground">Earn tokens for accurate reports that get verified</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                <Shield className="h-3.5 w-3.5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Participate in DAO Voting</p>
                <p className="text-sm text-muted-foreground">Get rewarded for consistent participation in governance</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                <Shield className="h-3.5 w-3.5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Stake Your Tokens</p>
                <p className="text-sm text-muted-foreground">Earn passive rewards for staking in the ecosystem</p>
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
