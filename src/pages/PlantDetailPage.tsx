import { motion, AnimatePresence } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import {
  ArrowLeft,
  Heart,
  ShoppingCart,
  Minus,
  Plus,
  Truck,
  Shield,
  Leaf,
  Droplets,
  Sun,
  ThermometerSun,
  Share2,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";

const plants = [
  {
    id: "1",
    name: "Monstera Deliciosa",
    category: "Indoor",
    price: 45,
    images: [
      "https://images.unsplash.com/photo-1614594975525-e45c5513cc12?w=800",
      "https://images.unsplash.com/photo-1637967886160-fd78dc3ce3f5?w=800",
      "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?w=800",
    ],
    badge: "Bestseller",
    rating: 4.9,
    reviews: 128,
    description: "The Monstera Deliciosa, also known as the Swiss Cheese Plant, is a stunning tropical plant famous for its unique split leaves. This iconic houseplant adds instant drama to any space and is surprisingly easy to care for.",
    features: [
      "Air-purifying qualities",
      "Low maintenance",
      "Fast growing",
      "Pet-friendly with caution",
    ],
    care: {
      light: "Bright, indirect light",
      water: "Weekly, allow soil to dry between waterings",
      humidity: "60-80% humidity preferred",
      temperature: "65-85°F (18-29°C)",
    },
    size: "Medium (12-18 inches)",
    potSize: "6 inch nursery pot",
    inStock: true,
    stockCount: 15,
  },
  {
    id: "2",
    name: "Peace Lily",
    category: "Indoor",
    price: 32,
    images: [
      "https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=800",
      "https://images.unsplash.com/photo-1616690248206-71eb2c9e6227?w=800",
    ],
    badge: null,
    rating: 4.7,
    reviews: 89,
    description: "The Peace Lily is a graceful plant with elegant white flowers. It's one of the best plants for improving indoor air quality and thrives in low-light conditions.",
    features: [
      "Excellent air purifier",
      "Blooms beautiful white flowers",
      "Thrives in low light",
      "Easy to care for",
    ],
    care: {
      light: "Low to medium indirect light",
      water: "Keep soil consistently moist",
      humidity: "Medium to high humidity",
      temperature: "65-80°F (18-27°C)",
    },
    size: "Medium (14-16 inches)",
    potSize: "5 inch nursery pot",
    inStock: true,
    stockCount: 23,
  },
  {
    id: "3",
    name: "Lavender",
    category: "Flowering",
    price: 28,
    images: [
      "https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?w=800",
      "https://images.unsplash.com/photo-1468327768560-75b778cbb551?w=800",
    ],
    badge: "New",
    rating: 4.8,
    reviews: 56,
    description: "Lavender brings the calming scent of the Mediterranean to your home. Known for its aromatic purple flowers and silvery-green foliage, it's perfect for sunny windowsills.",
    features: [
      "Aromatic fragrance",
      "Attracts pollinators",
      "Drought tolerant",
      "Culinary and medicinal uses",
    ],
    care: {
      light: "Full sun (6+ hours)",
      water: "Allow soil to dry completely",
      humidity: "Low humidity preferred",
      temperature: "60-70°F (15-21°C)",
    },
    size: "Small (8-12 inches)",
    potSize: "4 inch nursery pot",
    inStock: true,
    stockCount: 8,
  },
  {
    id: "4",
    name: "Echeveria Collection",
    category: "Succulents",
    price: 38,
    images: [
      "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=800",
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800",
    ],
    badge: null,
    rating: 4.6,
    reviews: 72,
    description: "A beautiful collection of Echeveria succulents in various colors and shapes. These rosette-forming plants are perfect for beginners and add a sculptural element to any space.",
    features: [
      "Low water needs",
      "Multiple varieties included",
      "Perfect for beginners",
      "Propagates easily",
    ],
    care: {
      light: "Bright, direct light",
      water: "Every 2-3 weeks, soak and dry",
      humidity: "Low humidity",
      temperature: "55-80°F (13-27°C)",
    },
    size: "Assorted (2-4 inches each)",
    potSize: "4 inch pot set of 3",
    inStock: true,
    stockCount: 12,
  },
  {
    id: "5",
    name: "Fiddle Leaf Fig",
    category: "Indoor",
    price: 65,
    images: [
      "https://images.unsplash.com/photo-1545241047-6083a3684587?w=800",
      "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=800",
    ],
    badge: "Popular",
    rating: 4.9,
    reviews: 156,
    description: "The Fiddle Leaf Fig is the ultimate statement plant with its large, violin-shaped leaves. A favorite of interior designers, it brings a bold, architectural element to any room.",
    features: [
      "Statement-making foliage",
      "Designer favorite",
      "Air purifying",
      "Long-lasting",
    ],
    care: {
      light: "Bright, indirect light",
      water: "Weekly, when top inch is dry",
      humidity: "Medium humidity",
      temperature: "60-75°F (16-24°C)",
    },
    size: "Large (24-36 inches)",
    potSize: "8 inch nursery pot",
    inStock: true,
    stockCount: 6,
  },
];

const relatedPlants = plants.slice(0, 4);

const PlantDetailPage = () => {
  const { id } = useParams();
  const plant = plants.find((p) => p.id === id) || plants[0];
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = () => {
    toast({
      title: "Added to cart!",
      description: `${quantity}x ${plant.name} added to your cart.`,
    });
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted ? "Removed from wishlist" : "Added to wishlist!",
      description: isWishlisted
        ? `${plant.name} removed from your wishlist.`
        : `${plant.name} saved to your wishlist.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 bg-background/90 backdrop-blur-xl border-b border-border"
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/#plants">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Plants</span>
            </Button>
          </Link>
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <Leaf className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-serif text-xl font-semibold">Botanica</span>
          </Link>
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
              0
            </span>
          </Button>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Main Image */}
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-muted mb-4">
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImage}
                  src={plant.images[selectedImage]}
                  alt={plant.name}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
              
              {plant.badge && (
                <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground text-sm px-4 py-1">
                  {plant.badge}
                </Badge>
              )}

              {/* Wishlist Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleWishlist}
                className={`absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-colors ${
                  isWishlisted
                    ? "bg-red-500 text-white"
                    : "bg-card text-foreground hover:bg-muted"
                }`}
              >
                <Heart
                  className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`}
                />
              </motion.button>
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex gap-3">
              {plant.images.map((image, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedImage(index)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? "border-primary ring-2 ring-primary/20"
                      : "border-transparent hover:border-border"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${plant.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            {/* Category & Rating */}
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="text-primary border-primary">
                {plant.category}
              </Badge>
              <div className="flex items-center gap-1">
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
                <span className="text-sm text-muted-foreground ml-2">
                  {plant.rating} ({plant.reviews} reviews)
                </span>
              </div>
            </div>

            {/* Title & Price */}
            <div>
              <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-3">
                {plant.name}
              </h1>
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-primary">
                  ${plant.price}
                </span>
                <span className="text-muted-foreground line-through">
                  ${Math.round(plant.price * 1.2)}
                </span>
                <Badge className="bg-leaf text-leaf-foreground">Save 20%</Badge>
              </div>
            </div>

            {/* Description */}
            <p className="text-muted-foreground text-lg leading-relaxed">
              {plant.description}
            </p>

            {/* Features */}
            <div className="space-y-2">
              {plant.features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span>{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* Size & Stock */}
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Size:</span>
                <span className="font-medium">{plant.size}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Pot:</span>
                <span className="font-medium">{plant.potSize}</span>
              </div>
              {plant.inStock && (
                <div className="flex items-center gap-2 text-leaf">
                  <Check className="w-4 h-4" />
                  <span className="font-medium">In Stock ({plant.stockCount})</span>
                </div>
              )}
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <div className="flex items-center border border-border rounded-full">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <Button
                onClick={handleAddToCart}
                className="flex-1 rounded-full h-12 text-lg bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart - ${plant.price * quantity}
              </Button>
            </div>

            {/* Share */}
            <Button variant="outline" className="rounded-full gap-2">
              <Share2 className="w-4 h-4" />
              Share
            </Button>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
              {[
                { icon: Truck, label: "Free Shipping", sub: "On orders $50+" },
                { icon: Shield, label: "30-Day Guarantee", sub: "Healthy plants" },
                { icon: Leaf, label: "Eco Packaging", sub: "100% recyclable" },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-sm font-medium">{item.label}</div>
                  <div className="text-xs text-muted-foreground">{item.sub}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Care Instructions Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16"
        >
          <Tabs defaultValue="care" className="w-full">
            <TabsList className="w-full max-w-lg mx-auto grid grid-cols-3 rounded-full h-14 p-1 bg-muted">
              <TabsTrigger
                value="care"
                className="rounded-full data-[state=active]:bg-card data-[state=active]:shadow-sm"
              >
                Care Guide
              </TabsTrigger>
              <TabsTrigger
                value="details"
                className="rounded-full data-[state=active]:bg-card data-[state=active]:shadow-sm"
              >
                Details
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="rounded-full data-[state=active]:bg-card data-[state=active]:shadow-sm"
              >
                Reviews
              </TabsTrigger>
            </TabsList>

            <TabsContent value="care" className="mt-8">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: Sun, label: "Light", value: plant.care.light },
                  { icon: Droplets, label: "Water", value: plant.care.water },
                  { icon: Leaf, label: "Humidity", value: plant.care.humidity },
                  { icon: ThermometerSun, label: "Temperature", value: plant.care.temperature },
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="bg-card rounded-2xl p-6 border border-border/50 shadow-card"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{item.label}</h3>
                    <p className="text-muted-foreground">{item.value}</p>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="details" className="mt-8">
              <div className="bg-card rounded-2xl p-8 border border-border/50 shadow-card max-w-2xl mx-auto">
                <h3 className="font-serif text-2xl font-semibold mb-6">
                  Product Details
                </h3>
                <div className="space-y-4">
                  {[
                    { label: "Plant Size", value: plant.size },
                    { label: "Pot Size", value: plant.potSize },
                    { label: "Category", value: plant.category },
                    { label: "Stock", value: `${plant.stockCount} available` },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex justify-between py-3 border-b border-border last:border-0"
                    >
                      <span className="text-muted-foreground">{item.label}</span>
                      <span className="font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-8">
              <div className="text-center py-12">
                <div className="text-6xl mb-4">⭐</div>
                <h3 className="font-serif text-2xl font-semibold mb-2">
                  {plant.rating} out of 5
                </h3>
                <p className="text-muted-foreground mb-6">
                  Based on {plant.reviews} reviews
                </p>
                <Button className="rounded-full">Write a Review</Button>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Related Plants */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-24"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-3xl font-semibold">
              You May Also Like
            </h2>
            <Link to="/#plants">
              <Button variant="outline" className="rounded-full">
                View All
              </Button>
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedPlants
              .filter((p) => p.id !== id)
              .slice(0, 4)
              .map((relatedPlant, index) => (
                <motion.div
                  key={relatedPlant.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ y: -5 }}
                >
                  <Link to={`/plants/${relatedPlant.id}`}>
                    <div className="bg-card rounded-2xl overflow-hidden border border-border/50 shadow-card hover:shadow-lg transition-all">
                      <div className="aspect-square overflow-hidden">
                        <img
                          src={relatedPlant.images[0]}
                          alt={relatedPlant.name}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold mb-1">{relatedPlant.name}</h3>
                        <div className="flex items-center justify-between">
                          <span className="text-primary font-bold">
                            ${relatedPlant.price}
                          </span>
                          <div className="flex items-center gap-1 text-sm">
                            <span className="text-accent">★</span>
                            <span>{relatedPlant.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
          </div>
        </motion.div>
      </main>

      {/* Simple Footer */}
      <footer className="bg-muted/30 border-t border-border mt-24 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <Leaf className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-serif text-xl font-semibold text-foreground">
              Botanica
            </span>
          </Link>
          <p className="text-sm">
            © {new Date().getFullYear()} Botanica. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PlantDetailPage;
