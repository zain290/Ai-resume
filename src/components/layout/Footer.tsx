export function Footer() {
  return (
    <footer className="border-t border-slate-200 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-6 text-center text-[#64748b] text-sm">
        &copy; {new Date().getFullYear()} ResumeAnalyzer. All rights reserved.
      </div>
    </footer>
  )
}
