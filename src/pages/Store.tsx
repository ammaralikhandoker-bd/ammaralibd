import { useEffect, useState } from "react";
import { usePageView } from "@/hooks/usePageView";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, ShoppingBag, MessageCircle, Phone, Copy, CheckCircle2, SendHorizonal, ArrowDownToLine, Shield, KeyRound, Sparkles, Star } from "lucide-react";
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

const Store = () => {
  usePageView("store");
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [paymentType, setPaymentType] = useState<"send" | "cashout" | null>(null);
  const [copied, setCopied] = useState(false);
  const [passwordDialog, setPasswordDialog] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);
  const [trxId, setTrxId] = useState("");
  const [submittingOrder, setSubmittingOrder] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
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

  const handlePasswordChange = async () => {
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setChangingPassword(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) toast.error(error.message);
    else {
      toast.success("Password changed successfully!");
      setPasswordDialog(false);
      setNewPassword("");
      setConfirmPassword("");
    }
    setChangingPassword(false);
  };

  const handleBuyClick = (product: Product) => {
    setSelectedProduct(product);
    setPaymentType(null);
    setTrxId("");
  };

  const categories = [...new Set(products.map((p) => p.category).filter(Boolean))];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background ambient effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/[0.03] blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-accent/[0.03] blur-[100px]" />
      </div>

      {/* Nav */}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="sticky top-0 z-50 bg-glass border-b border-border"
      >
        <div className="container mx-auto flex items-center justify-between py-4 px-4">
          <a href="/" className="font-display text-xl font-bold tracking-tight group">
            AMMAR <span className="text-gradient-gold group-hover:opacity-80 transition-opacity">ALI</span>
          </a>
          <div className="flex items-center gap-2 sm:gap-4">
            <span className="text-sm text-muted-foreground hidden sm:block truncate max-w-[180px]">
              {user?.email}
            </span>
            {isAdmin && (
              <Button variant="outline" size="sm" onClick={() => navigate("/admin")} className="border-primary/30 hover:glow-gold transition-shadow">
                <Shield className="w-4 h-4 mr-1.5" /> Admin
              </Button>
            )}
            <Button variant="ghost" size="icon" onClick={() => setPasswordDialog(true)} title="Change Password" className="hover:bg-primary/10">
              <KeyRound className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="hover:bg-destructive/10 hover:text-destructive">
              <LogOut className="w-4 h-4 mr-1.5" /> <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </motion.nav>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Hero section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium mb-6"
          >
            <Sparkles className="w-4 h-4" /> Digital Store
          </motion.span>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-5 leading-tight">
            Premium <span className="text-gradient-gold">Services</span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Explore professional digital products & services tailored for your business growth
          </p>

          {categories.length > 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center gap-2 mt-8 flex-wrap"
            >
              {categories.map((cat) => (
                <span
                  key={cat}
                  className="px-3 py-1.5 rounded-full border border-border bg-secondary/50 text-secondary-foreground text-xs font-medium"
                >
                  {cat}
                </span>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* Products */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-2xl border border-border/50 bg-card/40 animate-pulse h-[380px]" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-24"
          >
            <div className="w-24 h-24 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-10 h-10 text-muted-foreground/40" />
            </div>
            <h3 className="font-display text-2xl font-semibold text-muted-foreground mb-3">
              Coming Soon
            </h3>
            <p className="text-muted-foreground/70 mb-8 max-w-sm mx-auto">
              We're preparing something amazing. Products will be available here shortly.
            </p>
            <Button asChild variant="outline" size="lg" className="border-primary/30 hover:bg-primary/10 hover:glow-gold transition-all">
              <a href="/#contact">
                <MessageCircle className="w-4 h-4 mr-2" /> Contact for Custom Services
              </a>
            </Button>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {products.map((product) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                onHoverStart={() => setHoveredProduct(product.id)}
                onHoverEnd={() => setHoveredProduct(null)}
                className="relative"
              >
                <Card className="border-border/40 bg-card/50 hover:border-primary/40 transition-all duration-500 group overflow-hidden rounded-2xl hover:shadow-[var(--shadow-gold)]">
                  {product.image_url ? (
                    <div className="aspect-[4/3] overflow-hidden relative">
                      <motion.img
                        src={product.image_url}
                        alt={product.title}
                        className="w-full h-full object-cover"
                        animate={{
                          scale: hoveredProduct === product.id ? 1.08 : 1,
                        }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />
                      {product.category && (
                        <span className="absolute top-4 left-4 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm text-primary border border-primary/20">
                          {product.category}
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className="aspect-[4/3] bg-gradient-to-br from-muted to-secondary flex items-center justify-center relative">
                      <ShoppingBag className="w-12 h-12 text-muted-foreground/20" />
                      {product.category && (
                        <span className="absolute top-4 left-4 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm text-primary border border-primary/20">
                          {product.category}
                        </span>
                      )}
                    </div>
                  )}
                  <CardContent className="p-6 space-y-4">
                    <div>
                      <h3 className="font-display text-xl font-bold group-hover:text-primary transition-colors duration-300">
                        {product.title}
                      </h3>
                      {product.description && (
                        <p className="text-sm text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
                          {product.description}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-border/50">
                      <div className="flex items-baseline gap-1">
                        <span className="font-display text-2xl font-bold text-gradient-gold">
                          ৳{product.price}
                        </span>
                      </div>
                      <Button
                        size="sm"
                        className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl px-5 hover:shadow-[var(--shadow-gold)] transition-all duration-300"
                        onClick={() => handleBuyClick(product)}
                      >
                        <Star className="w-3.5 h-3.5 mr-1.5" /> Buy Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
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

          <AnimatePresence mode="wait">
            {!paymentType ? (
              <motion.div
                key="methods"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-3 py-2"
              >
                <p className="text-sm text-muted-foreground mb-4">Select payment method:</p>
                <button
                  onClick={() => setPaymentType("send")}
                  className="w-full flex items-center gap-4 p-4 rounded-xl border border-border hover:border-[#E2136E]/50 hover:bg-[#E2136E]/5 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#E2136E]/10 flex items-center justify-center group-hover:bg-[#E2136E]/20 group-hover:scale-110 transition-all duration-300">
                    <SendHorizonal className="w-5 h-5 text-[#E2136E]" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-foreground">Send Money</p>
                    <p className="text-xs text-muted-foreground">Send money from your bKash app</p>
                  </div>
                </button>
                <button
                  onClick={() => setPaymentType("cashout")}
                  className="w-full flex items-center gap-4 p-4 rounded-xl border border-border hover:border-[#E2136E]/50 hover:bg-[#E2136E]/5 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#E2136E]/10 flex items-center justify-center group-hover:bg-[#E2136E]/20 group-hover:scale-110 transition-all duration-300">
                    <ArrowDownToLine className="w-5 h-5 text-[#E2136E]" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-foreground">Cash Out</p>
                    <p className="text-xs text-muted-foreground">Cash out to this number</p>
                  </div>
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="details"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
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
                      <><CheckCircle2 className="w-4 h-4 mr-2 text-emerald-500" /> Copied!</>
                    ) : (
                      <><Copy className="w-4 h-4 mr-2" /> Copy Number</>
                    )}
                  </Button>
                </div>

                <div className="bg-muted/50 rounded-xl p-4 space-y-2">
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

                {paymentType === "send" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="space-y-2"
                  >
                    <Label>bKash Transaction ID (TrxID)</Label>
                    <Input
                      value={trxId}
                      onChange={(e) => setTrxId(e.target.value)}
                      placeholder="e.g. TrxID: BI70XXXXX"
                    />
                  </motion.div>
                )}

                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1" onClick={() => setPaymentType(null)}>
                    Back
                  </Button>
                  {paymentType === "send" ? (
                    <Button
                      className="flex-1 bg-[#E2136E] hover:bg-[#E2136E]/90 text-white"
                      disabled={!trxId.trim() || submittingOrder}
                      onClick={async () => {
                        if (!trxId.trim()) { toast.error("TrxID দাও"); return; }
                        if (!selectedProduct || !user) return;
                        setSubmittingOrder(true);
                        const { error } = await supabase.from("orders").insert({
                          user_id: user.id,
                          product_id: selectedProduct.id,
                          product_title: selectedProduct.title,
                          amount: selectedProduct.price,
                          payment_method: `bKash Send Money - TrxID: ${trxId.trim()}`,
                          status: "pending",
                        });
                        if (error) toast.error(error.message);
                        else {
                          toast.success("Order submitted! আমরা verify করে confirm করবো।");
                          setSelectedProduct(null);
                          setPaymentType(null);
                          setTrxId("");
                        }
                        setSubmittingOrder(false);
                      }}
                    >
                      {submittingOrder ? "Submitting..." : "Submit Order ✓"}
                    </Button>
                  ) : (
                    <Button
                      className="flex-1 bg-[#E2136E] hover:bg-[#E2136E]/90 text-white"
                      onClick={() => {
                        toast.success("Thank you! Please complete the payment via bKash.");
                        setSelectedProduct(null);
                        setPaymentType(null);
                      }}
                    >
                      I've Paid ✓
                    </Button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>

      {/* Password Change Dialog */}
      <Dialog open={passwordDialog} onOpenChange={(open) => { if (!open) { setPasswordDialog(false); setNewPassword(""); setConfirmPassword(""); } }}>
        <DialogContent className="sm:max-w-sm border-border bg-card">
          <DialogHeader>
            <DialogTitle className="font-display flex items-center gap-2">
              <KeyRound className="w-5 h-5 text-primary" /> Change Password
            </DialogTitle>
            <DialogDescription>Enter your new password below.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>New Password</Label>
              <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="••••••••" minLength={6} />
            </div>
            <div className="space-y-2">
              <Label>Confirm Password</Label>
              <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" />
            </div>
            <Button className="w-full bg-primary text-primary-foreground" onClick={handlePasswordChange} disabled={changingPassword}>
              {changingPassword ? "Changing..." : "Change Password"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Store;
