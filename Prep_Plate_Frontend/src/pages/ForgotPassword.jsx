import React, { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPassword, verifyOTP, resetPasswordWithOTP } from "../server/API";
import { FiEye, FiEyeOff } from "react-icons/fi";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      await forgotPassword(email);
      setSuccess("OTP sent to your email.");
      setStep(2);
    } catch (err) {
      setError(err.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      await verifyOTP(email, otp);
      setSuccess("OTP verified. Please set your new password.");
      setStep(3);
    } catch (err) {
      setError(err.message || "Invalid or expired OTP");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      await resetPasswordWithOTP(email, otp, password);
      setSuccess("Password reset successfully. You can now login.");
      setStep(4);
    } catch (err) {
      setError(err.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl border border-green-100 p-10 flex flex-col items-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-6 text-green-700 text-center">Forgot Password</h1>
        {error && <div className="mb-4 text-red-600 font-semibold">{error}</div>}
        {success && <div className="mb-4 text-green-600 font-semibold">{success}</div>}
        {step === 1 && (
          <form className="space-y-6 w-full max-w-md mx-auto" onSubmit={handleEmailSubmit}>
            <div>
              <label className="block text-base font-medium mb-2">Email address</label>
              <input type="email" placeholder="Email address" className="w-full border rounded px-4 py-3 focus:ring-2 focus:ring-green-200 text-lg" value={email} onChange={e => setEmail(e.target.value)} required disabled={loading} />
            </div>
            <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold text-lg shadow hover:bg-green-700 transition" disabled={loading}>{loading ? "Sending..." : "Send OTP"}</button>
          </form>
        )}
        {step === 2 && (
          <form className="space-y-6 w-full max-w-md mx-auto" onSubmit={handleOtpSubmit}>
            <div>
              <label className="block text-base font-medium mb-2">Enter OTP sent to your email</label>
              <input type="text" placeholder="Enter OTP" className="w-full border rounded px-4 py-3 focus:ring-2 focus:ring-green-200 text-lg" value={otp} onChange={e => setOtp(e.target.value)} required disabled={loading} />
            </div>
            <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold text-lg shadow hover:bg-green-700 transition" disabled={loading}>{loading ? "Verifying..." : "Verify OTP"}</button>
          </form>
        )}
        {step === 3 && (
          <form className="space-y-6 w-full max-w-md mx-auto" onSubmit={handlePasswordSubmit}>
            <div>
              <label className="block text-base font-medium mb-2">New Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="New Password"
                  className="w-full border rounded px-4 py-3 focus:ring-2 focus:ring-green-200 text-lg"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword(v => !v)}
                  tabIndex={-1}
                >
                  {showPassword ? <FiEye /> : <FiEyeOff />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-base font-medium mb-2">Confirm New Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm New Password"
                  className="w-full border rounded px-4 py-3 focus:ring-2 focus:ring-green-200 text-lg"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  onClick={() => setShowConfirmPassword(v => !v)}
                  tabIndex={-1}
                >
                  {showConfirmPassword ? <FiEye /> : <FiEyeOff />}
                </button>
              </div>
            </div>
            <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold text-lg shadow hover:bg-green-700 transition" disabled={loading}>{loading ? "Resetting..." : "Reset Password"}</button>
          </form>
        )}
        {step === 4 && (
          <div className="mb-8 text-green-700 text-center font-semibold bg-green-50 border border-green-200 rounded-xl py-8 px-6 text-lg sm:text-xl leading-relaxed">
            Your password has been reset successfully. You can now <Link to="/login" className="underline text-green-800">login</Link> with your new password.
          </div>
        )}
        <div className="text-center text-base text-gray-500 mt-8">
          <Link to="/login" className="text-green-600 font-semibold hover:underline">Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword; 