export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto py-8">
      <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-blue rounded flex items-center justify-center text-white text-xs font-black">A</div>
          <span className="font-semibold text-gray-700">ArnaqueScan</span>
          <span>— Protégez-vous des arnaques</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="/mentions-legales" className="hover:text-blue transition-colors">Confidentialité</a>
          <a href="/cgu" className="hover:text-blue transition-colors">CGU</a>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
