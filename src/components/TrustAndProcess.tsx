import { motion } from 'motion/react';
import { ShieldCheck, Eye, Presentation, Briefcase, Users, Megaphone, Home, MessageSquare } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { anchorHref } from '../utils/routeAnchors';

const trustPoints = [
  {
    Icon: ShieldCheck,
    title: 'Official Zanzi franchise',
    body: 'Trusted local recognition combined with a premium, modern advisory experience.',
  },
  {
    Icon: Eye,
    title: 'Private property advisory',
    body: 'Tailored guidance for buyers, sellers, and investors through clear, discreet communication.',
  },
  {
    Icon: Users,
    title: 'Supported by the Quicklets Network',
    body: 'Added confidence from wider lettings awareness and property-network familiarity in Malta.',
  },
  {
    Icon: Presentation,
    title: 'Premium listing presentation',
    body: 'Property media and narrative are handled to reflect asset quality and attract serious enquiries.',
  },
  {
    Icon: Briefcase,
    title: 'Confidential seller valuations',
    body: 'Careful, practical valuation guidance for owners deciding how and when to enter the market.',
  },
  {
    Icon: Users,
    title: 'Buyer and tenant enquiry handling',
    body: 'Introductions are managed with fit, readiness, and transaction quality in mind.',
  },
  {
    Icon: Megaphone,
    title: 'Modern digital marketing',
    body: 'Digital execution supports discoverability while maintaining quality control and discretion.',
  },
  {
    Icon: Home,
    title: 'Direct-owner sourcing',
    body: 'Relationship-led sourcing opens access to opportunities beyond standard listing flows.',
  },
  {
    Icon: MessageSquare,
    title: 'Clear follow-up and communication',
    body: 'Every stage is coordinated with transparent next steps and consistent advisor contact.',
  },
];

export default function TrustAndProcess() {
  const { pathname } = useLocation();

  return (
    <section
      id="trust"
      className="scroll-anchor-target py-10 px-4 sm:px-8 bg-brand-charcoal border-t border-brand-bronze-dark/25"
      aria-labelledby="trust-heading"
    >
      <div className="max-w-7xl mx-auto">
        <h2 id="trust-heading" className="text-2xl md:text-3xl font-playfair text-brand-ivory mb-3">
          A More Trusted Way to Move Through Malta Real Estate
        </h2>
        <p className="text-sm text-brand-sand font-light leading-relaxed max-w-2xl mb-8">
          Elevate by Zanzi combines premium presentation with trusted Malta property-network backing from Zanzi and Quicklets, giving buyers,
          sellers, landlords, and investors a more confident experience.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
          {trustPoints.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              viewport={{ once: true }}
              className="bg-brand-panel border border-brand-bronze-dark/25 p-5 md:p-6 min-w-0"
            >
              <div className="flex gap-4">
                <div className="w-11 h-11 rounded-full border border-brand-bronze-dark/35 flex items-center justify-center shrink-0" aria-hidden="true">
                  <item.Icon className="w-5 h-5 text-brand-copper" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg font-playfair text-brand-ivory mb-2">{item.title}</h3>
                  <p className="text-brand-sand text-xs sm:text-sm font-light leading-relaxed">{item.body}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="border border-brand-bronze-dark/25 bg-brand-panel p-5 md:p-6">
          <h3 className="text-lg md:text-xl font-playfair text-brand-ivory mb-4">Our Process</h3>
          <ol className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {[
              'Understand your goals',
              'Match the right opportunities',
              'Arrange private viewings or consultations',
              'Guide negotiation and next steps',
              'Support you through completion',
            ].map((step, idx) => (
              <li key={step} className="border border-brand-bronze-dark/20 bg-brand-charcoal/50 p-4">
                <p className="text-[10px] text-brand-champagne uppercase tracking-[0.22em] font-bold mb-1">Step {idx + 1}</p>
                <p className="text-brand-sand text-xs sm:text-sm font-light leading-relaxed">{step}</p>
              </li>
            ))}
          </ol>
        </div>

        <p className="mt-8 text-center">
          <a
            href={anchorHref(pathname, '#contact')}
            className="inline-flex items-center justify-center min-h-[48px] px-8 border border-brand-bronze-dark/45 bg-brand-taupe/40 text-brand-champagne text-[10px] font-bold uppercase tracking-[0.28em] hover:bg-brand-muted hover:border-brand-copper/50 hover:text-brand-ivory transition-colors touch-manipulation"
          >
            Speak with an adviser
          </a>
        </p>
      </div>
    </section>
  );
}
