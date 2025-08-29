import { useState } from "react";
import { Copy, Check, ExternalLink, Star } from "lucide-react";
import { type Bonus } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

interface BonusCardProps {
  bonus: Bonus;
  index: number;
}

export default function BonusCard({ bonus, index }: BonusCardProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopyPromoCode = async () => {
    try {
      await navigator.clipboard.writeText(bonus.promoCode);
      setCopied(true);
      toast({
        title: "Promo code copied!",
        description: `${bonus.promoCode} copied to clipboard`,
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Please copy the code manually",
        variant: "destructive",
      });
    }
  };

  const handleClaimBonus = () => {
    window.open(bonus.claimUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <article 
      className={`group relative bg-card border border-border rounded-xl overflow-hidden transition-all duration-300 hover:border-primary/50 card-hover glow-effect animate-slide-up`}
      style={{ animationDelay: `${index * 0.1}s` }}
      data-testid={`card-bonus-${bonus.slug}`}
    >
      {/* Featured Badge */}
      {bonus.isFeatured === 1 && (
        <div className="absolute top-4 left-4 z-20">
          <span className={`inline-flex items-center px-3 py-1 bg-gradient-to-r ${bonus.gradientFrom} ${bonus.gradientTo} text-xs font-semibold text-white rounded-full`}>
            <Star className="w-3 h-3 mr-1" />
            FEATURED
          </span>
        </div>
      )}

      {/* Card Content */}
      <div className="p-6">
        {/* Logo and Title */}
        <div className="flex items-center mb-4">
          <img 
            src={bonus.logoUrl}
            alt={`${bonus.name} logo`} 
            className="w-12 h-12 rounded-lg mr-4 border border-border group-hover:border-primary/50 transition-colors duration-300"
            data-testid={`img-bonus-logo-${bonus.slug}`}
          />
          <div className="flex-1">
            <h3 className="text-xl font-bold text-foreground mb-1" data-testid={`text-bonus-name-${bonus.slug}`}>
              {bonus.name}
            </h3>
            <p className="text-muted-foreground text-sm" data-testid={`text-bonus-type-${bonus.slug}`}>
              {bonus.bonusType}
            </p>
          </div>
        </div>

        {/* Promo Code Section */}
        <div className="bg-secondary/50 rounded-lg p-4 border border-border/50 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-muted-foreground mb-1">Promo Code</div>
              <div className="flex items-center">
                <span className="text-lg font-bold text-primary mr-3" data-testid={`text-promo-code-${bonus.slug}`}>
                  {bonus.promoCode}
                </span>
                <button
                  onClick={handleCopyPromoCode}
                  className="flex items-center px-3 py-1 bg-primary/20 hover:bg-primary/30 text-primary text-sm font-medium rounded-md transition-colors duration-200"
                  data-testid={`button-copy-${bonus.slug}`}
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 mr-1" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 mr-1" />
                      Copy
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button 
          onClick={handleClaimBonus}
          className={`w-full bg-gradient-to-r ${bonus.gradientFrom} ${bonus.gradientTo} hover:from-${bonus.gradientFrom.replace('from-', '')}/90 hover:to-${bonus.gradientTo.replace('to-', '')}/90 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-lg group-hover:animate-glow flex items-center justify-center`}
          data-testid={`button-claim-${bonus.slug}`}
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          Claim Bonus
        </button>
      </div>
    </article>
  );
}