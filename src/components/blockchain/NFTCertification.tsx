
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { FileUpload } from "@/components/ui/file-upload";
import { AlertCircle, ImageIcon, Copy } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import blockchainService from "@/services/BlockchainService";

export function NFTCertification() {
  const [file, setFile] = useState<File | null>(null);
  const [mediaHash, setMediaHash] = useState<string | null>(null);
  const [contentTitle, setContentTitle] = useState("");
  const [contentDescription, setContentDescription] = useState("");
  const [isGeneratingHash, setIsGeneratingHash] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const [tokenId, setTokenId] = useState<string | null>(null);
  
  const handleFileChange = (selectedFile: File | null) => {
    setFile(selectedFile);
    setMediaHash(null);
    setTokenId(null);
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
  
  const mintNFTCertification = async () => {
    if (!mediaHash) {
      toast.error("Please generate a hash first");
      return;
    }
    
    if (!contentTitle) {
      toast.error("Please enter a title for your content");
      return;
    }
    
    if (!blockchainService.isWalletConnected()) {
      toast.error("Please connect your wallet first");
      return;
    }
    
    setIsMinting(true);
    
    try {
      // Generate NFT certification
      const id = await blockchainService.generateNFTCertification(mediaHash, contentTitle);
      setTokenId(id);
    } catch (error) {
      console.error("Error minting NFT:", error);
      toast.error("Failed to mint NFT certification");
    } finally {
      setIsMinting(false);
    }
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">NFT Certification</h2>
        <p className="text-muted-foreground">
          Mint "Authentic Media" NFTs to certify and prove ownership of your original content.
          This creates a permanent, verifiable record of your media's authenticity on the blockchain.
        </p>
      </div>
      
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          NFT certification provides proof of authenticity, timestamps, and ownership for your content.
          Once minted, you can embed verification badges in your media or websites.
        </AlertDescription>
      </Alert>
      
      <Card>
        <CardHeader>
          <CardTitle>Create Authenticity NFT</CardTitle>
          <CardDescription>
            Certify your original content with a blockchain-backed NFT
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <FileUpload 
            onFileSelected={handleFileChange}
            acceptedFileTypes={"image/*,video/*"}
            maxSizeMB={50}
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
            <>
              <div className="space-y-2">
                <Label>Media Hash</Label>
                <Input 
                  readOnly 
                  value={mediaHash}
                  className="font-mono text-xs"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contentTitle">Content Title</Label>
                <Input
                  id="contentTitle"
                  placeholder="Enter a title for your content"
                  value={contentTitle}
                  onChange={(e) => setContentTitle(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contentDescription">Content Description (Optional)</Label>
                <Textarea
                  id="contentDescription"
                  placeholder="Describe your content (optional)"
                  value={contentDescription}
                  onChange={(e) => setContentDescription(e.target.value)}
                  className="resize-none"
                  rows={3}
                />
              </div>
            </>
          )}
          
          {tokenId && (
            <div className="bg-muted/50 p-4 rounded-md mt-6">
              <div className="flex items-center justify-between">
                <Badge className="bg-green-500">Certified</Badge>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8" 
                  onClick={() => copyToClipboard(tokenId)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="mt-4 space-y-2">
                <div>
                  <p className="text-sm text-muted-foreground">NFT Token ID</p>
                  <p className="font-medium">{tokenId}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Blockchain</p>
                  <p className="font-medium">{blockchainService.getNetwork()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Created By</p>
                  <p className="font-medium">
                    {blockchainService.getWalletAddress()?.substring(0, 6)}...
                    {blockchainService.getWalletAddress()?.substring(blockchainService.getWalletAddress()!.length - 4)}
                  </p>
                </div>
              </div>
              
              <div className="mt-4">
                <p className="text-sm font-medium">Embed Code</p>
                <div className="flex mt-1">
                  <Input 
                    readOnly 
                    value={`<iframe src="https://deepfake-detector.com/verify/${tokenId}" width="300" height="80" frameborder="0"></iframe>`}
                    className="font-mono text-xs"
                  />
                  <Button 
                    variant="outline" 
                    className="ml-2"
                    onClick={() => copyToClipboard(`<iframe src="https://deepfake-detector.com/verify/${tokenId}" width="300" height="80" frameborder="0"></iframe>`)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Use this code to embed a verification badge on your website
                </p>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter>
          {mediaHash && !tokenId && (
            <Button 
              onClick={mintNFTCertification}
              disabled={!mediaHash || !contentTitle || isMinting || !blockchainService.isWalletConnected()}
              className="w-full sm:w-auto"
            >
              {isMinting ? "Minting..." : "Mint NFT Certificate"}
            </Button>
          )}
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Verify NFT Certification</CardTitle>
          <CardDescription>
            Check the authenticity of a content by its NFT Certificate ID
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input placeholder="Enter NFT Token ID (e.g., NFT-ABC123XYZ)" />
            <Button variant="outline">Verify</Button>
          </div>
          
          <div className="text-center py-12 border border-dashed rounded-md">
            <ImageIcon className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
            <p className="text-muted-foreground">
              NFT certification details will appear here
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
