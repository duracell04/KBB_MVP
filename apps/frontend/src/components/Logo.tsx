import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "default" | "accent";
  size?: "sm" | "md" | "lg";
  showWordmark?: boolean;
  className?: string;
}

/**
 * KBB Logo - Georgian letter "ქ" (Q)
 * Simple, culturally rooted mark representing Kartvelian Business Bonds
 */
const Logo = ({ 
  variant = "default", 
  size = "md", 
  showWordmark = false,
  className 
}: LogoProps) => {
  const sizeMap = {
    sm: "text-3xl",
    md: "text-5xl",
    lg: "text-6xl"
  };
  
  const wordmarkSizeMap = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-xl"
  };
  
  const colors = {
    default: "text-[#0D232D]",
    accent: "text-[#D97706]"
  };
  
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {/* Georgian letter ქ */}
      <span 
        className={cn(
          "font-semibold leading-none",
          sizeMap[size],
          colors[variant]
        )}
        style={{
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Noto Sans Georgian', 'Sylfaen', sans-serif"
        }}
      >
        ქ
      </span>
      
      {/* Wordmark */}
      {showWordmark && (
        <div className="flex flex-col leading-none">
          <span 
            className={cn("font-medium tracking-wide", wordmarkSizeMap[size])}
            style={{ color: '#0D232D' }}
          >
            KBB
          </span>
          {size !== 'sm' && (
            <span className="text-xs font-normal" style={{ color: '#4B5563' }}>
              Kartvelian Business Bonds
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default Logo;
