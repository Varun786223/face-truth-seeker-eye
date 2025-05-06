
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQ() {
  const faqs = [
    {
      question: "What are deepfakes?",
      answer: "Deepfakes are synthetic media where a person's likeness is replaced with someone else's using artificial intelligence. This technology can create convincing images, videos, or audio recordings that make people appear to say or do things they never did."
    },
    {
      question: "How accurate is your deepfake detection?",
      answer: "Our detection technology typically achieves 85-95% accuracy, depending on the quality of the deepfake. The system is continually improving through machine learning and regular updates to counter the latest deepfake techniques."
    },
    {
      question: "Can your tool detect all types of deepfakes?",
      answer: "Our tools can detect many common forms of deepfakes, including face swaps, facial reenactments, and synthesized audio. However, as deepfake technology evolves, some sophisticated manipulations may be harder to detect. We regularly update our algorithms to improve detection capabilities."
    },
    {
      question: "How does the deepfake detection process work?",
      answer: "Our detection process analyzes visual and audio inconsistencies that are typically present in deepfakes. This includes examining facial features, eye blinking patterns, skin texture, facial boundaries, and voice patterns. The AI looks for subtle artifacts that human eyes might miss."
    },
    {
      question: "Is my uploaded content stored or shared?",
      answer: "We prioritize your privacy. Uploaded content is processed only for the purpose of analysis and is not permanently stored on our servers. All uploads are automatically deleted after analysis is complete, typically within 24 hours."
    }
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-12 md:mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-muted-foreground">
            Learn more about deepfakes and our detection technology.
          </p>
        </div>
        
        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left font-medium">
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
