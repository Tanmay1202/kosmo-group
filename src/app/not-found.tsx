import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <span className="text-xs font-bold uppercase tracking-widest text-slate-400">404 Error</span>
      <h1 className="text-4xl sm:text-5xl font-black text-slate-900 mt-2 tracking-tight">Page Not Found</h1>
      <p className="mt-4 text-slate-600 max-w-md text-sm sm:text-base">
        The page you are looking for does not exist or may have been moved within our network.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white text-sm font-bold shadow hover:bg-slate-800 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Homepage</span>
      </Link>
    </div>
  );
}
