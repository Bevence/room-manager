import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Heart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const categories = ["All", "Indoor", "Outdoor", "Succulents", "Flowering", "Herbs"];

const plants = [
  {
    id: 1,
    name: "Monstera Deliciosa",
    category: "Indoor",
    price: 45,
    image: "https://images.unsplash.com/photo-1614594975525-e45c5513cc12?w=600",
    badge: "Bestseller",
    rating: 4.9,
  },
  {
    id: 2,
    name: "Peace Lily",
    category: "Indoor",
    price: 32,
    image: "https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=600",
    badge: null,
    rating: 4.7,
  },
  {
    id: 3,
    name: "Lavender",
    category: "Flowering",
    price: 28,
    image: "https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?w=600",
    badge: "New",
    rating: 4.8,
  },
  {
    id: 4,
    name: "Echeveria Collection",
    category: "Succulents",
    price: 38,
    image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=600",
    badge: null,
    rating: 4.6,
  },
  {
    id: 5,
    name: "Fiddle Leaf Fig",
    category: "Indoor",
    price: 65,
    image: "https://images.unsplash.com/photo-1545241047-6083a3684587?w=600",
    badge: "Popular",
    rating: 4.9,
  },
  {
    id: 6,
    name: "Rosemary",
    category: "Herbs",
    price: 18,
    image: "https://images.unsplash.com/photo-1515586000433-45406d8e6662?w=600",
    badge: null,
    rating: 4.5,
  },
  {
    id: 7,
    name: "Bird of Paradise",
    category: "Outdoor",
    price: 75,
    image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=600",
    badge: "Premium",
    rating: 4.8,
  },
  {
    id: 8,
    name: "Pothos Golden",
    category: "Indoor",
    price: 22,
    image: "https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=600",
    badge: null,
    rating: 4.7,
  },
];

export const PlantsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const filteredPlants =
    activeCategory === "All"
      ? plants
      : plants.filter((p) => p.category === activeCategory);

  return (
    <section id="plants" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary-light/30 to-background" />

      <div ref={ref} className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-primary font-medium">Our Collection</span>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold mt-3 mb-6">
            Discover Our Plants
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our curated selection of beautiful, healthy plants ready to
            bring life to your space.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              className={`rounded-full px-6 transition-all ${
                activeCategory === category
                  ? "bg-primary shadow-md"
                  : "hover:bg-muted"
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Plants Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPlants.map((plant, index) => (
            <motion.div
              key={plant.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              onMouseEnter={() => setHoveredId(plant.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group"
            >
              <Link to={`/plants/${plant.id}`}>
                <div className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-lg transition-all duration-500 border border-border/50">
                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden">
                    <motion.img
                      src={plant.image}
                      alt={plant.name}
                      className="w-full h-full object-cover"
                      animate={{
                        scale: hoveredId === plant.id ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.6 }}
                    />
                    
                    {/* Overlay Actions */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredId === plant.id ? 1 : 0 }}
                      className="absolute inset-0 bg-foreground/20 flex items-center justify-center gap-3"
                    >
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => e.preventDefault()}
                        className="w-10 h-10 rounded-full bg-card flex items-center justify-center shadow-md hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => e.preventDefault()}
                        className="w-10 h-10 rounded-full bg-card flex items-center justify-center shadow-md hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        <Heart className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => e.preventDefault()}
                        className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md"
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </motion.button>
                    </motion.div>

                    {/* Badge */}
                    {plant.badge && (
                      <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">
                        {plant.badge}
                      </Badge>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-center gap-1 mb-2">
                      {"★".repeat(5).split("").map((_, i) => (
                        <span
                          key={i}
                          className={`text-sm ${
                            i < Math.floor(plant.rating)
                              ? "text-accent"
                              : "text-muted"
                          }`}
                        >
                          ★
                        </span>
                      ))}
                      <span className="text-sm text-muted-foreground ml-1">
                        ({plant.rating})
                      </span>
                    </div>
                    <h3 className="font-semibold text-lg mb-1">{plant.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {plant.category}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-primary">
                        ${plant.price}
                      </span>
                      <Button
                        size="sm"
                        className="rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground"
                        onClick={(e) => e.preventDefault()}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <Button
            size="lg"
            variant="outline"
            className="rounded-full px-8 border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
          >
            View All Plants
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
