import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { HERO_IMAGE, CLEANSER_IMAGE } from '../data/seedData';
import { 
  Sparkles, 
  Droplet, 
  ShieldCheck, 
  MapPin, 
  Mail, 
  Phone, 
  MessageCircle, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';

const FAQS = [
  {
    q: 'Are Veloura formulations tested on melanin-rich skin?',
    a: 'Yes, unconditionally. Every formulation—especially our Invisible Mineral SPF 50+—is tested across Fitzpatrick skin types IV through VI to ensure zero white residue, zero ashiness, and radiant non-greasy absorption.'
  },
  {
    q: 'How long does nationwide delivery take across Nigeria?',
    a: 'Orders within Lagos are dispatched same-day or next-day. Deliveries to Abuja, Port Harcourt, Ibadan, and other state capitals typically arrive within 2 to 4 business days via our tracked courier partners.'
  },
  {
    q: 'Can I use the Ceramide Barrier Cream if I have acne-prone skin?',
    a: 'Yes. Our barrier cream utilizes pure sugarcane squalane and non-comedogenic physiological ceramides that replenish moisture without clogging pores. If actively experiencing heavy breakouts, pair it with our 5% Niacinamide & Zinc Clarifying Elixir.'
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept all Nigerian bank debit/credit cards (Mastercard, Visa, Verve), direct NIP bank transfers, and USSD via our certified Paystack and Flutterwave gateways.'
  },
  {
    q: 'What is your return or exchange policy?',
    a: 'We take pride in our formulations. If you experience an allergic reaction or receive a compromised package, contact our Lagos concierge within 7 days for a replacement or full refund.'
  }
];

export const AboutContactPage: React.FC = () => {
  const { showToast, setCurrentView } = useStore();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSent, setIsSent] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.message) return;
    setIsSent(true);
    showToast('Your message has been sent to our skincare team.', 'success');
    setContactForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="space-y-16 pb-16">
      {/* Editorial Story Hero */}
      <section className="bg-white border-b border-[#EAE3DA]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center space-y-4">
          <span className="text-xs uppercase tracking-widest text-[#9C6B68] font-semibold">
            Our Story & Ethos
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif text-[#1E1C1A] leading-tight">
            Beauty, thoughtfully curated for everyday rituals.
          </h1>
          <p className="text-xs sm:text-sm text-[#7A746E] max-w-2xl mx-auto leading-relaxed">
            Veloura was born in Lagos from a simple observation: skincare routines had become overly complicated, laden with harsh marketing claims, and frequently overlooked the nuances of melanin-rich skin in tropical climates.
          </p>
        </div>
      </section>

      {/* Philosophy Pillars */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-3xl border border-[#EAE3DA] space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-full bg-[#FAF7F2] text-[#9C6B68] flex items-center justify-center">
              <Droplet className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-serif text-[#1E1C1A]">Biocompatible Lipid Science</h3>
            <p className="text-xs text-[#7A746E] leading-relaxed">
              We focus on barrier-identical components: 3:1:1 ceramide ratios, plant squalane, and multi-depth hyaluronic molecules that work harmoniously with your skin's natural biology.
            </p>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-[#EAE3DA] space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-full bg-[#FAF7F2] text-[#9C6B68] flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-serif text-[#1E1C1A]">Melanin-First Formulation</h3>
            <p className="text-xs text-[#7A746E] leading-relaxed">
              Every formula is clinically screened to prevent white cast, calm hyperpigmentation gently without stripping, and withstand climate humidity.
            </p>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-[#EAE3DA] space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-full bg-[#FAF7F2] text-[#9C6B68] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-serif text-[#1E1C1A]">Zero Empty Claims</h3>
            <p className="text-xs text-[#7A746E] leading-relaxed">
              We never promise overnight miracles or medical diagnoses. We formulate reliable, comforting products that leave skin softer, resilient, and luminous over time.
            </p>
          </div>
        </div>
      </section>

      {/* Visual Break */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl overflow-hidden aspect-16/9 sm:aspect-21/9 bg-[#F4EFEA] border border-[#EAE3DA]">
          <img
            src={HERO_IMAGE}
            alt="Veloura studio ritual"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="text-xs uppercase tracking-widest text-[#7A746E] block mb-1">
            Common Inquiries
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#1E1C1A]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="divide-y divide-[#EAE3DA] bg-white rounded-3xl border border-[#EAE3DA] p-6 shadow-xs text-xs">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="py-4 first:pt-0 last:pb-0">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between text-left font-serif font-medium text-sm text-[#1E1C1A]"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-[#9C6B68]" /> : <ChevronDown className="w-4 h-4 text-[#7A746E]" />}
                </button>
                {isOpen && (
                  <p className="mt-2 text-[#7A746E] leading-relaxed text-xs">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Contact Concierge & WhatsApp */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Contact Details */}
          <div className="md:col-span-5 space-y-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#9C6B68] font-semibold">
                Customer Care
              </span>
              <h2 className="text-2xl font-serif text-[#1E1C1A] mt-1">
                Reach the Veloura Team
              </h2>
              <p className="text-xs text-[#7A746E] mt-2 leading-relaxed">
                Have questions about an ongoing order, ingredient sensitivity, or tailored routine advice?
              </p>
            </div>

            <div className="space-y-4 text-xs text-[#7A746E]">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[#9C6B68] shrink-0" />
                <span>Victoria Island, Lagos State, Nigeria</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#9C6B68] shrink-0" />
                <span>concierge@veloura.co</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#9C6B68] shrink-0" />
                <span>+234 803 123 4567 (Mon–Sat 9AM–6PM WAT)</span>
              </div>
            </div>

            <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#E8E1D9] text-xs">
              <span className="font-semibold text-[#1E1C1A] block mb-1">Instant WhatsApp Support</span>
              <p className="text-[#7A746E] mb-3">Chat directly with a certified skincare advisor in Lagos.</p>
              <a
                href="https://wa.me/2348030000000"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#128C7E] text-white rounded-xl font-semibold hover:bg-[#075E54] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Open WhatsApp Chat</span>
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-[#EAE3DA] shadow-xs">
            <h3 className="text-lg font-serif text-[#1E1C1A] mb-4">Send Us a Message</h3>

            {isSent ? (
              <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="font-serif text-sm font-semibold text-emerald-900">Message Received</h4>
                <p className="text-xs text-emerald-700">Thank you! Our skincare concierge will get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium text-[#7A746E] mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Chioma O."
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#E2D9CE] rounded-xl focus:outline-hidden focus:border-[#1E1C1A]"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-[#7A746E] mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="chioma@example.com"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#E2D9CE] rounded-xl focus:outline-hidden focus:border-[#1E1C1A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-[#7A746E] mb-1">Subject</label>
                  <input
                    type="text"
                    placeholder="Routine advice, order question, etc."
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#E2D9CE] rounded-xl focus:outline-hidden focus:border-[#1E1C1A]"
                  />
                </div>

                <div>
                  <label className="block font-medium text-[#7A746E] mb-1">Your Message</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about your skin concern or inquiry..."
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#E2D9CE] rounded-xl focus:outline-hidden focus:border-[#1E1C1A]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#1E1C1A] hover:bg-[#9C6B68] text-white rounded-xl font-semibold uppercase tracking-wider transition-colors shadow-xs"
                >
                  Send Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
