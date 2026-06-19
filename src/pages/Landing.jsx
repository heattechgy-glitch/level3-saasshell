import { useNavigate } from "react-router-dom";
import { Zap, Shield, Sparkles, Check, ArrowRight } from "lucide-react";

export default function Landing() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Built on modern infrastructure for instant response times and seamless performance."
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level encryption and compliance standards to keep your data safe and secure."
    },
    {
      icon: Sparkles,
      title: "AI-Powered",
      description: "Advanced AI capabilities that adapt to your workflow and boost productivity."
    }
  ];

  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started",
      features: [
        "Up to 3 projects",
        "Basic analytics",
        "Community support",
        "1GB storage"
      ],
      cta: "Get Started",
      highlighted: false
    },
    {
      name: "Pro",
      price: "$29",
      period: "per month",
      description: "For professionals and teams",
      features: [
        "Unlimited projects",
        "Advanced analytics",
        "Priority support",
        "50GB storage",
        "Custom integrations",
        "API access"
      ],
      cta: "Start Free Trial",
      highlighted: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "contact us",
      description: "For large organizations",
      features: [
        "Everything in Pro",
        "Dedicated account manager",
        "Custom SLA",
        "Unlimited storage",
        "Advanced security",
        "On-premise deployment"
      ],
      cta: "Contact Sales",
      highlighted: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Navigation */}
      <nav className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
            SaaSShell
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 text-slate-300 hover:text-white transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-2 bg-sky-500 hover:bg-sky-600 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-24 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-sm font-medium mb-8">
          <Sparkles className="w-4 h-4" />
          <span>Now with AI-powered features</span>
        </div>
        
        <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-sky-200 to-sky-400 bg-clip-text text-transparent leading-tight">
          Build Something
          <br />
          Amazing Today
        </h1>
        
        <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          The modern platform for teams who ship fast. Deploy in seconds, scale to millions, and focus on what matters.
        </p>

        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => navigate("/login")}
            className="px-8 py-4 bg-sky-500 hover:bg-sky-600 rounded-lg font-semibold text-lg transition-all hover:scale-105 flex items-center gap-2"
          >
            Start Building Free
            <ArrowRight className="w-5 h-5" />
          </button>
          <button className="px-8 py-4 border border-slate-700 hover:border-slate-600 rounded-lg font-semibold text-lg transition-colors">
            View Demo
          </button>
        </div>

        {/* Hero Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mt-24 pt-12 border-t border-slate-800">
          <div>
            <div className="text-4xl font-bold text-sky-400 mb-2">99.9%</div>
            <div className="text-slate-400">Uptime SLA</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-sky-400 mb-2">50k+</div>
            <div className="text-slate-400">Active Users</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-sky-400 mb-2">150+</div>
            <div className="text-slate-400">Countries</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Everything you need to succeed</h2>
          <p className="text-xl text-slate-400">Powerful features designed for modern teams</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 hover:border-sky-500/50 transition-all hover:scale-105"
              >
                <div className="w-14 h-14 rounded-xl bg-sky-500/10 flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-sky-400" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Simple, transparent pricing</h2>
          <p className="text-xl text-slate-400">Choose the plan that fits your needs</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`p-8 rounded-2xl border transition-all ${
                plan.highlighted
                  ? "bg-gradient-to-br from-sky-500/10 to-blue-500/10 border-sky-500 scale-105 shadow-2xl shadow-sky-500/20"
                  : "bg-slate-900 border-slate-800 hover:border-slate-700"
              }`}
            >
              {plan.highlighted && (
                <div className="inline-block px-3 py-1 rounded-full bg-sky-500 text-white text-sm font-semibold mb-4">
                  Most Popular
                </div>
              )}
              
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-slate-400 mb-6">{plan.description}</p>
              
              <div className="mb-6">
                <span className="text-5xl font-bold">{plan.price}</span>
                <span className="text-slate-400 ml-2">/ {plan.period}</span>
              </div>

              <button
                onClick={() => navigate("/login")}
                className={`w-full py-3 rounded-lg font-semibold mb-8 transition-all ${
                  plan.highlighted
                    ? "bg-sky-500 hover:bg-sky-600"
                    : "bg-slate-800 hover:bg-slate-700"
                }`}
              >
                {plan.cta}
              </button>

              <ul className="space-y-3">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${plan.highlighted ? "text-sky-400" : "text-slate-500"}`} />
                    <span className="text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="rounded-3xl bg-gradient-to-r from-sky-500 to-blue-600 p-12 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-xl text-sky-100 mb-8 max-w-2xl mx-auto">
            Join thousands of teams already building the future with SaaSShell
          </p>
          <button
            onClick={() => navigate("/login")}
            className="px-8 py-4 bg-white text-sky-600 hover:bg-slate-100 rounded-lg font-semibold text-lg transition-all hover:scale-105 inline-flex items-center gap-2"
          >
            Start Building Now
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-xl font-bold bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent mb-4">
                SaaSShell
              </div>
              <p className="text-slate-400 text-sm">
                Building the future of SaaS platforms, one feature at a time.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Compliance</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
            © 2024 SaaSShell. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Landing;