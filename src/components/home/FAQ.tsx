
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQ() {
  const faqs = [
    {
      question: "What is synthetic media?",
      answer: "Synthetic media refers to any content (images, videos, audio, text, etc.) that has been created or manipulated using artificial intelligence. This includes AI-generated faces, voice cloning, manipulated videos, and computer-generated text that mimics human writing."
    },
    {
      question: "How accurate is DeepSentinel's detection technology?",
      answer: "Our detection technology typically achieves 85-95% accuracy, depending on the quality and type of synthetic media. The system continuously improves through machine learning and regular updates to counter the latest synthetic media generation techniques."
    },
    {
      question: "Can DeepSentinel detect all types of AI-generated content?",
      answer: "DeepSentinel can detect many forms of synthetic media, including image manipulations, AI-generated faces, voice clones, and synthetic text. As AI technology evolves, we regularly update our algorithms to improve detection capabilities across multiple content formats."
    },
    {
      question: "How does the blockchain verification process work?",
      answer: "Our blockchain verification creates a cryptographic hash of original content and stores it on a decentralized ledger. This provides a tamper-proof timestamp that proves when content was created and verifies it hasn't been modified, allowing creators to prove authenticity of their work."
    },
    {
      question: "Is my uploaded content stored or shared?",
      answer: "We prioritize your privacy. Uploaded content is processed only for the purpose of analysis and is not permanently stored on our servers unless you specifically opt into blockchain certification. All standard uploads are automatically deleted after analysis is complete."
    }
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-12 md:mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-black dark:text-white">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-muted-foreground">
            Learn more about synthetic media and our detection technology.
          </p>
        </div>
        
        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left font-medium text-black dark:text-white">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
