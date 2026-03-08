import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "@/hooks/useAdmin";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { ArrowLeft, Shield, Loader2, LayoutDashboard, ShoppingBag, Users, Package } from "lucide-react";
import { toast } from "sonner";
import AdminDashboard from "@/components/admin/AdminDashboard";
import AdminProducts from "@/components/admin/AdminProducts";
import AdminUsers from "@/components/admin/AdminUsers";
import AdminOrders from "@/components/admin/AdminOrders";

const Admin = () => {
  const navigate = useNavigate();
  const { isAdmin, loading: roleLoading } = useAdmin();

  useEffect(() => {
    if (!roleLoading && !isAdmin) {
      toast.error("Access denied");
      navigate("/store");
    }
  }, [isAdmin, roleLoading, navigate]);

  if (roleLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 bg-glass border-b border-border">
        <div className="container mx-auto flex items-center justify-between py-4 px-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate("/store")}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              <span className="font-display text-lg font-bold">Admin Panel</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Tabs defaultValue="dashboard" className="space-y-6">
            <TabsList className="bg-muted/50 border border-border">
              <TabsTrigger value="dashboard" className="gap-1.5 text-xs sm:text-sm">
                <LayoutDashboard className="w-4 h-4" /> <span className="hidden sm:inline">Dashboard</span>
              </TabsTrigger>
              <TabsTrigger value="products" className="gap-1.5 text-xs sm:text-sm">
                <ShoppingBag className="w-4 h-4" /> <span className="hidden sm:inline">Products</span>
              </TabsTrigger>
              <TabsTrigger value="users" className="gap-1.5 text-xs sm:text-sm">
                <Users className="w-4 h-4" /> <span className="hidden sm:inline">Users</span>
              </TabsTrigger>
              <TabsTrigger value="orders" className="gap-1.5 text-xs sm:text-sm">
                <Package className="w-4 h-4" /> <span className="hidden sm:inline">Orders</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard"><AdminDashboard /></TabsContent>
            <TabsContent value="products"><AdminProducts /></TabsContent>
            <TabsContent value="users"><AdminUsers /></TabsContent>
            <TabsContent value="orders"><AdminOrders /></TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default Admin;
