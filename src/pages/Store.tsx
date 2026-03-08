import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { LogOut, ShoppingBag, MessageCircle } from "lucide-react";
import type { User } from "@supabase/supabase-js";

interface Product {
  id: string;
  title: string;
  description: string | null;
  price: number;
  image_url: string | null;
  category: string | null;
}

const Store = () => {
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) navigate("/auth");
      else setUser(session.user);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate("/auth");
      else setUser(session.user);
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase.from("products").select("*").order("created_at", { ascending: false });
      if (data) setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-glass border-b border-border">
        <div className="container mx-auto flex items-center justify-between py-4 px-4">
          <a href="/" className="font-display text-xl font-bold tracking-tight">
            AMMAR <span className="text-gradient-gold">ALI</span>
          </a>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:block">
              {user?.email}
            </span>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium mb-4">
            <ShoppingBag className="w-4 h-4" /> Digital Store
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            My <span className="text-gradient-gold">Services</span>
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Browse and purchase digital products & services
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="border-border/50 bg-card/60 animate-pulse h-64" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="font-display text-xl font-semibold text-muted-foreground mb-2">
              Coming Soon
            </h3>
            <p className="text-muted-foreground/70 mb-6">
              Products will be available here shortly. Stay tuned!
            </p>
            <Button asChild variant="outline" className="border-primary/30 hover:bg-primary/10">
              <a href="/#contact">
                <MessageCircle className="w-4 h-4 mr-2" /> Contact for Custom Services
              </a>
            </Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-border/50 bg-card/60 hover:border-primary/30 transition-all duration-300 group overflow-hidden">
                  {product.image_url && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={product.image_url}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <CardContent className="p-6">
                    {product.category && (
                      <span className="text-xs text-primary font-medium uppercase tracking-wider">
                        {product.category}
                      </span>
                    )}
                    <h3 className="font-display text-lg font-semibold mt-1 mb-2">
                      {product.title}
                    </h3>
                    {product.description && (
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {product.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="font-display text-xl font-bold text-gradient-gold">
                        ${product.price}
                      </span>
                      <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                        Get Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Store;
