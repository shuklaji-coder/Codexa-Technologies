"use client";

import { useState } from "react";
import confetti from "canvas-confetti";
import {
  X,
  Star,
  Sparkles,
  CheckCircle2,
  Send,
  Building2,
  Briefcase,
  User,
  MessageSquareQuote,
  Layers,
  Phone,
  Mail,
} from "lucide-react";
import { sounds } from "@/utils/soundEffects";
import { TestimonialItem } from "@/data/agencyData";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReviewAdded?: (newReview: TestimonialItem) => void;
}

export default function ReviewModal({
  isOpen,
  onClose,
  onReviewAdded,
}: ReviewModalProps) {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [projectType, setProjectType] = useState("");
  const [reviewContent, setReviewContent] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!fullName.trim()) {
      setErrorMsg("Please enter your name.");
      return;
    }
    if (!company.trim()) {
      setErrorMsg("Please enter your company or platform name.");
      return;
    }
    if (!reviewContent.trim()) {
      setErrorMsg("Please write a few words about your experience.");
      return;
    }

    setIsSubmitting(true);
    try {
      sounds.playClick();

      // Dispatch to Brevo email notification route
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fullName,
          email: email || "review-client@techlifa.in",
          phone: phone || "Not specified",
          company,
          role: role || "Founder / Partner",
          rating,
          service: projectType || "Custom Software & Web Engineering",
          message: reviewContent,
          source: "Client Review Submission",
        }),
      });

      // Construct verified testimonial item to inject into the live view
      const newReviewItem: TestimonialItem = {
        id: `rev-${Date.now()}`,
        name: fullName,
        role: role || "Leadership Team",
        company,
        avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop`,
        rating,
        content: reviewContent,
        projectType: projectType || "Full-Stack Engineering",
      };

      if (onReviewAdded) {
        onReviewAdded(newReviewItem);
      }

      setSubmitted(true);
      sounds.playSuccess();

      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#8B6CFF", "#00F5FF", "#6C4CF5", "#FFFFFF"],
        });
      } catch {}
    } catch (err) {
      console.error(err);
      setErrorMsg("Network error. Please try again or send via WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setFullName("");
    setRole("");
    setCompany("");
    setProjectType("");
    setReviewContent("");
    setPhone("");
    setEmail("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Dark backdrop */}
      <div
        onClick={handleResetAndClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-xl rounded-3xl bg-[#090914] border border-violet-500/30 shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden z-10 text-white my-auto max-h-[92vh] flex flex-col">
        {/* Glow accent */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#6C4CF5] via-[#00F5FF] to-[#8B6CFF]" />

        {/* Modal Header */}
        <div className="p-5 sm:p-6 pb-4 border-b border-white/[0.08] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-violet-600/20 border border-violet-500/40 flex items-center justify-center text-[#8B6CFF] shadow-[0_0_15px_rgba(139,108,255,0.3)]">
              <MessageSquareQuote className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <span>Submit Client Review</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  Verified Partner
                </span>
              </h3>
              <p className="text-xs text-zinc-400 font-mono mt-0.5">
                Share your build experience with Techlifa Technologies
              </p>
            </div>
          </div>

          <button
            onClick={handleResetAndClose}
            className="w-9 h-9 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-5">
          {submitted ? (
            <div className="text-center py-8 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto text-emerald-400 shadow-[0_0_30px_rgba(52,211,153,0.4)]">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h4 className="font-heading text-2xl font-bold text-white mb-2">
                  Thank You, {fullName}!
                </h4>
                <p className="text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
                  Your client endorsement has been submitted successfully and added to our showcase. Our leadership team has been notified.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-left max-w-md mx-auto space-y-1 text-xs font-mono text-zinc-300">
                <div className="flex items-center gap-1 text-amber-400 mb-1">
                  {[...Array(rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <div className="font-bold text-white">{company}</div>
                <div className="text-zinc-400 italic">&ldquo;{reviewContent}&rdquo;</div>
              </div>

              <button
                onClick={handleResetAndClose}
                className="violet-glow-btn px-8 py-3 rounded-xl font-heading text-xs uppercase tracking-wider font-semibold text-white cursor-pointer"
              >
                Close & View on Website
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Star Rating Selector */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                  Your Overall Rating
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => {
                        setRating(star);
                        sounds.playClick();
                      }}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 rounded-lg transition-transform hover:scale-125 focus:outline-none cursor-pointer"
                    >
                      <Star
                        className={`w-7 h-7 sm:w-8 sm:h-8 transition-colors ${
                          (hoverRating || rating) >= star
                            ? "fill-amber-400 text-amber-400"
                            : "text-zinc-600 fill-zinc-900"
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-mono font-bold text-amber-400 ml-2">
                    {rating}.0 / 5.0
                  </span>
                </div>
              </div>

              {/* Name & Role Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#8B6CFF]" />
                    <span>Your Full Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Rajesh Kannan"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:border-violet-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-[#8B6CFF]" />
                    <span>Your Designation / Role</span>
                  </label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g. Co-Founder & CTO"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:border-violet-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Company & Project Type Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-[#8B6CFF]" />
                    <span>Company / Startup & City *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. LogixFleet Networks (Chennai)"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:border-violet-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#8B6CFF]" />
                    <span>Project Built</span>
                  </label>
                  <input
                    type="text"
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    placeholder="e.g. Mobile & IoT Platform"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:border-violet-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Review Text */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5 flex items-center gap-1.5">
                  <MessageSquareQuote className="w-3.5 h-3.5 text-[#8B6CFF]" />
                  <span>Your Review & Feedback *</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={reviewContent}
                  onChange={(e) => setReviewContent(e.target.value)}
                  placeholder="Share details about engineering speed, code quality, communication, and results achieved with Techlifa..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:border-violet-500 focus:outline-none transition-colors resize-none leading-relaxed"
                />
              </div>

              {/* Optional Phone / Email for Verification */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 mb-1 flex items-center gap-1">
                    <Phone className="w-3 h-3 text-zinc-500" />
                    <span>Phone / WhatsApp (Optional)</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-xs focus:border-violet-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 mb-1 flex items-center gap-1">
                    <Mail className="w-3 h-3 text-zinc-500" />
                    <span>Email Address (Optional)</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="rajesh@company.com"
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-xs focus:border-violet-500 focus:outline-none"
                  />
                </div>
              </div>

              {errorMsg && (
                <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs font-mono">
                  {errorMsg}
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full violet-glow-btn py-3.5 rounded-xl font-heading text-xs sm:text-sm uppercase tracking-wider font-semibold text-white flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_25px_rgba(108,76,245,0.4)] disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Submitting Review...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Post Verified Client Review</span>
                    </>
                  )}
                </button>
                <p className="text-[10px] font-mono text-zinc-400 text-center mt-2.5">
                  🛡️ All endorsements are verified against project repositories before permanent sync.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

