import { motion } from 'motion/react';

const testimonials = [
  {
    quote: 'Elevate made the purchase seamless and discreet. Exactly the premium experience we wanted.',
    author: 'A. Camilleri',
    area: 'Sliema',
  },
  {
    quote: 'The team understood our investment goals immediately and matched us with the right property.',
    author: 'J. Borg',
    area: 'Mosta',
  },
  {
    quote: 'Professional, elegant, and incredibly responsive from first viewing to final handover.',
    author: 'M. Vella',
    area: "St. Paul's Bay",
  },
];

export default function Testimonials() {
  return (
    <section className="py-8 px-4 sm:px-8 bg-[#060606] border-t border-gold/20" aria-labelledby="testimonials-heading">
      <div className="max-w-7xl mx-auto">
        <h2 id="testimonials-heading" className="text-2xl md:text-3xl font-playfair text-white mb-2">What Our Clients Say</h2>
        <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] mb-5 max-w-2xl leading-relaxed">
          Illustrative feedback for launch presentation — substitute verified testimonials wherever marketing rules require originals.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {testimonials.map((item, i) => (
            <motion.blockquote
              key={item.author}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              viewport={{ once: true }}
              className="bg-[#0D0D0D] border border-gold/15 p-4"
            >
              <p className="text-white/80 text-xs leading-relaxed mb-3">&ldquo;{item.quote}&rdquo;</p>
              <footer className="text-[10px] uppercase tracking-[0.24em] text-gold font-bold">
                {item.author} - {item.area}
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
