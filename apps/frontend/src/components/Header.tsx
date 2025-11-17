import { Button } from "@/components/ui/button";
import { Github, FileText, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "@/components/Logo";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="group">
            <Logo showWordmark size="md" variant="accent" className="transition-opacity group-hover:opacity-80" />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <a href="/#features" className="text-sm font-medium text-[#0D232D] hover:text-[#0A1B24] transition-colors">
              Vision
            </a>
            <a href="/#how-it-works" className="text-sm font-medium text-[#0D232D] hover:text-[#0A1B24] transition-colors">
              Why Georgia
            </a>
            <Link to="/issuer-workflow" className="text-sm font-medium text-[#0D232D] hover:text-[#0A1B24] transition-colors">
              Issuer Demo
            </Link>
            <Link to="/resources" className="text-sm font-medium text-[#0D232D] hover:text-[#0A1B24] transition-colors">
              Research
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild className="text-[#0D232D] hover:text-[#0A1B24] hover:bg-neutral-100">
              <Link to="/resources">
                <BookOpen className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Research</span>
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild className="text-[#0D232D] hover:text-[#0A1B24] hover:bg-neutral-100">
              <a href="https://github.com/duracell04/KBB_MVP" target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">GitHub</span>
              </a>
            </Button>
            <Button size="sm" variant="default" asChild className="bg-[#0D232D] text-white hover:bg-[#0A1B24]">
              <Link to="/documentation">
                <FileText className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Docs</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
