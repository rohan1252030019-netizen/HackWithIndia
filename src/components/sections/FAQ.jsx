import { faqIntro, faqs } from '../../data/faqs.js';
import { Accordion } from '../ui/Accordion.jsx';
import { Section } from '../layout/Section.jsx';
import { SectionHeading } from '../layout/SectionHeading.jsx';

export function FAQ() {
  return (
    <Section id="faq" tone="alt" width="max-w-3xl">
      <SectionHeading
        icon="BookOpen"
        label={faqIntro.label}
        title={faqIntro.title}
        description={faqIntro.description}
        align="center"
        className="max-w-xl mb-14"
      />

      <Accordion items={faqs} />
    </Section>
  );
}
