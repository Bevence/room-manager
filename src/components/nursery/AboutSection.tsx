import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Leaf, Droplets, Sun, Heart } from "lucide-react";

const values = [
  {
    icon: Leaf,
    title: "Sustainable Growing",
    description: "We use organic practices and eco-friendly methods to nurture every plant.",
  },
  {
    icon: Droplets,
    title: "Water Conservation",
    description: "Our irrigation systems minimize water waste while keeping plants healthy.",
  },
  {
    icon: Sun,
    title: "Natural Light",
    description: "Greenhouses designed to maximize natural sunlight for optimal growth.",
  },
  {
    icon: Heart,
    title: "Passion & Care",
    description: "Every plant receives individual attention from our dedicated team.",
  },
];

export const AboutSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 md:py-32 bg-muted/30 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-leaf/5 rounded-full blur-3xl" />

      <div ref={ref} className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Grid */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 }}
                className="space-y-4"
              >
                <div className="rounded-2xl overflow-hidden shadow-card img-zoom">
                  <img
                    src="https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=600"
                    alt="Plant nursery"
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-card img-zoom">
                  <img
                    src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=600"
                    alt="Growing plants"
                    className="w-full h-64 object-cover"
                  />
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 }}
                className="space-y-4 pt-8"
              >
                <div className="rounded-2xl overflow-hidden shadow-card img-zoom">
                  <img
                    src="https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600"
                    alt="Succulents"
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-card img-zoom">
                  <img
                    src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=600"
                    alt="Greenhouse"
                    className="w-full h-48 object-cover"
                  />
                </div>
              </motion.div>
            </div>

            {/* Experience Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.6 }}
              className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-6 rounded-2xl shadow-lg"
            >
              <div className="text-4xl font-bold">15+</div>
              <div className="text-sm opacity-90">Years of Excellence</div>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary font-medium">About Us</span>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold mt-3 mb-6">
              Growing Green Dreams Since 2008
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              At Botanica, we believe in the transformative power of plants. Our
              journey began with a simple mission: to bring sustainable,
              high-quality plants to homes while respecting Mother Earth. Every
              plant in our nursery is grown with love, using eco-friendly
              practices that nurture both the plant and the planet.
            </p>

            {/* Values Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex gap-4 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <value.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
