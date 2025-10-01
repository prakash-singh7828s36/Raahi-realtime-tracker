import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Local components
import AuthLayout from "../components/AuthLayout";
import TabSelector from "../components/TabSelector";
import FormInput from "../components/FormInput";
import SubmitButton from "../components/SubmitButton";

// Icons
import { User, Phone, Lock, Mail } from "lucide-react";

const Login = () => {
  const [activeTab, setActiveTab] = useState("commuter");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Select identifier field depending on role
      let identifier = "";
      if (activeTab === "commuter") identifier = formData.username || formData.phone;
      if (activeTab === "driver") identifier = formData.username;
      if (activeTab === "admin") identifier = formData.email || formData.phone;

      const payload = {
        identifier: identifier.trim(),
        password: formData.password,
      };

      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Login failed");

      // Store token if needed
      localStorage.setItem("token", data.token);

      alert(`✅ Welcome back, ${data.user.username} (${data.user.role})!`);
      navigate("/");
    } catch (err) {
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const renderForm = () => {
    switch (activeTab) {
      case "commuter":
        return (
          <div className="form-slide-enter space-y-6">
            <FormInput
              id="username"
              label="Username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={(value) => updateFormData("username", value)}
              icon={<User className="h-4 w-4" />}
              required
            />
            <FormInput
              id="phone"
              label="Phone Number"
              type="tel"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={(value) => updateFormData("phone", value)}
              icon={<Phone className="h-4 w-4" />}
            />
            <FormInput
              id="password"
              label="Password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(value) => updateFormData("password", value)}
              icon={<Lock className="h-4 w-4" />}
              required
            />
          </div>
        );
      case "driver":
        return (
          <div className="form-slide-enter space-y-6">
            <FormInput
              id="username"
              label="Username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={(value) => updateFormData("username", value)}
              icon={<User className="h-4 w-4" />}
              required
            />
            <FormInput
              id="password"
              label="Password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(value) => updateFormData("password", value)}
              icon={<Lock className="h-4 w-4" />}
              required
            />
          </div>
        );
      case "admin":
        return (
          <div className="form-slide-enter space-y-6">
            <FormInput
              id="email"
              label="Email"
              type="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={(value) => updateFormData("email", value)}
              icon={<Mail className="h-4 w-4" />}
              required
            />
            <FormInput
              id="phone"
              label="Phone Number"
              type="tel"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={(value) => updateFormData("phone", value)}
              icon={<Phone className="h-4 w-4" />}
            />
            <FormInput
              id="password"
              label="Password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(value) => updateFormData("password", value)}
              icon={<Lock className="h-4 w-4" />}
              required
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <AuthLayout title="Welcome Back">
      <form onSubmit={handleSubmit}>
        <TabSelector activeTab={activeTab} onTabChange={setActiveTab} />
        {renderForm()}
        <div className="mt-8">
          <SubmitButton isLoading={isLoading}>
            Login as {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </SubmitButton>
        </div>
        <div className="mt-6 text-center">
          <Link
            to="/forgot-password"
            className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
          >
            Forgot Password?
          </Link>
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="text-primary hover:text-primary/80 transition-colors duration-200 font-medium"
            >
              Create one here
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;
