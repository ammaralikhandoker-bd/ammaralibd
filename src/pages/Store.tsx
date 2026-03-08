import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { LogOut, ShoppingBag, MessageCircle, Phone, Copy, CheckCircle2, SendHorizonal, ArrowDownToLine, Shield, KeyRound } from "lucide-react";
import { toast } from "sonner";
import type { User } from "@supabase/supabase-js";
import { useAdmin } from "@/hooks/useAdmin";

const BKASH_NUMBER = "01716861353";

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
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [paymentType, setPaymentType] = useState<"send" | "cashout" | null>(null);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();
  const { isAdmin } = useAdmin();

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

  const handleCopyNumber = () => {
    navigator.clipboard.writeText(BKASH_NUMBER);
    setCopied(true);
    toast.success("bKash number copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleBuyClick = (product: Product) => {
    setSelectedProduct(product);
    setPaymentType(null);
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
            {isAdmin && (
              <Button variant="outline" size="sm" onClick={() => navigate("/admin")} className="border-primary/30">
                <Shield className="w-4 h-4 mr-2" /> Admin
              </Button>
            )}
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
                        ৳{product.price}
                      </span>
                      <Button
                        size="sm"
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                        onClick={() => handleBuyClick(product)}
                      >
                        Buy Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* bKash Payment Dialog */}
      <Dialog open={!!selectedProduct} onOpenChange={(open) => { if (!open) { setSelectedProduct(null); setPaymentType(null); } }}>
        <DialogContent className="sm:max-w-md border-border bg-card">
          <DialogHeader>
            <DialogTitle className="font-display text-xl flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#E2136E] flex items-center justify-center text-white text-xs font-bold">b</div>
              bKash Payment
            </DialogTitle>
            <DialogDescription>
              {selectedProduct && (
                <span>
                  Pay <strong className="text-foreground">৳{selectedProduct.price}</strong> for{" "}
                  <strong className="text-foreground">{selectedProduct.title}</strong>
                </span>
              )}
            </DialogDescription>
          </DialogHeader>

          {!paymentType ? (
            <div className="space-y-3 py-2">
              <p className="text-sm text-muted-foreground mb-4">Select payment method:</p>
              <button
                onClick={() => setPaymentType("send")}
                className="w-full flex items-center gap-4 p-4 rounded-lg border border-border hover:border-[#E2136E]/50 hover:bg-[#E2136E]/5 transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-[#E2136E]/10 flex items-center justify-center group-hover:bg-[#E2136E]/20 transition-colors">
                  <SendHorizonal className="w-5 h-5 text-[#E2136E]" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-foreground">Send Money</p>
                  <p className="text-xs text-muted-foreground">Send money from your bKash app</p>
                </div>
              </button>
              <button
                onClick={() => setPaymentType("cashout")}
                className="w-full flex items-center gap-4 p-4 rounded-lg border border-border hover:border-[#E2136E]/50 hover:bg-[#E2136E]/5 transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-[#E2136E]/10 flex items-center justify-center group-hover:bg-[#E2136E]/20 transition-colors">
                  <ArrowDownToLine className="w-5 h-5 text-[#E2136E]" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-foreground">Cash Out</p>
                  <p className="text-xs text-muted-foreground">Cash out to this number</p>
                </div>
              </button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-5 py-2"
            >
              <div className="bg-[#E2136E]/5 border border-[#E2136E]/20 rounded-xl p-5 text-center space-y-3">
                <p className="text-sm text-muted-foreground">
                  {paymentType === "send" ? "Send Money" : "Cash Out"} to this number:
                </p>
                <div className="flex items-center justify-center gap-3">
                  <Phone className="w-5 h-5 text-[#E2136E]" />
                  <span className="font-display text-2xl font-bold tracking-wider text-foreground">
                    {BKASH_NUMBER}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyNumber}
                  className="border-[#E2136E]/30 hover:bg-[#E2136E]/10 text-foreground"
                >
                  {copied ? (
                    <><CheckCircle2 className="w-4 h-4 mr-2 text-green-500" /> Copied!</>
                  ) : (
                    <><Copy className="w-4 h-4 mr-2" /> Copy Number</>
                  )}
                </Button>
              </div>

              <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                <p className="text-sm font-semibold text-foreground">Instructions:</p>
                <ol className="text-xs text-muted-foreground space-y-1.5 list-decimal list-inside">
                  {paymentType === "send" ? (
                    <>
                      <li>Open your <strong>bKash</strong> app</li>
                      <li>Tap <strong>Send Money</strong></li>
                      <li>Enter number: <strong>{BKASH_NUMBER}</strong></li>
                      <li>Amount: <strong>৳{selectedProduct?.price}</strong></li>
                      <li>Add reference: <strong>{selectedProduct?.title}</strong></li>
                      <li>Confirm with your bKash PIN</li>
                    </>
                  ) : (
                    <>
                      <li>Open your <strong>bKash</strong> app</li>
                      <li>Tap <strong>Cash Out</strong></li>
                      <li>Enter agent number: <strong>{BKASH_NUMBER}</strong></li>
                      <li>Amount: <strong>৳{selectedProduct?.price}</strong></li>
                      <li>Confirm with your bKash PIN</li>
                    </>
                  )}
                </ol>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setPaymentType(null)}
                >
                  Back
                </Button>
                <Button
                  className="flex-1 bg-[#E2136E] hover:bg-[#E2136E]/90 text-white"
                  onClick={() => {
                    toast.success("Thank you! Please complete the payment via bKash. We'll confirm your order soon.");
                    setSelectedProduct(null);
                    setPaymentType(null);
                  }}
                >
                  I've Paid ✓
                </Button>
              </div>
            </motion.div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Store;
