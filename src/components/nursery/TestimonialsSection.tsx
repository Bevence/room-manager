import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "Interior Designer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
    rating: 5,
    text: "Botanica has transformed how I source plants for my projects. The quality is exceptional, and their sustainable practices align perfectly with my eco-conscious design philosophy.",
  },
  {
    id: 2,
    name: "David Chen",
    role: "Plant Enthusiast",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200",
    rating: 5,
    text: "I've been ordering from Botanica for over a year now. Every plant arrives in perfect condition, and their care guides have helped me become a much better plant parent!",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Café Owner",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200",
    rating: 5,
    text: "The plants from Botanica have completely transformed my café's atmosphere. Customers always comment on how beautiful and healthy they look. Absolutely recommend!",
  },
  {
    id: 4,
    name: "Michael Thompson",
    role: "Homeowner",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
    rating: 5,
    text: "Outstanding customer service and plant quality. The team helped me choose the perfect plants for my low-light apartment, and they're thriving months later.",
  },
];

export const TestimonialsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-leaf-light via-background to-primary-light" />

      <div ref={ref} className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium">Testimonials</span>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold mt-3 mb-6">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Join thousands of happy plant parents who have transformed their
            spaces with Botanica.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Main Card */}
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-card rounded-3xl p-8 md:p-12 shadow-lg border border-border/50 relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-8 right-8 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Quote className="w-8 h-8 text-primary" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: testimonials[currentIndex].rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>

              {/* Text */}
              <p className="text-xl md:text-2xl text-foreground leading-relaxed mb-8 font-light">
                "{testimonials[currentIndex].text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                  className="w-14 h-14 rounded-full object-cover ring-4 ring-primary/20"
                />
                <div>
                  <div className="font-semibold text-lg">
                    {testimonials[currentIndex].name}
                  </div>
                  <div className="text-muted-foreground">
                    {testimonials[currentIndex].role}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={prevSlide}
                className="rounded-full w-12 h-12 border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>

              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentIndex
                        ? "bg-primary w-8"
                        : "bg-primary/30 hover:bg-primary/50"
                    }`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={nextSlide}
                className="rounded-full w-12 h-12 border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
