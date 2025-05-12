
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileUpload } from "@/components/ui/file-upload";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Database, Check, Dna, Shield, Brain, Flask, CloudLightning, Microscope, FileCode, FileSearch, AlertTriangle, Video, FileCheck, Rocket, Headphones, User, Code, Network, Eye } from "lucide-react";
import { toast } from "sonner";
import blockchainService from "@/services/BlockchainService";

// Define feature proposal types
interface FeatureProposal {
  id: number;
  title: string;
  description: string;
  problem: string;
  revenue: string;
  category: string;
  icon: JSX.Element;
  votes: number;
}

export function DAOPanel() {
  const [file, setFile] = useState<File | null>(null);
  const [proposalTitle, setProposalTitle] = useState("");
  const [proposalDescription, setProposalDescription] = useState("");
  const [mediaHash, setMediaHash] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [proposalId, setProposalId] = useState<string | null>(null);
  const [currentTab, setCurrentTab] = useState("submit");
  const [selectedProposal, setSelectedProposal] = useState<FeatureProposal | null>(null);
  
  // Features database
  const featureProposals: FeatureProposal[] = [
    {
      id: 1,
      title: "DNA Sequence Validation",
      description: "Advanced neural network to detect AI-generated synthetic DNA sequences in biotech research",
      problem: "Detect AI-generated synthetic DNA in biotech research",
      revenue: "Charge biolabs per analysis",
      category: "Biotech",
      icon: <Dna className="h-4 w-4" />,
      votes: 24
    },
    {
      id: 2,
      title: "Quantum Hash Timestamping",
      description: "Future-proof hashing algorithms resistant to quantum computing attacks",
      problem: "Future-proof media against quantum-computed forgeries",
      revenue: "Government/defense contracts",
      category: "Security",
      icon: <Shield className="h-4 w-4" />,
      votes: 19
    },
    {
      id: 3,
      title: "Neural Implant Authentication",
      description: "Verification system for brain-computer interface data legitimacy",
      problem: "Verify brain-computer interface data legitimacy",
      revenue: "Neurotech licensing fees",
      category: "Healthcare",
      icon: <Brain className="h-4 w-4" />,
      votes: 12
    },
    {
      id: 4,
      title: "Synthetic Olfactory Detection",
      description: "AI system to identify artificially generated scent formulas",
      problem: "Identify AI-generated scent formulas",
      revenue: "Per-test pricing for perfume/food industries",
      category: "Consumer",
      icon: <Flask className="h-4 w-4" />,
      votes: 8
    },
    {
      id: 5,
      title: "Climate Data Forgery Audit",
      description: "System to detect manipulated weather models and climate data",
      problem: "Spot manipulated weather models",
      revenue: "Insurance industry subscriptions",
      category: "Environment",
      icon: <CloudLightning className="h-4 w-4" />,
      votes: 32
    },
    {
      id: 6,
      title: "Robotic Motion Analysis",
      description: "Algorithm to detect AI-generated robotic movement patterns",
      problem: "Detect AI-generated robotic movement patterns",
      revenue: "Factory safety certifications",
      category: "Industrial",
      icon: <Microscope className="h-4 w-4" />,
      votes: 15
    },
    {
      id: 7,
      title: "Nanomaterial Blueprint Check",
      description: "Verification system for nanomaterial designs to identify hazardous AI creations",
      problem: "Flag AI-designed hazardous materials",
      revenue: "Research lab subscriptions",
      category: "Research",
      icon: <FileSearch className="h-4 w-4" />,
      votes: 9
    },
    {
      id: 8,
      title: "AI-Generated Legal Doc Scanner",
      description: "Tool to detect synthetic contracts and legal agreements",
      problem: "Find synthetic contracts/agreements",
      revenue: "Law firm enterprise plans",
      category: "Legal",
      icon: <FileCode className="h-4 w-4" />,
      votes: 21
    },
    {
      id: 9,
      title: "Political Speech Live Analyzer",
      description: "Real-time detection of AI-generated campaign promises and political speech",
      problem: "Flag AI-generated campaign promises",
      revenue: "NGO partnerships",
      category: "Politics",
      icon: <AlertTriangle className="h-4 w-4" />,
      votes: 27
    },
    {
      id: 10,
      title: "Medication Ad Validator",
      description: "System to detect fake drug endorsement videos and medical misinformation",
      problem: "Detect fake drug endorsement videos",
      revenue: "Pharma compliance contracts",
      category: "Healthcare",
      icon: <Video className="h-4 w-4" />,
      votes: 18
    },
    {
      id: 11,
      title: "Food Origin Blockchain",
      description: "Blockchain system to track and verify food supply chain authenticity",
      problem: "Track AI-generated fake organic certifications",
      revenue: "Farm/food API licensing",
      category: "Agriculture",
      icon: <Database className="h-4 w-4" />,
      votes: 24
    },
    {
      id: 12,
      title: "Crisis Deepfake Alert",
      description: "Emergency system to detect and flag fake emergency broadcasts",
      problem: "Detect fake emergency broadcasts",
      revenue: "Municipal emergency system contracts",
      category: "Public Safety",
      icon: <AlertTriangle className="h-4 w-4" />,
      votes: 31
    },
    {
      id: 13,
      title: "AI-Generated Patent Check",
      description: "System to identify synthetic inventions in patent filings",
      problem: "Stop synthetic inventions in patent filings",
      revenue: "Patent office integration fees",
      category: "Legal",
      icon: <FileCheck className="h-4 w-4" />,
      votes: 16
    },
    {
      id: 14,
      title: "Space Data Authentication",
      description: "Verification system for satellite and rover media authenticity",
      problem: "Verify satellite/rover media authenticity",
      revenue: "Space agency partnerships",
      category: "Aerospace",
      icon: <Rocket className="h-4 w-4" />,
      votes: 22
    },
    {
      id: 15,
      title: "Cultural Heritage Shield",
      description: "System to preserve and verify authenticity of historical media",
      problem: "Preserve authentic historical media",
      revenue: "UNESCO/archival grants",
      category: "Cultural",
      icon: <Headphones className="h-4 w-4" />,
      votes: 19
    },
    {
      id: 16,
      title: "Dark Web Synthetic Monitor",
      description: "System to track illegal deepfake distribution on the dark web",
      problem: "Track illegal deepfake distribution",
      revenue: "Cybersecurity firm partnerships",
      category: "Security",
      icon: <User className="h-4 w-4" />,
      votes: 26
    },
    {
      id: 17,
      title: "AI-Generated Code Detector",
      description: "Tool to identify malicious synthetic code in software",
      problem: "Find malicious synthetic code",
      revenue: "DevTools API integration",
      category: "Software",
      icon: <Code className="h-4 w-4" />,
      votes: 29
    },
    {
      id: 18,
      title: "Synthetic Ecosystem Monitor",
      description: "System to detect fake environmental data in ecological reports",
      problem: "Detect fake environmental data",
      revenue: "Carbon credit validation fees",
      category: "Environment",
      icon: <CloudLightning className="h-4 w-4" />,
      votes: 20
    },
    {
      id: 19,
      title: "Virtual Try-On Fraud Prevention",
      description: "System to detect AI-generated fake product demos in e-commerce",
      problem: "Block AI-generated fake product demos",
      revenue: "E-commerce platform fees",
      category: "Retail",
      icon: <Eye className="h-4 w-4" />,
      votes: 14
    },
    {
      id: 20,
      title: "AI-Generated Textbook Check",
      description: "Tool to verify authenticity of educational content",
      problem: "Detect synthetic educational content",
      revenue: "EdTech platform licensing",
      category: "Education",
      icon: <FileCode className="h-4 w-4" />,
      votes: 17
    },
    {
      id: 21,
      title: "Synthetic Stock Market Signal Detector",
      description: "System to identify AI-manipulated financial trends and market signals",
      problem: "Identify AI-manipulated financial trends",
      revenue: "Trading platform subscriptions",
      category: "Finance",
      icon: <Network className="h-4 w-4" />,
      votes: 25
    },
  ];
  
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
        setCurrentTab("explore");
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
  
  const voteForProposal = (proposal: FeatureProposal) => {
    if (!blockchainService.isWalletConnected()) {
      toast.error("Please connect your wallet first");
      return;
    }
    
    toast.success(`Vote cast for "${proposal.title}"`);
    setSelectedProposal(proposal);
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
      
      <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
        <TabsList className="mb-6 w-full md:w-auto">
          <TabsTrigger value="submit">Submit Proposal</TabsTrigger>
          <TabsTrigger value="explore">Explore Proposals</TabsTrigger>
          <TabsTrigger value="active">Active Features</TabsTrigger>
        </TabsList>
        
        <TabsContent value="submit" className="space-y-4">
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
        </TabsContent>
        
        <TabsContent value="explore">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {featureProposals.map((proposal) => (
              <Card key={proposal.id} className={`transition-colors ${selectedProposal?.id === proposal.id ? 'border-primary' : ''}`}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-full bg-primary/10 text-primary">
                        {proposal.icon}
                      </div>
                      <CardTitle className="text-lg">{proposal.title}</CardTitle>
                    </div>
                    <Badge variant="outline">{proposal.category}</Badge>
                  </div>
                  <CardDescription className="mt-2">
                    {proposal.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-semibold">Problem:</span> {proposal.problem}
                    </div>
                    <div>
                      <span className="font-semibold">Revenue Model:</span> {proposal.revenue}
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Database className="h-3 w-3" /> 
                      <span>{proposal.votes} votes</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={() => voteForProposal(proposal)}
                    variant={selectedProposal?.id === proposal.id ? "default" : "outline"}
                    size="sm"
                    className="w-full"
                  >
                    {selectedProposal?.id === proposal.id ? (
                      <span className="flex items-center gap-1">
                        <Check className="h-4 w-4" /> Voted
                      </span>
                    ) : "Vote for this feature"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="active">
          <div className="bg-muted/50 rounded-lg p-6 text-center space-y-4">
            <Database className="h-12 w-12 mx-auto text-muted-foreground" />
            <h3 className="text-xl font-medium">Active Features</h3>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Features that receive enough votes will be implemented and appear here.
              Currently, all proposed features are still in the voting phase.
            </p>
            <Button variant="outline" onClick={() => setCurrentTab("explore")}>
              Explore & Vote on Proposals
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
