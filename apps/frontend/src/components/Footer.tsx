import { Github, FileText, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "@/components/Logo";

const Footer = () => {
  return (
    <footer className="bg-[#0D232D] border-t border-[#0A1B24] py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <Logo showWordmark size="sm" variant="accent" />
            <p className="text-sm text-white/70 leading-relaxed max-w-xs">
              Token-registered · Cash-settled · Professional-only · Legal title in CSD
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-4 text-white text-sm">Product</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="/#features" className="text-white/70 hover:text-[#F59E0B] transition-colors">Vision</a></li>
              <li><a href="/#how-it-works" className="text-white/70 hover:text-[#F59E0B] transition-colors">Why Georgia</a></li>
              <li><a href="/#mechanism" className="text-white/70 hover:text-[#F59E0B] transition-colors">Mechanism</a></li>
              <li><a href="/#roadmap" className="text-white/70 hover:text-[#F59E0B] transition-colors">Roadmap</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4 text-white text-sm">Resources</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/resources" className="text-white/70 hover:text-[#F59E0B] transition-colors flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5" />
                  Research & Sources
                </Link>
              </li>
              <li>
                <a href="https://github.com/duracell04/KBB_MVP" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-[#F59E0B] transition-colors flex items-center gap-2">
                  <Github className="w-3.5 h-3.5" />
                  GitHub
                </a>
              </li>
              <li>
                <Link to="/documentation" className="text-white/70 hover:text-[#F59E0B] transition-colors flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5" />
                  Documentation
                </Link>
              </li>
              <li><Link to="/issuer-workflow" className="text-white/70 hover:text-[#F59E0B] transition-colors">Issuer Demo</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4 text-white text-sm">Standards</h4>
            <div className="flex flex-wrap gap-2">
              {["ERC-3643", "DvP", "ISO 20022", "Permissioned"].map((keyword) => (
                <span key={keyword} className="px-2 py-1 bg-white/10 text-white/80 text-xs rounded font-mono border border-white/20">
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/60">
            <p>© 2025 KBB · Open source under MIT License</p>
            <p>Infrastructure for professional private debt</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
