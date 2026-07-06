import React from "react";
import { MessageSquare, Mail, Phone, MapPin, ChevronRight } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-16 grid grid-cols-1 lg:grid-cols-2 gap-16 animate-fadeIn">
      
      {/* LEFT CONTENT BLOCK: BRAND CHANNELS COPYWRITING VIEW */}
      <div className="space-y-8">
        <div className="space-y-4">
          <span className="text-xs font-black uppercase tracking-widest text-brand-teal">Direct Concierge Pipelines</span>
          <h1 className="text-4xl sm:text-5xl font-black text-brand-navy tracking-tight">Initiate Communication Context</h1>
          <p className="text-brand-muted text-base font-medium leading-relaxed">
            Reach out via our active chat lines or email paths below. Our operations center keeps channels open around the clock to handle your reservation requirements.
          </p>
        </div>

        <div className="space-y-4 text-sm font-medium text-brand-navy">
          <div className="flex items-start space-x-3 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
            <MapPin className="h-5 w-5 text-brand-teal mt-0.5 flex-shrink-0" />
            <div>
              <span className="text-brand-muted block font-bold text-xs uppercase tracking-wider mb-0.5">Corporate Headquarters Office</span>
              <span className="font-bold">Hilite Business Park, Calicut, Kerala</span>
            </div>
          </div>

          <div className="flex items-start space-x-3 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
            <Phone className="h-5 w-5 text-brand-teal mt-0.5 flex-shrink-0" />
            <div>
              <span className="text-brand-muted block font-bold text-xs uppercase tracking-wider mb-0.5">Secondary Support Hotline Track</span>
              <span className="font-bold">+91 97782 50828 (Corporate Display Reference Only)</span>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
            <Mail className="h-5 w-5 text-brand-teal mt-0.5 flex-shrink-0" />
            <div>
              <span className="text-brand-muted block font-bold text-xs uppercase tracking-wider mb-0.5">Alternative Inbox Alias</span>
              <span className="font-bold">superstay.super@gmail.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT ACTION CORES: DYNAMIC INTERACTIVE TRIGGER PATH ACTIONS BUTTON MATRIX */}
      <div className="bg-white p-8 sm:p-10 rounded-3xl border border-gray-200 shadow-xl space-y-6 self-center">
        <h3 className="text-sm font-black uppercase tracking-widest text-brand-navy border-b border-gray-100 pb-3">
          Execute Instant Direct Actions
        </h3>

        {/* Real Functioning WhatsApp Click Intent Integration Action Link Button */}
        <div className="space-y-2">
          <span className="text-[11px] font-black uppercase tracking-wider text-brand-muted block">WhatsApp Operations Channel</span>
          <a
            href="https://wa.me/919526654118"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 px-6 rounded-xl transition-premium flex items-center justify-between uppercase tracking-widest text-xs shadow-md"
          >
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5" />
              <span>Contact on WhatsApp Live</span>
            </div>
            <ChevronRight className="h-4 w-4" />
          </a>
        </div>

        {/* Real Functioning Gmail Mailto Anchor Click Pre-filled Action Button Link */}
        <div className="space-y-2 pt-4 border-t border-gray-100">
          <span className="text-[11px] font-black uppercase tracking-wider text-brand-muted block">Direct Core Email Inbox</span>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=razik@supermelabs.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-brand-navy hover:bg-brand-teal text-white font-black py-4 px-6 rounded-xl transition-premium flex items-center justify-between uppercase tracking-widest text-xs shadow-md"
          >
            <div className="flex items-center space-x-2">
              <Mail className="h-5 w-5" />
              <span>Connect on Email (Pre-filled Gmail)</span>
            </div>
            <ChevronRight className="h-4 w-4" />
          </a>
        </div>
      </div>

    </div>
  );
}