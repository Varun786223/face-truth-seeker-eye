
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Search, Flag, Database, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import blockchainService from "@/services/BlockchainService";

export function DecentralizedBlacklist() {
  const [searchHash, setSearchHash] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [blacklistResult, setBlacklistResult] = useState<any | null>(null);
  const [reportHash, setReportHash] = useState("");
  const [reportReason, setReportReason] = useState("");
  const [isReporting, setIsReporting] = useState(false);
  
  const handleSearch = async () => {
    if (!searchHash) {
      toast.error("Please enter a media hash");
      return;
    }
    
    setIsSearching(true);
    
    try {
      // Check blacklist
      const result = await blockchainService.checkMediaBlacklist(searchHash);
      setBlacklistResult(result);
      
      if (!result) {
        toast.info("Media not found in registry");
      }
    } catch (error) {
      console.error("Error checking registry:", error);
      toast.error("Error checking registry");
    } finally {
      setIsSearching(false);
    }
  };
  
  const handleReport = async () => {
    if (!reportHash) {
      toast.error("Please enter a media hash");
      return;
    }
    
    if (!reportReason) {
      toast.error("Please enter a reason for reporting");
      return;
    }
    
    if (!blockchainService.isWalletConnected()) {
      toast.error("Please connect your wallet first");
      return;
    }
    
    setIsReporting(true);
    
    try {
      // Report to blacklist
      const success = await blockchainService.reportToBlacklist(reportHash, reportReason);
      
      if (success) {
        toast.success("Successfully reported to the registry");
        setReportHash("");
        setReportReason("");
      }
    } catch (error) {
      console.error("Error reporting to registry:", error);
      toast.error("Error reporting to registry");
    } finally {
      setIsReporting(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Decentralized Content Registry</h2>
        <p className="text-muted-foreground">
          Check and report hashes to a public ledger of analyzed content, stored on the blockchain.
          This helps platforms automatically flag manipulated or synthetic content.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 text-primary" />
              Check Registry
            </CardTitle>
            <CardDescription>
              Verify if a media hash has been reported as manipulated
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="searchHash">Media Hash</Label>
              <Input
                id="searchHash"
                placeholder="Enter SHA-256 media hash"
                value={searchHash}
                onChange={(e) => setSearchHash(e.target.value)}
                className="font-mono text-xs"
              />
            </div>
            
            <Button 
              onClick={handleSearch}
              disabled={!searchHash || isSearching}
              className="w-full gap-2"
            >
              <Database className="h-4 w-4" />
              {isSearching ? "Searching..." : "Check Registry"}
            </Button>
            
            {blacklistResult && (
              <div className="mt-4 p-4 border rounded-md bg-destructive/5">
                <div className="flex items-center justify-between">
                  <Badge variant="destructive">Registered</Badge>
                  <span className="text-sm text-muted-foreground">
                    {new Date(blacklistResult.dateAdded).toLocaleDateString()}
                  </span>
                </div>
                
                <div className="mt-3 space-y-2">
                  <p className="text-sm"><strong>Reason:</strong> {blacklistResult.reason}</p>
                  <p className="text-sm"><strong>Report Count:</strong> {blacklistResult.reportCount}</p>
                  <p className="text-sm"><strong>Blockchain:</strong> {blacklistResult.blockchain}</p>
                  <p className="text-xs text-muted-foreground break-all">
                    <strong>Transaction:</strong> {blacklistResult.transactionId}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Flag className="h-5 w-5 text-primary" />
              Report to Registry
            </CardTitle>
            <CardDescription>
              Report manipulated media to the decentralized registry
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reportHash">Media Hash</Label>
              <Input
                id="reportHash"
                placeholder="Enter SHA-256 media hash"
                value={reportHash}
                onChange={(e) => setReportHash(e.target.value)}
                className="font-mono text-xs"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="reportReason">Reason for Reporting</Label>
              <Textarea
                id="reportReason"
                placeholder="Explain why this content should be registered"
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
                className="resize-none"
                rows={4}
              />
            </div>
            
            <Button 
              onClick={handleReport}
              disabled={!reportHash || !reportReason || isReporting || !blockchainService.isWalletConnected()}
              className="w-full gap-2"
            >
              <ShieldCheck className="h-4 w-4" />
              {isReporting ? "Submitting..." : "Report to Registry"}
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          The decentralized registry is maintained by a network of validators and trusted organizations.
          Submitting a report requires a wallet connection and may earn you TRUST tokens if validated.
        </AlertDescription>
      </Alert>
    </div>
  );
}
