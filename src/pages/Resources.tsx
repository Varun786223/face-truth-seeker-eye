
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Shield, BookOpen, HelpCircle, ExternalLink } from "lucide-react";

const Resources = () => {
  const educationalResources = [
    {
      title: "What is Synthetic Media?",
      description: "Understanding AI-generated content and digital manipulation",
      category: "Basics",
      content: `Synthetic media refers to any content (images, videos, audio, text, documents, or 3D models) that has been created or manipulated using artificial intelligence. This includes deepfakes, AI-generated faces, voice clones, manipulated videos, computer-generated text, and even synthetic DNA sequences or 3D models.

The technology behind synthetic media, particularly deepfakes, uses deep neural networks and generative adversarial networks (GANs) that can learn to mimic a person's facial expressions, voice patterns, writing style, and other characteristics with increasing accuracy.

While synthetic media has legitimate uses in filmmaking, art, education, and accessibility, it also poses significant risks including misinformation, fraud, non-consensual intimate imagery, election interference, and various forms of digital deception that DeepSentinel helps detect and prevent.`
    },
    {
      title: "How DeepSentinel Detection Works",
      description: "Technical explanation of our multi-format detection technology",
      category: "Technology",
      content: `DeepSentinel uses advanced AI models and machine learning algorithms to detect various forms of synthetic and manipulated content across multiple formats:

**Image & Video Analysis:** Our system examines facial inconsistencies, unnatural movements, lighting anomalies, pixel-level artifacts, temporal inconsistencies in videos, and GAN-specific signatures that indicate AI generation.

**Audio Detection:** We analyze speech patterns, tone variations, unnatural pauses, spectral anomalies, and voice consistency to identify AI-generated or cloned audio content.

**Document Analysis:** Our text analysis engines detect AI-generated writing patterns, inconsistent formatting, metadata anomalies, and linguistic signatures typical of large language models.

**3D & Advanced Media:** DeepSentinel can also analyze 3D models, VR content, and even synthetic biological data for signs of AI generation or manipulation.

**Blockchain Verification:** Beyond detection, we provide cryptographic proof of authenticity through blockchain timestamping and hash verification for genuine content.`
    },
    {
      title: "Spotting Synthetic Media",
      description: "Visual and auditory cues to identify AI-generated content",
      category: "Detection Tips",
      content: `While synthetic media is becoming increasingly sophisticated, there are several telltale signs that can help you identify manipulated content:

**Visual Indicators:**
- Unnatural facial movements or limited blinking patterns
- Inconsistent lighting or shadows that don't match the environment
- Blurry or changing boundaries around faces or objects
- Unusual skin texture or unnaturally smooth complexion
- Distorted facial proportions or misaligned features

**Audio Indicators:**
- Unnatural pauses or rhythm in speech
- Inconsistent voice quality or tone
- Robotic or synthetic-sounding pronunciation
- Audio that doesn't match lip movements in videos

**Document Indicators:**
- Repetitive phrasing or unnatural language patterns
- Inconsistent formatting or writing style
- Generic or placeholder-like content
- Metadata inconsistencies

**General Tips:**
- Verify sources and cross-reference information
- Use reverse image/video searches
- Check for official verification badges
- Trust your instincts if something seems "off"

DeepSentinel automates this detection process with much higher accuracy than manual inspection.`
    },
    {
      title: "The Ethics of AI and Synthetic Media",
      description: "Exploring the ethical implications of AI-generated content",
      category: "Ethics",
      content: `The rise of synthetic media presents complex ethical challenges that society continues to navigate:

**Consent and Privacy:** Creating synthetic content using someone's likeness without permission violates personal autonomy and can cause significant harm to individuals' reputation and mental health.

**Information Integrity:** As synthetic media becomes more realistic, it threatens our ability to distinguish truth from fiction, potentially undermining trust in authentic media and democratic institutions.

**Beneficial Applications:** Synthetic media also has positive uses including film production, digital art, accessibility tools for people with disabilities, historical recreation, and educational content.

**Responsibility and Accountability:** Questions arise about who is responsible for harmful synthetic content and how to balance free expression with preventing abuse.

**Detection and Verification:** Tools like DeepSentinel play a crucial role in maintaining digital trust by helping verify authentic content and detecting malicious synthetic media.

**Legal Frameworks:** Emerging laws worldwide are beginning to address synthetic media, requiring disclosure, penalizing malicious use, and establishing liability frameworks.

The future depends on developing both technical solutions and ethical frameworks that harness the benefits of AI while minimizing potential harms.`
    },
    {
      title: "Legal Frameworks and Regulations",
      description: "Current and emerging laws regarding synthetic media",
      category: "Legal",
      content: `The legal landscape around synthetic media is rapidly evolving as legislators work to address these new technologies:

**United States:** Several states have enacted specific laws targeting malicious synthetic media. California's AB 602 addresses deepfake pornography, while AB 730 targets election-related deepfakes. Texas and Virginia have similar legislation.

**European Union:** The EU's GDPR provides some protection through data protection provisions. The proposed AI Act specifically addresses synthetic media, requiring clear labeling and establishing liability frameworks.

**China:** China has implemented comprehensive regulations requiring all synthetic media to be clearly labeled and traceable to their creator, with strict penalties for violations.

**Global Trends:** Many countries are developing legislation that focuses on:
- Intent and harm assessment
- Consent requirements for depicted individuals  
- Mandatory labeling of synthetic content
- Platform liability for hosting harmful content
- Copyright and intellectual property protections

**Enforcement Challenges:** Cross-border jurisdiction issues, anonymous creation and distribution, and rapidly evolving technology continue to complicate enforcement efforts.

DeepSentinel supports compliance efforts by providing detection tools and verification services that help organizations meet emerging regulatory requirements.`
    },
  ];
  
  const faqItems = [
    {
      question: "What is synthetic media?",
      answer: "Synthetic media is any content (images, videos, audio, text, or documents) created or manipulated using artificial intelligence. This includes deepfakes, AI-generated voices, synthetic text, and digitally manipulated documents."
    },
    {
      question: "How can I tell if content is AI-generated?",
      answer: "Look for unnatural movements, inconsistent lighting, audio-visual mismatches, repetitive language patterns, and unusual artifacts. DeepSentinel's detection tools can identify these signs automatically with high accuracy."
    },
    {
      question: "Are all AI-generated content harmful?",
      answer: "No. Synthetic media has many positive applications in filmmaking, art, education, and accessibility. The ethics depend on context, consent, and intent. Harmful uses typically involve deception or non-consensual portrayal."
    },
    {
      question: "How accurate is DeepSentinel's detection?",
      answer: "DeepSentinel typically achieves 85-95% accuracy depending on content quality and type. Our algorithms continuously improve through machine learning and regular updates to counter the latest synthetic media generation techniques."
    },
    {
      question: "Is creating synthetic media illegal?",
      answer: "It depends on the content, intent, and jurisdiction. Creating synthetic media for malicious purposes like fraud, harassment, or non-consensual intimate imagery is illegal in many places. Several countries have enacted specific legislation against harmful synthetic media."
    },
    {
      question: "How can I protect myself from synthetic media fraud?",
      answer: "Limit publicly available photos and videos, use privacy settings on social media, verify surprising content through multiple sources, use detection tools like DeepSentinel, and report suspected synthetic media to platforms and authorities."
    },
    {
      question: "What makes DeepSentinel different from other detection tools?",
      answer: "DeepSentinel offers multi-format detection (not just images), real-time analysis, blockchain verification for authentic content, smart file analysis that suggests relevant detection features, and comprehensive fraud prevention rather than just detection."
    }
  ];

  return (
    <>
      <Navbar />
      <main className="container py-20 md:py-32">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-primary/10 rounded-full p-3">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl font-bold sm:text-5xl mb-4">Educational Resources</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Learn about synthetic media, AI detection methods, and how to protect yourself in the digital age
            </p>
          </div>
          
          <Tabs defaultValue="learn" className="mb-12">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="learn" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Learn About Synthetic Media
              </TabsTrigger>
              <TabsTrigger value="faq" className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4" />
                Frequently Asked Questions
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="learn">
              <div className="space-y-8">
                {educationalResources.map((resource, i) => (
                  <Card key={i} className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-xl mb-2">{resource.title}</CardTitle>
                          <CardDescription className="text-base">{resource.description}</CardDescription>
                        </div>
                        <Badge variant="outline">{resource.category}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="prose max-w-none text-muted-foreground space-y-4">
                        {resource.content.split('\n\n').map((paragraph, j) => (
                          <p key={j} className="leading-relaxed">{paragraph}</p>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ExternalLink className="h-5 w-5 text-primary" />
                      Additional Resources
                    </CardTitle>
                    <CardDescription>External links and tools for further learning</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-4">
                        <h4 className="font-medium">Research & Academia</h4>
                        <ul className="space-y-3">
                          <li>
                            <a 
                              href="https://www.media.mit.edu/projects/detect-fakes/overview/" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-primary hover:underline flex items-center gap-1 text-sm"
                            >
                              MIT Media Lab: Detect Fakes Project
                              <ExternalLink className="h-3 w-3" />
                            </a>
                            <p className="text-xs text-muted-foreground mt-1">
                              Research and tools for detecting manipulated media
                            </p>
                          </li>
                          <li>
                            <a 
                              href="https://jigsaw.google.com/the-current/disinformation/"
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-primary hover:underline flex items-center gap-1 text-sm"
                            >
                              Google Jigsaw: Disinformation Research
                              <ExternalLink className="h-3 w-3" />
                            </a>
                            <p className="text-xs text-muted-foreground mt-1">
                              Exploring synthetic media and disinformation challenges
                            </p>
                          </li>
                        </ul>
                      </div>
                      <div className="space-y-4">
                        <h4 className="font-medium">Practical Guides</h4>
                        <ul className="space-y-3">
                          <li>
                            <a 
                              href="https://www.witness.org/portfolio_page/synthetic-media-and-deep-fakes/"
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-primary hover:underline flex items-center gap-1 text-sm"
                            >
                              WITNESS: Synthetic Media Resources
                              <ExternalLink className="h-3 w-3" />
                            </a>
                            <p className="text-xs text-muted-foreground mt-1">
                              Guides for journalists and human rights defenders
                            </p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="faq">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Common Questions About Synthetic Media</CardTitle>
                    <CardDescription>
                      Answers to frequently asked questions about AI-generated content and detection
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {faqItems.map((item, i) => (
                        <div key={i} className="space-y-3">
                          <h3 className="font-medium text-lg">{item.question}</h3>
                          <p className="text-muted-foreground leading-relaxed">
                            {item.answer}
                          </p>
                          {i < faqItems.length - 1 && (
                            <hr className="my-6 border-muted" />
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <div className="text-center py-8 bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl border border-primary/20">
                  <h2 className="text-2xl font-bold mb-4">Ready to Test Your Detection Skills?</h2>
                  <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                    Use our advanced detection tools to analyze suspicious content and improve your ability to spot synthetic media.
                  </p>
                  <div className="flex justify-center gap-4 flex-wrap">
                    <Link 
                      to="/image-analysis" 
                      className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    >
                      Try Image Analysis
                    </Link>
                    <Link 
                      to="/video-analysis" 
                      className="inline-flex h-11 items-center justify-center rounded-full border border-input bg-background px-6 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    >
                      Try Video Analysis
                    </Link>
                    <Link 
                      to="/webcam-analysis" 
                      className="inline-flex h-11 items-center justify-center rounded-full border border-input bg-background px-6 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    >
                      Live Camera Analysis
                    </Link>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Resources;
