export default function Footer() {
  return (
    <footer className="border-t border-[#E5E7EB] bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 text-xs text-slate-500">
        <span>© {new Date().getFullYear()} Smart Timetable</span>
        <span>For educational institutes and teachers</span>
      </div>
    </footer>
  );
}
