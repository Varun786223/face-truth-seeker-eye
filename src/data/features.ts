
import { Feature, FeaturesByCategory } from "@/types/features";

const allFeatures: Feature[] = [
  // Detection & Prevention Features
  {
    id: "dna-sequence-validation",
    title: "DNA Sequence Validation",
    description: "Detects AI-generated synthetic DNA sequences in biotech research",
    category: "detection",
    problem: "Prevent synthetic DNA designs that could pose biohazard risks",
    revenue: "Charge biolabs per analysis",
    link: "/image-analysis"
  },
  {
    id: "quantum-hash-timestamping",
    title: "Quantum Hash Timestamping",
    description: "Future-proofs media against quantum computer forgeries",
    category: "detection",
    problem: "Traditional encryption will fail against quantum computing",
    revenue: "Government/defense contracts",
    link: "/blockchain"
  },
  {
    id: "neural-implant-authentication",
    title: "Neural Implant Authentication",
    description: "Verifies brain-computer interface data legitimacy",
    category: "detection",
    problem: "Spoofed neural signals could compromise healthcare systems",
    revenue: "Neurotech licensing fees",
    link: "/image-analysis"
  },
  {
    id: "synthetic-olfactory-detection",
    title: "Synthetic Olfactory Detection",
    description: "Identifies AI-generated scent formulas",
    category: "detection",
    problem: "Synthetic scents could bypass safety regulations",
    revenue: "Per-test pricing for perfume/food industries",
    link: "/image-analysis"
  },
  {
    id: "climate-data-forgery-audit",
    title: "Climate Data Forgery Audit",
    description: "Flags manipulated weather/climate models",
    category: "detection",
    problem: "Altered climate data could affect global policy decisions",
    revenue: "Insurance industry subscriptions",
    link: "/image-analysis"
  },
  {
    id: "robotic-motion-analysis",
    title: "Robotic Motion Analysis",
    description: "Detects AI-generated robotic movement patterns",
    category: "detection",
    problem: "Synthetic movement patterns could bypass security systems",
    revenue: "Factory safety certifications",
    link: "/video-analysis"
  },
  {
    id: "nanomaterial-blueprint-check",
    title: "Nanomaterial Blueprint Check",
    description: "Identifies hazardous AI-designed materials",
    category: "detection",
    problem: "Synthetic nanomaterials could have unknown safety risks",
    revenue: "Research lab subscriptions",
    link: "/image-analysis"
  },
  {
    id: "legal-doc-scanner",
    title: "AI-Generated Legal Doc Scanner",
    description: "Finds synthetic contracts/agreements",
    category: "detection",
    problem: "AI-generated legal documents could contain hidden clauses",
    revenue: "Law firm enterprise plans",
    link: "/image-analysis"
  },
  {
    id: "political-speech-analyzer",
    title: "Political Speech Live Analyzer",
    description: "Detects AI-generated campaign promises",
    category: "detection",
    problem: "Synthetic political content could influence elections",
    revenue: "NGO partnerships",
    link: "/video-analysis"
  },
  {
    id: "medication-ad-validator",
    title: "Medication Ad Validator",
    description: "Spots fake drug endorsement videos",
    category: "detection",
    problem: "Synthetic medical advertising could endanger public health",
    revenue: "Pharma compliance contracts",
    link: "/video-analysis"
  },
  {
    id: "food-origin-blockchain",
    title: "Food Origin Blockchain",
    description: "Tracks fake organic certifications",
    category: "detection",
    problem: "Synthetic food supply chain data can mask fraud",
    revenue: "Farm/food API licensing",
    link: "/blockchain"
  },
  {
    id: "crisis-deepfake-alert",
    title: "Crisis Deepfake Alert",
    description: "Identifies fake emergency broadcasts",
    category: "detection",
    problem: "Synthetic emergency alerts could cause public panic",
    revenue: "Municipal emergency system contracts",
    link: "/video-analysis"
  },
  {
    id: "patent-check",
    title: "AI-Generated Patent Check",
    description: "Detects synthetic inventions in patents",
    category: "detection",
    problem: "AI-generated patents could overload the system with junk",
    revenue: "Patent office integration fees",
    link: "/image-analysis"
  },
  {
    id: "space-data-authentication",
    title: "Space Data Authentication",
    description: "Verifies satellite/rover media",
    category: "detection",
    problem: "Synthetic space imagery could mislead scientific research",
    revenue: "Space agency partnerships",
    link: "/image-analysis"
  },
  {
    id: "cultural-heritage-shield",
    title: "Cultural Heritage Shield",
    description: "Preserves authentic historical media",
    category: "detection",
    problem: "Synthetic historical content could distort cultural heritage",
    revenue: "UNESCO/archival grants",
    link: "/image-analysis"
  },
  {
    id: "dark-web-synthetic-monitor",
    title: "Dark Web Synthetic Monitor",
    description: "Tracks illegal deepfake distribution",
    category: "detection",
    problem: "Illicit synthetic content trading on dark web",
    revenue: "Cybersecurity firm partnerships",
    link: "/image-analysis"
  },
  {
    id: "code-detector",
    title: "AI-Generated Code Detector",
    description: "Finds malicious synthetic code",
    category: "detection",
    problem: "Synthetic code could contain hidden backdoors",
    revenue: "DevTools API integration",
    link: "/image-analysis"
  },
  {
    id: "ecosystem-monitor",
    title: "Synthetic Ecosystem Monitor",
    description: "Detects fake environmental data",
    category: "detection",
    problem: "Synthetic environmental reports could mislead conservation efforts",
    revenue: "Carbon credit validation fees",
    link: "/image-analysis"
  },
  {
    id: "virtual-tryon-prevention",
    title: "Virtual Try-On Fraud Prevention",
    description: "Blocks fake product demos",
    category: "detection",
    problem: "Synthetic product demonstrations could mislead consumers",
    revenue: "E-commerce platform fees",
    link: "/image-analysis"
  },
  {
    id: "textbook-check",
    title: "AI-Generated Textbook Check",
    description: "Identifies synthetic educational content",
    category: "detection",
    problem: "Synthetic educational materials could contain misinformation",
    revenue: "EdTech platform licensing",
    link: "/image-analysis"
  },
  {
    id: "stock-market-detector",
    title: "Stock Market Signal Detector",
    description: "Spots AI-manipulated financial trends",
    category: "detection",
    problem: "Synthetic market signals could manipulate trading",
    revenue: "Trading platform subscriptions",
    link: "/image-analysis"
  },
  {
    id: "3d-printed-validation",
    title: "3D-Printed Object Validation",
    description: "Verifies CAD design authenticity",
    category: "detection",
    problem: "Synthetic CAD designs could contain hidden flaws",
    revenue: "Manufacturing certification fees",
    link: "/image-analysis"
  },
  {
    id: "voiceprint-watermarking",
    title: "Voiceprint Watermarking",
    description: "Embeds detectable markers in genuine audio",
    category: "detection",
    problem: "Voice cloning makes authentication difficult",
    revenue: "Media company subscriptions",
    link: "/image-analysis"
  },
  {
    id: "meme-detector",
    title: "AI-Generated Meme Detector",
    description: "Identifies propaganda/disinformation memes",
    category: "detection",
    problem: "Synthetic memes can spread misinformation rapidly",
    revenue: "Social media platform integration",
    link: "/image-analysis"
  },
  {
    id: "hologram-analysis",
    title: "Hologram Projection Analysis",
    description: "Validates AR/VR hologram authenticity",
    category: "detection",
    problem: "Synthetic holograms could create false presence",
    revenue: "AR/VR platform licensing",
    link: "/image-analysis"
  },
  
  // Citizen Protection Features
  {
    id: "elder-scam-shield",
    title: "Elder Scam Shield",
    description: "Blocks synthetic "grandchild emergency" calls",
    category: "citizen-protection",
    problem: "Elderly are targeted by voice-cloned scam calls",
    revenue: "Telecom provider integration",
    link: "/image-analysis"
  },
  {
    id: "romance-bait-detector",
    title: "Romance Bait Detector",
    description: "Identifies fake dating profiles",
    category: "citizen-protection",
    problem: "Synthetic dating profiles enable romance scams",
    revenue: "Dating app integrations",
    link: "/image-analysis"
  },
  {
    id: "job-interview-verifier",
    title: "Job Interview Verifier",
    description: "Confirms live interviewees are real",
    category: "citizen-protection",
    problem: "Synthetic interviews can bypass hiring processes",
    revenue: "HR platform subscriptions",
    link: "/video-analysis"
  },
  {
    id: "academic-credential-check",
    title: "Academic Credential Check",
    description: "Validates diplomas/certificates",
    category: "citizen-protection",
    problem: "Synthetic credentials enable qualification fraud",
    revenue: "Educational verification services",
    link: "/image-analysis"
  },
  {
    id: "child-digital-twin-alert",
    title: "Child Digital Twin Alert",
    description: "Detects synthetic child avatars",
    category: "citizen-protection",
    problem: "Synthetic child avatars enable exploitation",
    revenue: "Gaming platform integrations",
    link: "/image-analysis"
  },
  {
    id: "real-estate-title-sentinel",
    title: "Real Estate Title Sentinel",
    description: "Prevents forged property documents",
    category: "citizen-protection",
    problem: "Synthetic property documents enable title fraud",
    revenue: "Real estate transaction fees",
    link: "/blockchain"
  },
  {
    id: "will-validator",
    title: "AI-Generated Will Validator",
    description: "Detects synthetic legal documents",
    category: "citizen-protection",
    problem: "Synthetic wills can divert inheritances",
    revenue: "Legal verification services",
    link: "/image-analysis"
  },
  {
    id: "charity-detector",
    title: "Fake Charity Detector",
    description: "Identifies AI-generated disaster appeals",
    category: "citizen-protection",
    problem: "Synthetic charity appeals divert donations",
    revenue: "Payment processor fees",
    link: "/image-analysis"
  },
  {
    id: "genealogy-shield",
    title: "Genealogy Shield",
    description: "Blocks fake historical family records",
    category: "citizen-protection",
    problem: "Synthetic genealogical records confuse heritage",
    revenue: "Ancestry research subscriptions",
    link: "/image-analysis"
  },
  {
    id: "grief-prevention",
    title: "Grief Prevention",
    description: "Stops "resurrection" scams",
    category: "citizen-protection",
    problem: "Synthetic deceased loved-ones exploit grief",
    revenue: "Social platform integrations",
    link: "/image-analysis"
  },
  
  // Revenue & Enterprise Features
  {
    id: "deepfake-insurance",
    title: "Deepfake Insurance",
    description: "Financial protection against synthetic fraud",
    category: "revenue",
    problem: "Deepfake damages have no financial protection",
    revenue: "Insurance premiums",
    link: "/settings"
  },
  {
    id: "virtual-notary",
    title: "Virtual Notary",
    description: "Authenticates legal documents digitally",
    category: "revenue",
    problem: "Digital documents lack authentication",
    revenue: "Per-document certification fees",
    link: "/blockchain"
  },
  {
    id: "media-license-registry",
    title: "Media License Registry",
    description: "Tracks legal AI-generated content",
    category: "revenue",
    problem: "Legal AI content needs attribution",
    revenue: "Licensing marketplace fees",
    link: "/blockchain"
  },
  {
    id: "deepfake-removal-marketplace",
    title: "Deepfake Removal Marketplace",
    description: "Deletes malicious content",
    category: "revenue",
    problem: "Deepfake victims need removal services",
    revenue: "Removal service fees",
    link: "/settings"
  },
  {
    id: "ai-ethics-audit",
    title: "AI Ethics Audit",
    description: "Corporate compliance reporting",
    category: "revenue",
    problem: "Companies need AI ethics verification",
    revenue: "Corporate compliance fees",
    link: "/settings"
  },
  {
    id: "detection-hardware",
    title: "Detection Hardware",
    description: "On-premise analysis devices",
    category: "revenue",
    problem: "Sensitive environments need local detection",
    revenue: "Hardware sales",
    link: "/settings"
  },
  {
    id: "training-data-marketplace",
    title: "Training Data Marketplace",
    description: "Sells verified detection datasets",
    category: "revenue",
    problem: "Detection models need clean data",
    revenue: "Dataset licensing",
    link: "/settings"
  },
  {
    id: "deepfake-certifications",
    title: "Deepfake Certifications",
    description: "Professional training programs",
    category: "revenue",
    problem: "Organizations need certified experts",
    revenue: "Certification program fees",
    link: "/resources"
  },
  {
    id: "synthetic-art-nft",
    title: "Synthetic Art NFT Platform",
    description: "Validates ethical AI art",
    category: "revenue",
    problem: "AI art needs provenance tracking",
    revenue: "NFT marketplace fees",
    link: "/blockchain"
  },
  {
    id: "ai-music-licensing",
    title: "AI Music Licensing",
    description: "Tracks synthetic music copyrights",
    category: "revenue",
    problem: "AI music needs copyright management",
    revenue: "Licensing fee percentage",
    link: "/settings"
  },
  
  // Government & Critical Systems
  {
    id: "military-simulation-validator",
    title: "Military Simulation Validator",
    description: "Detects fake war game data",
    category: "government",
    problem: "Synthetic military simulations could mislead training",
    revenue: "Defense contracts",
    link: "/settings"
  },
  {
    id: "pandemic-early-warning",
    title: "Pandemic Early Warning",
    description: "Identifies synthetic health crisis data",
    category: "government",
    problem: "Synthetic health alerts could cause panic",
    revenue: "Health agency contracts",
    link: "/settings"
  },
  {
    id: "supply-chain-provenance",
    title: "Supply Chain Provenance",
    description: "Validates manufacturing media",
    category: "government",
    problem: "Synthetic supply chain data hides fraud",
    revenue: "Industry compliance fees",
    link: "/blockchain"
  },
  {
    id: "central-bank-currency-shield",
    title: "Central Bank Currency Shield",
    description: "Prevents CBDC fraud",
    category: "government",
    problem: "Digital currencies vulnerable to synthetic fraud",
    revenue: "Central bank implementation fees",
    link: "/blockchain"
  },
  {
    id: "ai-news-monitoring",
    title: "AI News Monitoring",
    description: "Combats synthetic journalism",
    category: "government",
    problem: "Synthetic news undermines democratic discourse",
    revenue: "Media organization subscriptions",
    link: "/video-analysis"
  }
];

// Group features by category
export const featuresByCategory: FeaturesByCategory = allFeatures.reduce((acc, feature) => {
  if (!acc[feature.category]) {
    acc[feature.category] = [];
  }
  acc[feature.category].push(feature);
  return acc;
}, {} as FeaturesByCategory);

// Export all features as a flat array
export const features = allFeatures;
