
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";

const Resources = () => {
  const educationalResources = [
    {
      title: "What are Deepfakes?",
      description: "A comprehensive guide to understanding deepfake technology",
      content: `Deepfakes are synthetic media where a person's likeness is replaced with someone else's using artificial intelligence. The term "deepfake" combines "deep learning" and "fake," reflecting the AI technology used to create them. These manipulated videos, images, or audio recordings are created using deep neural networks that can learn to mimic a person's facial expressions, voice, and mannerisms with surprising accuracy.

The technology behind deepfakes, known as generative adversarial networks (GANs), involves two AI systems working in tandem: one creates the fake content while the other evaluates its authenticity. Through continuous improvement, deepfakes have become increasingly realistic and difficult to detect without specialized tools.

While deepfakes can be used for creative and satirical purposes, they raise significant concerns about misinformation, election interference, fraud, and non-consensual intimate imagery. As the technology becomes more accessible, distinguishing between authentic and manipulated media is becoming increasingly challenging.`
    },
    {
      title: "How Deepfakes Work",
      description: "Technical explanation of deepfake creation technology",
      content: `Deepfakes are created using sophisticated AI models called Generative Adversarial Networks (GANs) and other deep learning techniques. The process typically involves several key steps:

1. Data Collection: Thousands of images or video frames of both the target person (who will be replaced) and the source person (who will be inserted) are collected.

2. Face Detection & Alignment: AI locates and aligns facial features in each frame of both individuals.

3. Training: The deepfake algorithm learns the facial features and expressions of both individuals. Two neural networks work together - a generator that creates fake images and a discriminator that tries to detect if they're real.

4. Face Swapping: The algorithm replaces the target's face with the source's face while maintaining natural expressions, lighting, and positioning.

5. Post-Processing: Various refinements improve realism by matching skin tones, fixing boundaries, and smoothing transitions.

For audio deepfakes, similar principles apply but with voice data instead. The AI analyzes speech patterns, tone, pitch, and cadence to create synthetic audio that mimics someone's voice.

What makes modern deepfakes so convincing is that the AI continuously improves itself - the generator gets better at creating realistic fakes while the discriminator gets better at spotting them, resulting in increasingly convincing results.`
    },
    {
      title: "Spotting Deepfakes",
      description: "Tips and techniques to identify manipulated media",
      content: `While deepfakes are becoming increasingly sophisticated, there are several telltale signs that can help you identify manipulated media:

1. Unnatural Facial Movements: Look for awkward expressions, limited blinking, or rigid head movements.

2. Inconsistent Lighting: Check if shadows fall in different directions or if lighting on the face doesn't match the environment.

3. Blurry or Changing Face Boundaries: Deepfakes often show blurring, pixelation, or color inconsistencies at the edges of the face.

4. Audio-Visual Mismatches: Pay attention to whether lip movements precisely match the words being spoken.

5. Skin Texture and Complexion: Look for unnaturally smooth skin or inconsistent skin tone across the face.

6. Unnatural Eye Movements: Many deepfakes struggle with realistic eye movements and blinking patterns.

7. Unusual Facial Proportions: Watch for subtle distortions in the size and position of facial features.

8. Digital Artifacts: Look for flickering, glitching, or warping, especially during movement.

9. Verify the Source: Check if the content comes from reliable sources and whether it appears elsewhere.

If you suspect a deepfake, try fact-checking the content, examining other footage of the person, and using reverse image searches to verify authenticity.`
    },
    {
      title: "The Ethics of Deepfakes",
      description: "Exploring the ethical implications of synthetic media",
      content: `Deepfake technology presents complex ethical challenges that society is still grappling with:

Consent and Autonomy: Deepfakes can violate a person's right to control their own image and voice. When someone's likeness is used without permission, it raises serious ethical concerns about personal autonomy and dignity.

Misinformation and Trust: As deepfakes become more realistic, they threaten to erode trust in media. The potential for creating convincing false narratives challenges our ability to distinguish truth from fiction.

Political Impacts: Deepfakes could be weaponized to manipulate elections, create false statements from politicians, or incite political unrest through manufactured events.

Non-consensual Intimate Content: One of the most harmful applications has been creating fake pornographic content using real people's faces without their consent, causing psychological harm and reputational damage.

Attribution and Accountability: Determining who is responsible for harmful deepfakes presents challenges as the technology becomes more accessible and the creators can remain anonymous.

Beneficial Uses: Deepfake technology also has positive applications in film production, art, accessibility, and education that must be balanced against potential harms.

Finding ethical frameworks for this rapidly evolving technology requires balancing free expression with preventing harm, and developing both technical and legal solutions to address misuse while preserving beneficial applications.`
    },
    {
      title: "Legal Frameworks",
      description: "Current and emerging laws regarding synthetic media",
      content: `The legal landscape around deepfakes is rapidly evolving as legislators work to address this new technology:

United States: Several states, including California, Texas, and Virginia, have passed specific laws targeting malicious deepfakes, particularly those used for electoral interference or non-consensual intimate imagery. At the federal level, the Malicious Deep Fake Prohibition Act and the DEEPFAKES Accountability Act have been proposed.

European Union: The EU's GDPR provides some protection through data protection and right to privacy provisions. The proposed AI Act specifically addresses deepfakes, requiring clear labeling of synthetic media.

China: China has implemented regulations requiring that all deepfakes be clearly labeled and traceable to their creator, with strict penalties for violations.

United Kingdom: The UK's Online Safety Bill includes provisions to address harmful deepfakes, placing responsibility on platforms to manage such content.

International Challenges: Enforcement remains difficult due to jurisdictional issues, anonymous creation and distribution, and rapid technological advancement outpacing legal frameworks.

Legal considerations typically focus on:
- Intent and harm (malicious vs. creative uses)
- Consent of the depicted individuals
- Labeling requirements for synthetic media
- Platform liability for hosting deepfakes
- Copyright and intellectual property violations

As technology continues to advance, legal frameworks will need to balance preventing harm with protecting freedom of expression and legitimate uses of synthetic media technology.`
    },
  ];
  
  const faqItems = [
    {
      question: "What is a deepfake?",
      answer: "A deepfake is synthetic media where a person's likeness is replaced with someone else's using artificial intelligence and machine learning techniques. The term combines 'deep learning' and 'fake,' referring to the AI technology used to create them."
    },
    {
      question: "How can I tell if a video is a deepfake?",
      answer: "Look for unnatural blinking patterns, weird facial expressions, blurry or changing face boundaries, inconsistent lighting, audio-visual mismatches, and unusual skin texture. Our detection tools can help identify these signs automatically."
    },
    {
      question: "Are all synthetic media harmful?",
      answer: "No. Synthetic media has many positive applications in filmmaking, art, education, and accessibility. The ethics depend on context, consent, and intent. Harmful uses typically involve deception or non-consensual portrayal."
    },
    {
      question: "How accurate are deepfake detection tools?",
      answer: "Detection accuracy varies based on deepfake quality and detection method. Current tools typically achieve 70-95% accuracy, with performance improving as algorithms advance. However, as deepfake technology improves, detection becomes more challenging."
    },
    {
      question: "Is creating deepfakes illegal?",
      answer: "It depends on the content and jurisdiction. Creating deepfakes for malicious purposes like non-consensual intimate imagery or fraud is illegal in many places. Several countries and states have enacted specific legislation against harmful deepfakes."
    },
    {
      question: "How can I protect myself from deepfakes?",
      answer: "Limit publicly available photos and videos, use privacy settings on social media, be skeptical of surprising video content, verify information through multiple sources, and report suspected deepfakes to platforms and authorities."
    },
    {
      question: "Will deepfakes eventually become undetectable?",
      answer: "While deepfakes are becoming more sophisticated, detection technology is also advancing. Rather than becoming completely undetectable, we're likely to see an ongoing technological race between creation and detection methods."
    }
  ];

  return (
    <>
      <Navbar />
      <main className="container py-20 md:py-32">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold sm:text-4xl">Educational Resources</h1>
            <p className="mt-4 text-muted-foreground">
              Learn about deepfake technology, detection methods, and how to protect yourself
            </p>
          </div>
          
          <Tabs defaultValue="learn" className="mb-10">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="learn">Learn About Deepfakes</TabsTrigger>
              <TabsTrigger value="faq">Frequently Asked Questions</TabsTrigger>
            </TabsList>
            
            <TabsContent value="learn">
              <div className="space-y-6 mt-6">
                {educationalResources.map((resource, i) => (
                  <Card key={i}>
                    <CardHeader>
                      <CardTitle>{resource.title}</CardTitle>
                      <CardDescription>{resource.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="prose max-w-none text-muted-foreground space-y-4">
                        {resource.content.split('\n\n').map((paragraph, j) => (
                          <p key={j}>{paragraph}</p>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                <Card>
                  <CardHeader>
                    <CardTitle>Additional Resources</CardTitle>
                    <CardDescription>External links and tools for further learning</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li>
                        <a 
                          href="https://www.media.mit.edu/projects/detect-fakes/overview/" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline flex items-center gap-1"
                        >
                          MIT Media Lab: Detect Fakes Project
                        </a>
                        <p className="text-sm text-muted-foreground mt-1">
                          Research and tools for detecting manipulated media
                        </p>
                      </li>
                      <li>
                        <a 
                          href="https://jigsaw.google.com/the-current/disinformation/"
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline flex items-center gap-1"
                        >
                          Google Jigsaw: Disinformation Research
                        </a>
                        <p className="text-sm text-muted-foreground mt-1">
                          Exploring the challenges of synthetic media and disinformation
                        </p>
                      </li>
                      <li>
                        <a 
                          href="https://www.witness.org/portfolio_page/synthetic-media-and-deep-fakes/"
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline flex items-center gap-1"
                        >
                          WITNESS Media Lab: Synthetic Media Resources
                        </a>
                        <p className="text-sm text-muted-foreground mt-1">
                          Practical guides for journalists and human rights defenders
                        </p>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="faq">
              <div className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Common Questions About Deepfakes</CardTitle>
                    <CardDescription>
                      Answers to frequently asked questions about deepfake technology and detection
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {faqItems.map((item, i) => (
                        <div key={i} className="space-y-2">
                          <h3 className="font-medium">{item.question}</h3>
                          <p className="text-sm text-muted-foreground">
                            {item.answer}
                          </p>
                          {i < faqItems.length - 1 && (
                            <hr className="my-4" />
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <div className="text-center py-6">
                  <h2 className="text-xl font-bold mb-4">Ready to Test Your Detection Skills?</h2>
                  <p className="text-muted-foreground mb-6">
                    Use our detection tools to analyze suspicious content and improve your ability to spot deepfakes.
                  </p>
                  <div className="flex justify-center gap-4">
                    <Link to="/image-analysis" className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                      Try Image Analysis
                    </Link>
                    <Link to="/video-analysis" className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                      Try Video Analysis
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
