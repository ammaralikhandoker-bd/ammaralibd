import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, ShoppingBag, Eye, Package } from "lucide-react";
import { motion } from "framer-motion";

interface Stats {
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
  totalViews: number;
  recentUsers: { display_name: string | null; created_at: string }[];
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalViews: 0,
    recentUsers: [],
  });

  useEffect(() => {
    const fetchStats = async () => {
      const [profilesRes, productsRes, ordersRes, viewsRes, recentRes] = await Promise.all([
        supabase.from("profiles").select("id", { count: "exact", head: true }),
        supabase.from("products").select("id", { count: "exact", head: true }),
        supabase.from("orders").select("id", { count: "exact", head: true }),
        supabase.from("page_views").select("id", { count: "exact", head: true }),
        supabase.from("profiles").select("display_name, created_at").order("created_at", { ascending: false }).limit(5),
      ]);
      setStats({
        totalUsers: profilesRes.count || 0,
        totalProducts: productsRes.count || 0,
        totalOrders: ordersRes.count || 0,
        totalViews: viewsRes.count || 0,
        recentUsers: recentRes.data || [],
      });
    };
    fetchStats();
  }, []);

  const cards = [
    { label: "Total Users", value: stats.totalUsers, icon: Users, color: "text-blue-400" },
    { label: "Total Products", value: stats.totalProducts, icon: ShoppingBag, color: "text-emerald-400" },
    { label: "Total Orders", value: stats.totalOrders, icon: Package, color: "text-amber-400" },
    { label: "Page Views", value: stats.totalViews, icon: Eye, color: "text-purple-400" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="border-border/50 bg-card/60">
              <CardContent className="p-4 flex items-center gap-4">
                <div className={`p-3 rounded-xl bg-muted ${card.color}`}>
                  <card.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{card.value}</p>
                  <p className="text-xs text-muted-foreground">{card.label}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="border-border/50 bg-card/60">
        <CardHeader>
          <CardTitle className="font-display text-base">Recent Signups</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {stats.recentUsers.length === 0 ? (
            <p className="text-muted-foreground text-sm">No users yet.</p>
          ) : (
            stats.recentUsers.map((u, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <span>{u.display_name || "Unknown"}</span>
                <span className="text-muted-foreground text-xs">
                  {new Date(u.created_at).toLocaleDateString()}
                </span>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
