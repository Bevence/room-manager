import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Phone, MapPin, Send, Clock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

const contactInfo = [
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (555) 123-4567",
    href: "tel:+15551234567",
  },
  {
    icon: Mail,
    label: "Email",
    value: "hello@botanica.com",
    href: "mailto:hello@botanica.com",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "123 Garden Lane, Green Valley, CA 90210",
    href: "#",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon-Sat: 9am - 6pm",
    href: "#",
  },
];

export const ContactSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    toast({
      title: "Message sent!",
      description: "We'll get back to you within 24 hours.",
    });
    
    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-muted/30 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-leaf/5 rounded-full blur-3xl" />
      </div>

      <div ref={ref} className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium">Get In Touch</span>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold mt-3 mb-6">
            Let's Start Growing Together
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Have questions about our plants or need expert advice? We'd love to
            hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="bg-card rounded-3xl p-8 shadow-card border border-border/50">
              <h3 className="font-serif text-2xl font-semibold mb-6">
                Send us a Message
              </h3>
              
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    First Name
                  </label>
                  <Input
                    required
                    placeholder="John"
                    className="rounded-xl h-12"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Last Name
                  </label>
                  <Input
                    required
                    placeholder="Doe"
                    className="rounded-xl h-12"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="text-sm font-medium mb-2 block">
                  Email Address
                </label>
                <Input
                  required
                  type="email"
                  placeholder="john@example.com"
                  className="rounded-xl h-12"
                />
              </div>

              <div className="mb-4">
                <label className="text-sm font-medium mb-2 block">
                  Subject
                </label>
                <Input
                  required
                  placeholder="How can we help?"
                  className="rounded-xl h-12"
                />
              </div>

              <div className="mb-6">
                <label className="text-sm font-medium mb-2 block">
                  Message
                </label>
                <Textarea
                  required
                  placeholder="Tell us more about your inquiry..."
                  className="rounded-xl min-h-[120px] resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full h-14 text-lg bg-primary hover:bg-primary/90"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </motion.div>

          {/* Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Info Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              {contactInfo.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-card rounded-2xl p-5 shadow-card border border-border/50 hover:shadow-lg transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <item.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <div className="text-sm text-muted-foreground mb-1">
                    {item.label}
                  </div>
                  <div className="font-medium">{item.value}</div>
                </motion.a>
              ))}
            </div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="rounded-2xl overflow-hidden shadow-card border border-border/50 h-[300px]"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.7152203584424!2d-118.40078768478697!3d34.05223398060477!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bbfa496f94af%3A0xf8be2d0e72e5bd4f!2sBeverly%20Hills%2C%20CA%2090210!5e0!3m2!1sen!2sus!4v1635959481851!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Location Map"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
