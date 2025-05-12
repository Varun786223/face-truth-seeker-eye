import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileUpload } from "@/components/ui/file-upload";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Database } from "lucide-react";
import { toast } from "sonner";
import blockchainService from "@/services/BlockchainService";

export function DAOPanel() {
  const [file, setFile] = useState<File | null>(null);
  const [proposalTitle, setProposalTitle] = useState("");
  const [proposalDescription, setProposalDescription] = useState("");
  const [mediaHash, setMediaHash] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [proposalId, setProposalId] = useState<string | null>(null);
  
  const handleFileChange = (files: File[]) => {
    // Use the first file if available
    const selectedFile = files.length > 0 ? files[0] : null;
    setFile(selectedFile);
    setMediaHash(null);
  };
  
  const generateHash = async () => {
    if (!file) {
      toast.error("Please upload a file first");
      return;
    }
    
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
    }
  };
  
  const submitProposal = async () => {
    if (!proposalTitle || !proposalDescription) {
      toast.error("Please enter a title and description");
      return;
    }
    
    if (!mediaHash) {
      toast.error("Please generate a hash first");
      return;
    }
    
    if (!blockchainService.isWalletConnected()) {
      toast.error("Please connect your wallet first");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Store hash on blockchain
      const result = await blockchainService.createDAOProposal(proposalTitle, proposalDescription, mediaHash);
      
      if (result.success && result.proposalId) {
        setProposalId(result.proposalId);
        toast.success("Proposal submitted successfully");
      } else {
        toast.error("Failed to submit proposal");
      }
    } catch (error) {
      console.error("Error submitting proposal:", error);
      toast.error("Failed to submit proposal");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Decentralized Autonomous Organization (DAO)</h2>
        <p className="text-muted-foreground">
          Create proposals and vote on key decisions to collectively govern the future of the platform.
          All proposals are immutably recorded on the blockchain for transparency.
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Submit New Proposal</CardTitle>
          <CardDescription>
            Create a new proposal for community voting
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <FileUpload 
            onChange={handleFileChange}
            accept="image/*,video/*,application/pdf"
          />
          
          {file && (
            <div className="text-sm">
              <p className="font-medium">Selected file:</p>
              <p className="text-muted-foreground">{file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)</p>
            </div>
          )}
          
          {mediaHash && (
            <div className="space-y-2 mt-4">
              <Label>Media Hash (SHA-256)</Label>
              <Input 
                readOnly 
                value={mediaHash}
                className="font-mono text-xs"
              />
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="title">Proposal Title</Label>
            <Input 
              id="title"
              placeholder="Enter proposal title"
              value={proposalTitle}
              onChange={(e) => setProposalTitle(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Proposal Description</Label>
            <Textarea 
              id="description"
              placeholder="Enter proposal description"
              value={proposalDescription}
              onChange={(e) => setProposalDescription(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <Button
            onClick={generateHash}
            disabled={!file}
            className="w-full sm:w-auto"
          >
            Generate Media Hash
          </Button>
          
          <Button
            onClick={submitProposal}
            disabled={isSubmitting || !mediaHash || !blockchainService.isWalletConnected()}
            variant="outline"
            className="w-full sm:w-auto"
          >
            {isSubmitting ? "Submitting..." : "Submit Proposal"}
          </Button>
        </CardFooter>
      </Card>
      
      {proposalId && (
        <Alert>
          <Database className="h-4 w-4" />
          <AlertDescription>
            Proposal submitted with ID: {proposalId}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
