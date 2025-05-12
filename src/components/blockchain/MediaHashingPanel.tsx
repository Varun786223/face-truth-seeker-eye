import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileUpload } from "@/components/ui/file-upload";
import { Database, Copy, Check, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import blockchainService from "@/services/BlockchainService";

export function MediaHashingPanel() {
  const [file, setFile] = useState<File | null>(null);
  const [mediaHash, setMediaHash] = useState<string | null>(null);
  const [isGeneratingHash, setIsGeneratingHash] = useState(false);
  const [isStoringHash, setIsStoringHash] = useState(false);
  const [transactionId, setTransactionId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  
  const handleFileChange = (selectedFile: File | null) => {
    setFile(selectedFile);
    setMediaHash(null);
    setTransactionId(null);
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
  
  const storeOnBlockchain = async () => {
    if (!mediaHash) {
      toast.error("Please generate a hash first");
      return;
    }
    
    if (!blockchainService.isWalletConnected()) {
      toast.error("Please connect your wallet first");
      return;
    }
    
    setIsStoringHash(true);
    
    try {
      // Store hash on blockchain
      const result = await blockchainService.storeMediaHash(mediaHash);
      
      if (result.success && result.transactionId) {
        setTransactionId(result.transactionId);
      } else {
        toast.error("Failed to store hash on blockchain");
      }
    } catch (error) {
      console.error("Error storing hash:", error);
      toast.error("Failed to store hash on blockchain");
    } finally {
      setIsStoringHash(false);
    }
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Immutable Media Hashing</h2>
        <p className="text-muted-foreground">
          Generate a unique hash for your media and store it immutably on the blockchain.
          This helps prove your content hasn't been altered since upload.
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Media Hash Generator</CardTitle>
          <CardDescription>
            Upload a file to generate its unique SHA-256 hash
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
          
          {mediaHash && (
            <div className="space-y-2 mt-4">
              <Label>Media Hash (SHA-256)</Label>
              <div className="flex gap-2">
                <Input 
                  readOnly 
                  value={mediaHash}
                  className="font-mono text-xs"
                />
                <Button 
                  size="icon"
                  variant="outline"
                  onClick={() => copyToClipboard(mediaHash)}
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          )}
          
          {transactionId && (
            <div className="space-y-2 mt-4">
              <Label>Transaction ID</Label>
              <div className="flex gap-2">
                <Input 
                  readOnly 
                  value={transactionId}
                  className="font-mono text-xs"
                />
                <Button 
                  size="icon"
                  variant="outline"
                  onClick={() => copyToClipboard(transactionId)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                The hash has been permanently stored on the {blockchainService.getNetwork()} blockchain
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <Button
            onClick={generateHash}
            disabled={!file || isGeneratingHash}
            className="w-full sm:w-auto"
          >
            {isGeneratingHash ? "Generating..." : "Generate Hash"}
          </Button>
          
          {mediaHash && (
            <Button
              onClick={storeOnBlockchain}
              disabled={!mediaHash || isStoringHash || !blockchainService.isWalletConnected()}
              variant="outline"
              className="w-full sm:w-auto"
            >
              {isStoringHash ? "Storing..." : "Store on Blockchain"}
            </Button>
          )}
        </CardFooter>
      </Card>
      
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Once stored on the blockchain, this hash can be used as proof that the original media hasn't been tampered with.
          Anyone can verify this file's authenticity by comparing its hash against the one stored on-chain.
        </AlertDescription>
      </Alert>
    </div>
  );
}
