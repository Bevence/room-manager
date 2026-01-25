import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Truck, Shield, Award, Phone, Recycle, Clock } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Free Delivery",
    description: "Complimentary shipping on orders over $50 with careful packaging.",
  },
  {
    icon: Shield,
    title: "Plant Guarantee",
    description: "30-day healthy plant guarantee or we'll replace it free.",
  },
  {
    icon: Award,
    title: "Expert Curated",
    description: "Each plant is hand-selected by our horticultural experts.",
  },
  {
    icon: Phone,
    title: "Care Support",
    description: "Free plant care advice from our specialists anytime.",
  },
  {
    icon: Recycle,
    title: "Eco Packaging",
    description: "100% biodegradable and recyclable packaging materials.",
  },
  {
    icon: Clock,
    title: "Same Day Prep",
    description: "Orders placed by noon are prepared the same day.",
  },
];

export const WhyUsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="why-us" className="py-24 md:py-32 bg-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="leaves" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="20" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#leaves)" />
        </svg>
      </div>

      <div ref={ref} className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary-foreground/80 font-medium">Why Choose Us</span>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold mt-3 mb-6 text-primary-foreground">
            The Botanica Difference
          </h2>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            We're not just selling plants – we're sharing our passion for creating
            greener, healthier spaces.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 border border-primary-foreground/20 group hover:bg-primary-foreground/20 transition-all cursor-pointer"
            >
              <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
                className="w-14 h-14 rounded-xl bg-primary-foreground flex items-center justify-center mb-5 group-hover:shadow-lg transition-all"
              >
                <feature.icon className="w-7 h-7 text-primary" />
              </motion.div>
              <h3 className="text-xl font-semibold text-primary-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-primary-foreground/70">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          {[
            { value: "50K+", label: "Plants Delivered" },
            { value: "99%", label: "Happy Customers" },
            { value: "500+", label: "Plant Varieties" },
            { value: "24/7", label: "Care Support" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ scale: 0.8 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: 0.8 + index * 0.1 }}
            >
              <div className="text-4xl md:text-5xl font-bold text-primary-foreground mb-2">
                {stat.value}
              </div>
              <div className="text-primary-foreground/70">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
