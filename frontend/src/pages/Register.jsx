import React, { useState } from 'react';
import Navigation from "../components/Navigation";
import { Link, useNavigate } from 'react-router-dom';

// local components
import AuthLayout from '../components/AuthLayout';
import TabSelector from '../components/TabSelector';
import FormInput from '../components/FormInput';
import SubmitButton from '../components/SubmitButton';

// icons
import { User, Phone, Lock, Bus, Mail, CreditCard } from 'lucide-react';

const Register = () => {
  const [activeTab, setActiveTab] = useState('commuter');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    phone: '',
    password: '',
    busNumber: '',
    adminNumber: '',
    email: ''
  });

  const navigate = useNavigate();

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const response = await fetch("http://localhost:3000/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ ...formData, role: activeTab }),
    });

    let data;
    try {
      data = await response.json();
    } catch {
      alert("Server error: could not read response");
      return;
    }

    if (!response.ok) {
      alert(data.error || "Registration failed");
      return;
    }

    localStorage.setItem("token", data.token);
    navigate("/login");

  } catch (err) {
    console.error("❌ Network/server error:", err);
    alert("Something went wrong. Please try again.");
  } finally {
    setIsLoading(false);
  }
};

  const renderForm = () => {
    switch (activeTab) {
      case 'commuter':
        return (
          <div className="form-slide-enter space-y-6">
            <FormInput
              id="username"
              label="Username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={(value) => updateFormData('username', value)}
              icon={<User className="h-4 w-4" />}
              required
            />
            <FormInput
              id="phone"
              label="Phone Number"
              type="tel"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={(value) => updateFormData('phone', value)}
              icon={<Phone className="h-4 w-4" />}
              required
            />
            <FormInput
              id="password"
              label="Password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(value) => updateFormData('password', value)}
              icon={<Lock className="h-4 w-4" />}
              required
            />
          </div>
        );

      case 'driver':
        return (
          <div className="form-slide-enter space-y-6">
            <FormInput
              id="username"
              label="Username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={(value) => updateFormData('username', value)}
              icon={<User className="h-4 w-4" />}
              required
            />
            <FormInput
              id="busNumber"
              label="Bus Number"
              placeholder="Enter your bus number"
              value={formData.busNumber}
              onChange={(value) => updateFormData('busNumber', value)}
              icon={<Bus className="h-4 w-4" />}
              required
            />
            <FormInput
              id="phone"
              label="Phone Number"
              type="tel"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={(value) => updateFormData('phone', value)}
              icon={<Phone className="h-4 w-4" />}
              required
            />
            <FormInput
              id="password"
              label="Password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(value) => updateFormData('password', value)}
              icon={<Lock className="h-4 w-4" />}
              required
            />
          </div>
        );

      case 'admin':
        return (
          <div className="form-slide-enter space-y-6">
            <FormInput
              id="adminNumber"
              label="Admin Number"
              placeholder="Enter your admin ID"
              value={formData.adminNumber}
              onChange={(value) => updateFormData('adminNumber', value)}
              icon={<CreditCard className="h-4 w-4" />}
              required
            />
            <FormInput
              id="email"
              label="Email"
              type="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={(value) => updateFormData('email', value)}
              icon={<Mail className="h-4 w-4" />}
              required
            />
            <FormInput
              id="password"
              label="Password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(value) => updateFormData('password', value)}
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
    <AuthLayout title="Create Account">
      <form onSubmit={handleSubmit}>
        <TabSelector activeTab={activeTab} onTabChange={setActiveTab} />

        {renderForm()}

        <div className="mt-8">
          <SubmitButton isLoading={isLoading}>
            Create {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Account
          </SubmitButton>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-primary hover:text-primary/80 transition-colors duration-200 font-medium"
            >
              Login here
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Register;
