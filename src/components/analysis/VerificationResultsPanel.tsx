
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { search, link, flag, network } from "lucide-react";

interface VerificationResult {
  reverseSearchMatches?: Array<{
    url: string;
    confidence: number;
    source: string;
    matchDate?: string;
  }>;
  blockchainVerification?: {
    verified: boolean;
    hashMatch?: boolean;
    timestamp?: string;
    blockchain?: string;
    transactionId?: string;
  };
  userReportStats?: {
    totalReports: number;
    flaggedAsDeepfake: number;
    flaggedAsReal: number;
    confidence: number;
  };
  networkPropagation?: {
    firstAppearance?: string;
    spreadVelocity?: "slow" | "medium" | "fast" | "viral";
    majorDistributors?: string[];
    suspiciousPattern: boolean;
  };
}

interface VerificationResultsPanelProps {
  verificationData?: VerificationResult;
}

export function VerificationResultsPanel({ verificationData }: VerificationResultsPanelProps) {
  if (!verificationData) return null;
  
  const hasReverseSearch = verificationData.reverseSearchMatches?.length ?? 0 > 0;
  const hasBlockchainData = !!verificationData.blockchainVerification;
  const hasUserReports = !!verificationData.userReportStats;
  const hasNetworkAnalysis = !!verificationData.networkPropagation;
  
  // If no verification data is available, don't render the component
  if (!hasReverseSearch && !hasBlockchainData && !hasUserReports && !hasNetworkAnalysis) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Content Verification</h2>
      
      <Tabs defaultValue={hasReverseSearch ? "reverse-search" : hasBlockchainData ? "blockchain" : hasUserReports ? "user-reports" : "network"}>
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger 
            value="reverse-search" 
            disabled={!hasReverseSearch}
            className="flex items-center gap-2"
          >
            <search className="h-4 w-4" />
            <span className="hidden sm:inline">Search</span>
          </TabsTrigger>
          <TabsTrigger 
            value="blockchain" 
            disabled={!hasBlockchainData}
            className="flex items-center gap-2"
          >
            <link className="h-4 w-4" />
            <span className="hidden sm:inline">Blockchain</span>
          </TabsTrigger>
          <TabsTrigger 
            value="user-reports" 
            disabled={!hasUserReports}
            className="flex items-center gap-2"
          >
            <flag className="h-4 w-4" />
            <span className="hidden sm:inline">Reports</span>
          </TabsTrigger>
          <TabsTrigger 
            value="network" 
            disabled={!hasNetworkAnalysis}
            className="flex items-center gap-2"
          >
            <network className="h-4 w-4" />
            <span className="hidden sm:inline">Network</span>
          </TabsTrigger>
        </TabsList>
        
        {hasReverseSearch && (
          <TabsContent value="reverse-search">
            <Card className="p-4">
              <h3 className="font-medium mb-3">Reverse Image Search</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Found {verificationData.reverseSearchMatches?.length} potential matches online.
              </p>
              
              <div className="space-y-3">
                {verificationData.reverseSearchMatches?.map((match, i) => (
                  <div key={i} className="bg-muted/50 p-3 rounded-lg">
                    <div className="flex justify-between">
                      <Badge variant="outline">{match.source}</Badge>
                      <span className="text-sm font-medium">{match.confidence}% match</span>
                    </div>
                    <a 
                      href={match.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-sm mt-1 text-primary hover:underline break-all"
                    >
                      {match.url}
                    </a>
                    {match.matchDate && (
                      <p className="text-xs text-muted-foreground mt-1">
                        First indexed: {match.matchDate}
                      </p>
                    )}
                  </div>
                ))}
              </div>
              
              <p className="text-xs text-muted-foreground mt-4">
                Reverse image search helps identify if this content appears elsewhere online, potentially revealing the original source.
              </p>
            </Card>
          </TabsContent>
        )}
        
        {hasBlockchainData && (
          <TabsContent value="blockchain">
            <Card className="p-4">
              <h3 className="font-medium mb-3">Blockchain Verification</h3>
              
              <div className="grid gap-3 md:grid-cols-2">
                <div className="bg-muted/50 p-3 rounded-lg space-y-1">
                  <p className="text-sm text-muted-foreground">Verification Status</p>
                  {verificationData.blockchainVerification?.verified ? (
                    <p className="text-green-500 font-medium">Verified ✓</p>
                  ) : (
                    <p className="text-amber-500 font-medium">Not Verified</p>
                  )}
                </div>
                
                <div className="bg-muted/50 p-3 rounded-lg space-y-1">
                  <p className="text-sm text-muted-foreground">Hash Match</p>
                  {verificationData.blockchainVerification?.hashMatch ? (
                    <p className="text-green-500 font-medium">Matched ✓</p>
                  ) : (
                    <p className="text-destructive font-medium">No Match</p>
                  )}
                </div>
              </div>
              
              {verificationData.blockchainVerification?.timestamp && (
                <div className="bg-muted/50 p-3 rounded-lg mt-3">
                  <p className="text-sm text-muted-foreground">Blockchain Record</p>
                  <div className="mt-1 space-y-1">
                    <p className="text-sm">
                      <span className="font-medium">Timestamp:</span> {new Date(verificationData.blockchainVerification?.timestamp).toLocaleString()}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Chain:</span> {verificationData.blockchainVerification?.blockchain}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Transaction:</span> 
                      <span className="text-xs font-mono bg-muted p-1 rounded ml-1">
                        {verificationData.blockchainVerification?.transactionId?.substring(0, 16)}...
                      </span>
                    </p>
                  </div>
                </div>
              )}
              
              <p className="text-xs text-muted-foreground mt-4">
                Blockchain verification checks if this content has been registered on a distributed ledger, 
                which can help establish its provenance and authenticity.
              </p>
            </Card>
          </TabsContent>
        )}
        
        {hasUserReports && (
          <TabsContent value="user-reports">
            <Card className="p-4">
              <h3 className="font-medium mb-3">User Report Aggregation</h3>
              
              <div className="bg-muted/50 p-3 rounded-lg mb-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">Total Reports</span>
                  <span className="font-medium">{verificationData.userReportStats?.totalReports}</span>
                </div>
                
                <div className="h-4 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-destructive"
                    style={{ 
                      width: `${verificationData.userReportStats ? 
                        (verificationData.userReportStats.flaggedAsDeepfake / verificationData.userReportStats.totalReports) * 100 : 0}%` 
                    }}
                  ></div>
                </div>
                
                <div className="flex justify-between text-xs mt-1">
                  <span>Flagged as deepfake: {verificationData.userReportStats?.flaggedAsDeepfake}</span>
                  <span>Flagged as real: {verificationData.userReportStats?.flaggedAsReal}</span>
                </div>
              </div>
              
              <div className="bg-muted/50 p-3 rounded-lg">
                <p className="text-sm text-muted-foreground">Community Confidence</p>
                <p className="text-lg font-bold">
                  {verificationData.userReportStats?.confidence.toFixed(1)}%
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Confidence that this content is manipulated, based on user reports.
                </p>
              </div>
              
              <p className="text-xs text-muted-foreground mt-4">
                User report aggregation collects and analyzes flags from users across platforms to identify 
                potentially manipulated content through crowdsourcing.
              </p>
            </Card>
          </TabsContent>
        )}
        
        {hasNetworkAnalysis && (
          <TabsContent value="network">
            <Card className="p-4">
              <h3 className="font-medium mb-3">Network Propagation Analysis</h3>
              
              <div className="grid gap-3 md:grid-cols-2">
                <div className="bg-muted/50 p-3 rounded-lg space-y-1">
                  <p className="text-sm text-muted-foreground">First Appearance</p>
                  {verificationData.networkPropagation?.firstAppearance ? (
                    <p className="font-medium">
                      {new Date(verificationData.networkPropagation.firstAppearance).toLocaleString()}
                    </p>
                  ) : (
                    <p className="text-muted-foreground">Unknown</p>
                  )}
                </div>
                
                <div className="bg-muted/50 p-3 rounded-lg space-y-1">
                  <p className="text-sm text-muted-foreground">Spread Velocity</p>
                  <p className="font-medium capitalize">
                    {verificationData.networkPropagation?.spreadVelocity || "Unknown"}
                  </p>
                </div>
                
                <div className="bg-muted/50 p-3 rounded-lg space-y-1 md:col-span-2">
                  <p className="text-sm text-muted-foreground">Suspicious Pattern</p>
                  <p className={verificationData.networkPropagation?.suspiciousPattern ? 
                    "text-amber-500 font-medium" : "text-green-500 font-medium"}>
                    {verificationData.networkPropagation?.suspiciousPattern ? 
                      "Yes - Unusual propagation detected" : "No - Normal sharing pattern"}
                  </p>
                </div>
              </div>
              
              {verificationData.networkPropagation?.majorDistributors && 
               verificationData.networkPropagation.majorDistributors.length > 0 && (
                <div className="mt-3">
                  <p className="text-sm font-medium mb-2">Major Distribution Sources</p>
                  <div className="flex flex-wrap gap-2">
                    {verificationData.networkPropagation.majorDistributors.map((source, i) => (
                      <Badge key={i} variant="outline">
                        {source}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              <p className="text-xs text-muted-foreground mt-4">
                Network propagation analysis examines how content spreads across platforms, helping 
                identify suspicious distribution patterns that may indicate coordinated misinformation.
              </p>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
