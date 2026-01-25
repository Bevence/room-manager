import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const tips = [
  {
    id: 1,
    title: "How to Keep Your Indoor Plants Thriving in Winter",
    excerpt: "Learn the essential tips for maintaining healthy houseplants during the colder months...",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600",
    category: "Care Guide",
    author: "Emma Green",
    readTime: "5 min read",
    date: "Jan 15, 2024",
  },
  {
    id: 2,
    title: "The Ultimate Guide to Succulent Care",
    excerpt: "Discover everything you need to know about caring for these drought-resistant beauties...",
    image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=600",
    category: "Beginners",
    author: "James Miller",
    readTime: "8 min read",
    date: "Jan 12, 2024",
  },
  {
    id: 3,
    title: "Creating the Perfect Herb Garden at Home",
    excerpt: "Step-by-step instructions for growing fresh herbs in your kitchen or balcony...",
    image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=600",
    category: "DIY",
    author: "Sarah Woods",
    readTime: "6 min read",
    date: "Jan 10, 2024",
  },
];

export const TipsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="tips" className="py-24 md:py-32 bg-muted/30 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-leaf/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />

      <div ref={ref} className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12"
        >
          <div>
            <span className="text-primary font-medium">Plant Care Tips</span>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold mt-3">
              Learn & Grow
            </h2>
          </div>
          <Button
            variant="outline"
            className="mt-4 md:mt-0 rounded-full group border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary"
          >
            View All Articles
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>

        {/* Tips Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tips.map((tip, index) => (
            <motion.article
              key={tip.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="group cursor-pointer"
            >
              <div className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-lg transition-all duration-500 border border-border/50">
                {/* Image */}
                <div className="relative aspect-video overflow-hidden">
                  <motion.img
                    src={tip.image}
                    alt={tip.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                    {tip.category}
                  </Badge>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {tip.readTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {tip.author}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl font-semibold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {tip.title}
                  </h3>
                  <p className="text-muted-foreground line-clamp-2 mb-4">
                    {tip.excerpt}
                  </p>
                  <motion.span
                    className="inline-flex items-center text-primary font-medium group-hover:underline"
                    whileHover={{ x: 5 }}
                  >
                    Read More
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </motion.span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
