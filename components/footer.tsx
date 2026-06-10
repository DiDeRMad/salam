import Link from "next/link"
import Image from "next/image"
import { Location04Icon, Call02Icon, Clock01Icon } from "hugeicons-react"
import { siteConfig } from "@/lib/site-config"

export function Footer() {
  return (
    <footer className="bg-background border-t border-border mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image 
                src="/assets/logo/salam.png" 
                alt={siteConfig.name}
                width={120} 
                height={40} 
                className="h-10 w-auto object-contain" 
              />
              <span className="text-foreground font-bold">{siteConfig.name}</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {siteConfig.description}
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-foreground mb-4">{siteConfig.footer.navHeader}</h4>
            <div className="flex flex-col gap-2">
              {siteConfig.nav.map((link) => (
                <Link key={link.href} href={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-foreground mb-4">{siteConfig.footer.contactHeader}</h4>
            <div className="flex flex-col gap-4 text-muted-foreground text-sm">
              {siteConfig.contact.addresses.map((addr, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <Location04Icon className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <div className="leading-relaxed">
                    <strong className="text-foreground">{addr.name}</strong><br/>
                    {addr.address}<br/>
                    <span className="text-xs opacity-70">{addr.district}</span>
                  </div>
                </div>
              ))}
              <div className="flex items-center gap-2 mt-2">
                <Call02Icon className="w-5 h-5 text-accent shrink-0" />
                <span className="font-medium text-foreground text-base">{siteConfig.contact.phone}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-foreground mb-4">{siteConfig.footer.hoursHeader}</h4>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Clock01Icon className="w-4 h-4 text-primary shrink-0" />
                <span>{siteConfig.hours.footerWeekdays}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Clock01Icon className="w-4 h-4 text-primary shrink-0" />
                <span>{siteConfig.hours.footerWeekends}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground/70 text-sm">
            {siteConfig.footer.copyright}
          </p>
          <div className="flex items-center gap-4">
            <p className="text-muted-foreground/50 text-xs">
              {siteConfig.footer.developedBy}
            </p>
            <a href="/admin" className="text-muted-foreground/30 text-xs hover:text-muted-foreground/60 transition-colors">
              Панель управления
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
