import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { FileUpload } from "@/components/ui/file-upload";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import blockchainService from "@/services/BlockchainService";

export function DAOPanel() {
  const [file, setFile] = useState<File | null>(null);
  const [mediaHash, setMediaHash] = useState<string | null>(null);
  const [votingQuestion, setVotingQuestion] = useState("");
  const [isGeneratingHash, setIsGeneratingHash] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [proposalId, setProposalId] = useState<string | null>(null);
  
  const handleFileChange = (selectedFile: File | null) => {
    setFile(selectedFile);
    setMediaHash(null);
  };
  
  const generateHash = async () => {
    if (!file) {
      toast.error("Please upload a file first");
      return;
    }
    
    setIsGeneratingHash(true);
    
    try {
      // Convert file to base64 for hashing
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64Data = reader.result as string;
        
        // Generate hash using blockchain service
        const hash = await blockchainService.generateMediaHash(base64Data);
        setMediaHash(hash);
        toast.success("Media hash generated successfully");
      };
    } catch (error) {
      console.error("Error generating hash:", error);
      toast.error("Failed to generate media hash");
    } finally {
      setIsGeneratingHash(false);
    }
  };
  
  const submitToVoting = async () => {
    if (!mediaHash) {
      toast.error("Please generate a hash first");
      return;
    }
    
    if (!votingQuestion) {
      toast.error("Please enter a voting question");
      return;
    }
    
    if (!blockchainService.isWalletConnected()) {
      toast.error("Please connect your wallet first");
      return;
    }
    
    const minTokensRequired = 50;
    const tokenInfo = await blockchainService.getTruthTokens();
    
    if (!tokenInfo || !tokenInfo.stakingAmount || tokenInfo.stakingAmount < minTokensRequired) {
      toast.error(`You need at least ${minTokensRequired} staked TRUTH tokens to submit a proposal`);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Submit to DAO voting
      const pid = await blockchainService.submitToDAOVoting(mediaHash, votingQuestion);
      setProposalId(pid);
      setVotingQuestion("");
    } catch (error) {
      console.error("Error submitting to DAO:", error);
      toast.error("Failed to submit to DAO voting");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">DAO Voting System</h2>
        <p className="text-muted-foreground">
          Submit controversial content for community voting. TRUTH token holders can vote on edge cases
          and help determine classifications for content that requires human judgment.
        </p>
      </div>
      
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          You need at least 50 staked TRUTH tokens to submit a proposal to the DAO.
          Voting rights are proportional to staked tokens.
        </AlertDescription>
      </Alert>
      
      <Card>
        <CardHeader>
          <CardTitle>Submit Content for DAO Vote</CardTitle>
          <CardDescription>
            Let the community decide on controversial content or edge cases
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <FileUpload 
            onChange={handleFileChange}
            accept="image/*,video/*"
            maxSize={50 * 1024 * 1024}
          />
          
          {file && (
            <div className="text-sm">
              <p className="font-medium">Selected file:</p>
              <p className="text-muted-foreground">{file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)</p>
            </div>
          )}
          
          {!mediaHash && file && (
            <Button
              onClick={generateHash}
              disabled={!file || isGeneratingHash}
            >
              {isGeneratingHash ? "Generating..." : "Generate Hash"}
            </Button>
          )}
          
          {mediaHash && (
            <div className="space-y-2">
              <Label>Media Hash</Label>
              <Input 
                readOnly 
                value={mediaHash}
                className="font-mono text-xs"
              />
              
              <div className="pt-4">
                <Label htmlFor="votingQuestion" className="mb-1 block">Voting Question</Label>
                <Textarea
                  id="votingQuestion"
                  placeholder="e.g., Is this content a malicious deepfake or legitimate satire?"
                  value={votingQuestion}
                  onChange={(e) => setVotingQuestion(e.target.value)}
                  className="resize-none"
                  rows={3}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  The question should be clear and impartial to get the most accurate community judgment.
                </p>
              </div>
            </div>
          )}
          
          {proposalId && (
            <div className="bg-muted/50 p-4 rounded-md mt-4">
              <div className="flex justify-between items-center">
                <Badge className="bg-green-500">Submitted</Badge>
                <span className="text-sm">{proposalId}</span>
              </div>
              <p className="text-sm mt-2">
                Your proposal has been submitted to the DAO. Voting will remain open for 72 hours.
                You can check the status in the "Active Votes" section.
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter>
          {mediaHash && !proposalId && (
            <Button 
              onClick={submitToVoting}
              disabled={!mediaHash || !votingQuestion || isSubmitting || !blockchainService.isWalletConnected()}
              className="w-full sm:w-auto"
            >
              {isSubmitting ? "Submitting..." : "Submit to DAO Vote"}
            </Button>
          )}
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Active DAO Votes</CardTitle>
          <CardDescription>
            Current proposals that need your vote
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Mock active votes */}
            <div className="border rounded-md p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">Is this political video satire or misleading deepfake?</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Proposal ID: PROP-7A3B9C2D
                  </p>
                </div>
                <Badge>42 hours left</Badge>
              </div>
              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm" className="w-full" disabled={!blockchainService.isWalletConnected()}>
                  Satire
                </Button>
                <Button variant="outline" size="sm" className="w-full" disabled={!blockchainService.isWalletConnected()}>
                  Deepfake
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-3">
                <div>
                  <p className="text-xs text-muted-foreground">Current Votes</p>
                  <p className="text-sm">Satire: 64% | Deepfake: 36%</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Total Voting Power</p>
                  <p className="text-sm">12,458 TRUTH tokens</p>
                </div>
              </div>
            </div>
            
            <div className="border rounded-md p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">Should this AI-generated artwork be labeled as synthetic media?</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Proposal ID: PROP-F1E2D3C4
                  </p>
                </div>
                <Badge>16 hours left</Badge>
              </div>
              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm" className="w-full" disabled={!blockchainService.isWalletConnected()}>
                  Yes, Label
                </Button>
                <Button variant="outline" size="sm" className="w-full" disabled={!blockchainService.isWalletConnected()}>
                  No, Don't Label
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-3">
                <div>
                  <p className="text-xs text-muted-foreground">Current Votes</p>
                  <p className="text-sm">Label: 82% | Don't Label: 18%</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Total Voting Power</p>
                  <p className="text-sm">8,729 TRUTH tokens</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            {!blockchainService.isWalletConnected() 
              ? "Connect your wallet to participate in voting" 
              : "Your voting power is based on your staked TRUTH tokens"}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
