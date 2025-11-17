import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { ExternalLink, BookOpen, TrendingUp, Building2, Landmark } from "lucide-react";

const Resources = () => {
  const resourceSections = [
    {
      id: "global-msme",
      title: "Global MSME Finance Gap",
      icon: TrendingUp,
      description: "Worldwide data on SME financing constraints and opportunities",
      resources: [
        {
          title: "MSME Finance Gap: An Updated Estimation",
          organization: "IFC & SME Finance Forum",
          year: "2025",
          description: "Formal MSME finance gap in EMDEs estimated around USD 5.7 trillion; methodology and breakdowns by region and firm type.",
          url: "https://www.smefinanceforum.org/sites/default/files/Data%20Sites%20downloads/IFC%20Report_MAIN%20Final%203%2025.pdf"
        },
        {
          title: "MSME Finance – Topic Page",
          organization: "IFC",
          year: "2025",
          description: "MSMEs make up over 90% of firms; MSME finance gap of USD 5.7 trillion (USD 8 trillion incl. informal sector).",
          url: "https://www.ifc.org/en/what-we-do/sector-expertise/financial-institutions/msme-finance"
        },
        {
          title: "Factsheet: Micro, Small & Medium Enterprises",
          organization: "IFC Financial Institutions Group",
          year: "2025",
          description: "MSMEs >90% of firms, ≈70% of employment and 50% of GDP worldwide; finance gap now USD 5.7 trillion.",
          url: "https://www.ifc.org/content/dam/ifc/doclink/latest/msme-s-factsheet-ifc-financial-institutions-group.pdf"
        },
        {
          title: "IFC and Small and Medium Enterprises",
          organization: "IFC / World Bank",
          year: "2024",
          description: "SMEs account for about 90% of businesses and more than 50% of employment worldwide.",
          url: "https://openknowledge.worldbank.org/items/50dccfb5-81ec-4d9e-a1d9-3b9c266ab2f2"
        }
      ]
    },
    {
      id: "georgia-economy",
      title: "Georgia – GDP & Economic Growth",
      icon: Building2,
      description: "Official statistics on Georgia's economic performance",
      resources: [
        {
          title: "Gross Domestic Product of Georgia in 2024",
          organization: "National Statistics Office of Georgia (Geostat)",
          year: "2024",
          description: "Nominal GDP of GEL 91,891.8 million, with real GDP growth of 9.4%, plus structure by sector.",
          url: "https://www.geostat.ge/media/69444/Gross-Domestic-Product-of-Georgia-in-2024.pdf"
        },
        {
          title: "Gross Domestic Product of Georgia – Q1 2025",
          organization: "Geostat",
          year: "2025",
          description: "Q1 2025 nominal GDP GEL 21,798.2 million and real GDP growth of 9.8% y/y.",
          url: "https://geostat.ge/media/71370/Gross-Domestic-Product-of-Georgia---I-Quarter%2C-2025.pdf"
        },
        {
          title: "Georgia – Country Data",
          organization: "World Bank Open Data",
          year: "2025",
          description: "Official World Bank series for Georgia: GDP (current USD), GDP growth, GDP per capita.",
          url: "https://data.worldbank.org/country/georgia"
        }
      ]
    },
    {
      id: "georgia-sme-finance",
      title: "Georgia – SME Access to Finance",
      icon: Landmark,
      description: "Analysis of capital market constraints for Georgian businesses",
      resources: [
        {
          title: "FSAP Technical Note on SME Access to Finance",
          organization: "World Bank",
          year: "2021",
          description: "SMEs are core to the Georgian economy; documents significant access-to-finance constraints, including shortage of long-term funding and underdeveloped capital-market instruments.",
          url: "https://documents.worldbank.org/en/publication/documents-reports/documentdetail/099840203012218658"
        },
        {
          title: "Georgia Country Private Sector Diagnostic",
          organization: "IFC & World Bank",
          year: "2023",
          description: "Analyses constraints to private-sector growth; highlights access to finance, capital-market depth and long-term funding as key structural bottlenecks.",
          url: "https://www.ifc.org/content/dam/ifc/doc/2023/georgia-country-private-sector-diagnostic-en.pdf"
        }
      ]
    },
    {
      id: "georgia-fintech",
      title: "Georgia – Fintech & DLT Strategy",
      icon: BookOpen,
      description: "National Bank of Georgia's fintech development initiatives",
      resources: [
        {
          title: "Fintech Development Strategy of Georgia",
          organization: "National Bank of Georgia (NBG)",
          year: "2024",
          description: "NBG's fintech vision, objectives and KPIs; mentions cooperation with the World Bank and outlines the regulatory sandbox and DLT-related ambitions.",
          url: "https://nbg.gov.ge/fm/%E1%83%96%E1%83%94%E1%83%93%E1%83%90%E1%83%9B%E1%83%AE%E1%83%94%E1%83%93%E1%83%95%E1%83%94%E1%83%9A%E1%83%9D%E1%83%91%E1%83%90/%E1%83%A4%E1%83%98%E1%83%9C%E1%83%A2%E1%83%94%E1%83%A5_%E1%83%93%E1%83%94%E1%83%9E%E1%83%90%E1%83%A0%E1%83%A2%E1%83%90%E1%83%9B%E1%83%94%E1%83%9C%E1%83%A2%E1%83%98/strategia/fintech-development-strategy-of-georgia.pdf"
        },
        {
          title: "Fintech Development Strategy – Updated Version",
          organization: "National Bank of Georgia",
          year: "2025",
          description: "Updated strategy; explicitly notes that NBG has set up a regulatory sandbox, strengthened fintech capacity and actively researches CBDC and tokenization.",
          url: "https://nbg.gov.ge/fm/%E1%83%96%E1%83%94%E1%83%93%E1%83%90%E1%83%9B%E1%83%AE%E1%83%94%E1%83%93%E1%83%95%E1%83%94%E1%83%9A%E1%83%9D%E1%83%91%E1%83%90/%E1%83%A4%E1%83%98%E1%83%9C%E1%83%A2%E1%83%94%E1%83%A5_%E1%83%93%E1%83%94%E1%83%9E%E1%83%90%E1%83%A0%E1%83%A2%E1%83%90%E1%83%9B%E1%83%94%E1%83%9C%E1%83%A2%E1%83%98/strategia/2025/fintech-development-strategy-of-georgia-updated-version.pdf?v=ikrcd"
        },
        {
          title: "Fintech Development Strategy – Priority Actions Mapping",
          organization: "National Bank of Georgia",
          year: "2025",
          description: "Detailed mapping of priority actions, goals and KPIs, including sandbox-related milestones.",
          url: "https://nbg.gov.ge/fm/%E1%83%96%E1%83%94%E1%83%93%E1%83%90%E1%83%9B%E1%83%AE%E1%83%94%E1%83%93%E1%83%95%E1%83%94%E1%83%9A%E1%83%9D%E1%83%91%E1%83%90/%E1%83%A4%E1%83%98%E1%83%9C%E1%83%A2%E1%83%94%E1%83%A5_%E1%83%93%E1%83%94%E1%83%9E%E1%83%90%E1%83%A0%E1%83%A2%E1%83%90%E1%83%9B%E1%83%94%E1%83%9C%E1%83%A2%E1%83%98/strategia/2025/appendix.pdf?v=5wi8m"
        },
        {
          title: "FinTech in Georgia 2.0",
          organization: "National Bank of Georgia",
          year: "2025",
          description: "High-level NBG presentation showing Georgia's fintech ecosystem, including the regulatory sandbox and innovation support tools.",
          url: "https://nbg.gov.ge/fm/%E1%83%96%E1%83%94%E1%83%93%E1%83%90%E1%83%9B%E1%83%AE%E1%83%94%E1%83%93%E1%83%95%E1%83%94%E1%83%9A%E1%83%9D%E1%83%91%E1%83%90/%E1%83%A4%E1%83%98%E1%83%9C%E1%83%A2%E1%83%94%E1%83%A5_%E1%83%93%E1%83%94%E1%83%9E%E1%83%90%E1%83%A0%E1%83%A2%E1%83%90%E1%83%9B%E1%83%94%E1%83%9C%E1%83%A2%E1%83%98/fintech-in-georgia-2-0.pdf?v=i8p9q"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          {/* Page Header */}
          <div className="mb-16 text-center">
            <h1 className="text-4xl md:text-5xl font-sans font-semibold text-primary mb-4">
              Research & Sources
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Official reports and data supporting the market opportunity for tokenized SME bonds in Georgia
            </p>
          </div>

          {/* Resource Sections */}
          <div className="space-y-12">
            {resourceSections.map((section) => {
              const IconComponent = section.icon;
              return (
                <div key={section.id} id={section.id}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-md bg-accent/10 border border-accent/30 flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-semibold text-foreground">
                        {section.title}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        {section.description}
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-4">
                    {section.resources.map((resource, idx) => (
                      <Card key={idx} className="p-6 hover:border-accent/50 transition-colors">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-start gap-3 mb-2">
                              <h3 className="text-lg font-medium text-foreground">
                                {resource.title}
                              </h3>
                              <a
                                href={resource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-accent hover:text-accent/80 transition-colors flex-shrink-0 mt-1"
                                aria-label="Open resource"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            </div>
                            <div className="flex items-center gap-3 mb-3 text-sm text-muted-foreground">
                              <span className="font-medium">{resource.organization}</span>
                              <span>•</span>
                              <span>{resource.year}</span>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {resource.description}
                            </p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Citation Note */}
          <Card className="mt-16 p-8 bg-muted/30 border-muted">
            <h3 className="text-lg font-semibold text-foreground mb-3">
              About These Sources
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              All sources are official publications from international financial institutions (World Bank, IFC), 
              national statistical agencies (Geostat), and regulatory authorities (National Bank of Georgia). 
              These documents provide the empirical foundation for understanding the market opportunity for 
              SME financing infrastructure in Georgia and emerging markets more broadly.
            </p>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Resources;
