import { supabase } from "@/lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Activity, TrendingUp, Users, DollarSign, Plus, FileText, Settings, LogOut } from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
    fetchActivities();
  }, []);

  async function checkUser() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate("/login");
      return;
    }
    setUser(user);
  }

  async function fetchActivities() {
    try {
      const { data, error } = await supabase
        .from("activity_log")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(10);

      if (error) throw error;
      setActivities(data || []);
    } catch (err) {
      console.error("Error fetching activities:", err);
      setActivities([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/login");
  }

  const stats = [
    {
      title: "Total Revenue",
      value: "$12,345",
      change: "+12.5%",
      icon: DollarSign,
      color: "text-green-400"
    },
    {
      title: "Active Users",
      value: "1,234",
      change: "+8.2%",
      icon: Users,
      color: "text-blue-400"
    },
    {
      title: "Growth Rate",
      value: "23.5%",
      change: "+3.1%",
      icon: TrendingUp,
      color: "text-purple-400"
    },
    {
      title: "Activities",
      value: activities.length.toString(),
      change: "Total",
      icon: Activity,
      color: "text-orange-400"
    }
  ];

  const quickActions = [
    {
      title: "Add Expense",
      icon: Plus,
      path: "/add-expense",
      color: "bg-blue-600 hover:bg-blue-700"
    },
    {
      title: "View Reports",
      icon: FileText,
      path: "/reports",
      color: "bg-purple-600 hover:bg-purple-700"
    },
    {
      title: "Settings",
      icon: Settings,
      path: "/settings",
      color: "bg-gray-600 hover:bg-gray-700"
    }
  ];

  function formatActivityDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
            <p className="text-gray-400">
              Welcome back, {user?.email || "User"}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
                <span className="text-sm text-green-400">{stat.change}</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
              <p className="text-sm text-gray-400">{stat.title}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-gray-900 border border-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-[#0ea5e9]" />
              Recent Activity
            </h2>
            <div className="space-y-3">
              {activities.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No recent activity
                </div>
              ) : (
                activities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 bg-gray-800 rounded-lg hover:bg-gray-750 transition-colors"
                  >
                    <div className="w-2 h-2 mt-2 rounded-full bg-[#0ea5e9] flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white break-words">
                        {activity.description || activity.action || "Activity"}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {activity.created_at ? formatActivityDate(activity.created_at) : "Unknown time"}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
            <div className="space-y-3">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => navigate(action.path)}
                  className={`w-full flex items-center gap-3 px-4 py-3 ${action.color} rounded-lg transition-colors text-left`}
                >
                  <action.icon className="w-5 h-5" />
                  <span className="font-medium">{action.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}