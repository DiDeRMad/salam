"use client"

import { useState } from "react"
import Image from "next/image"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Ornament } from "@/components/ornament"
import { categories, menuItems } from "@/lib/menu-data"
import { FireIcon, Leaf01Icon, StarIcon } from "hugeicons-react"
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { siteConfig } from "@/lib/site-config"

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("soup")

  const filteredItems = menuItems.filter((item) => item.category === activeCategory)

  const getCategoryIcon = (catId: string) => {
    const icons: Record<string, React.ReactNode> = {
      soup: <FireIcon className="w-4 h-4" />,
      hot: <FireIcon className="w-4 h-4" />,
      grill: <FireIcon className="w-4 h-4" />,
      drinks: <Leaf01Icon className="w-4 h-4" />,
      desserts: <StarIcon className="w-4 h-4" />,
    }
    return icons[catId] || null
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      <main className="flex-1 py-10 md:py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block bg-accent text-white px-5 py-2 rounded-full text-sm font-bold mb-4">
              {siteConfig.menu.tagline}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
              {siteConfig.menu.title} <span className="text-primary">{siteConfig.menu.titleHighlight}</span> {siteConfig.menu.titleSuffix}
            </h1>
            <Ornament />
            <p className="text-muted-foreground max-w-xl mx-auto mt-4">
              {siteConfig.menu.subtitle}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  activeCategory === cat.id
                    ? "bg-primary text-background shadow-lg shadow-primary/20"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/50"
                }`}
              >
                {getCategoryIcon(cat.id)}
                {cat.name}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, index) => (
              <Dialog key={item.id}>
                <DialogTrigger asChild>
                  <div
                    className="group cursor-pointer bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 hover:shadow-lg transition-all hover:-translate-y-1 duration-300"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="h-56 relative overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <span className="bg-background/90 backdrop-blur text-muted-foreground px-3 py-1 rounded-lg text-xs font-medium border border-border">
                          {categories.find(c => c.id === item.category)?.name}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4">
                        <span className="bg-background/80 backdrop-blur text-foreground border border-border px-3 py-1.5 rounded-lg text-lg font-bold shadow-lg">
                          {item.price} <span className="text-primary">{siteConfig.menu.currency}</span>
                        </span>
                      </div>
                    </div>

                    <div className="p-5 relative z-10">
                      <h3 className="font-bold text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[600px] p-0 overflow-visible bg-card border-border shadow-2xl sm:rounded-[2rem] border-0">
                  <div className="relative h-64 sm:h-80 w-full overflow-hidden sm:rounded-t-[2rem]">
                    <Image src={item.image} fill className="object-cover" alt={item.name} />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <DialogTitle className="text-3xl md:text-4xl font-bold text-foreground drop-shadow-md mb-2">{item.name}</DialogTitle>
                      <DialogDescription className="text-xl font-bold text-primary drop-shadow-sm">
                        {item.price} {siteConfig.menu.currency}
                      </DialogDescription>
                    </div>
                  </div>

                  <div className="p-6 md:p-8 pt-2 overflow-y-auto max-h-[50vh]">
                    <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                      {item.description}
                    </p>

                    <div className="mb-6">
                      <h4 className="font-bold text-foreground mb-3 text-lg">{siteConfig.menu.ingredients}</h4>
                      <div className="bg-background/50 p-4 rounded-2xl border border-border">
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {item.ingredients}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-foreground mb-4 text-lg">{siteConfig.menu.nutrition}</h4>
                      <div className="grid grid-cols-4 gap-3 text-center">
                        <div className="bg-background/50 border border-border rounded-2xl p-3 shadow-sm hover:border-primary/50 transition-colors">
                          <div className="text-xs text-muted-foreground mb-1">{siteConfig.menu.cal}</div>
                          <div className="font-bold text-lg text-primary">{item.nutrition.calories}</div>
                        </div>
                        <div className="bg-background/50 border border-border rounded-2xl p-3 shadow-sm hover:border-accent/50 transition-colors">
                          <div className="text-xs text-muted-foreground mb-1">{siteConfig.menu.prot}</div>
                          <div className="font-bold text-lg text-foreground">{item.nutrition.protein}<span className="text-xs text-muted-foreground ml-0.5">г</span></div>
                        </div>
                        <div className="bg-background/50 border border-border rounded-2xl p-3 shadow-sm hover:border-accent/50 transition-colors">
                          <div className="text-xs text-muted-foreground mb-1">{siteConfig.menu.fat}</div>
                          <div className="font-bold text-lg text-foreground">{item.nutrition.fat}<span className="text-xs text-muted-foreground ml-0.5">г</span></div>
                        </div>
                        <div className="bg-background/50 border border-border rounded-2xl p-3 shadow-sm hover:border-accent/50 transition-colors">
                          <div className="text-xs text-muted-foreground mb-1">{siteConfig.menu.carb}</div>
                          <div className="font-bold text-lg text-foreground">{item.nutrition.carbs}<span className="text-xs text-muted-foreground ml-0.5">г</span></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">{siteConfig.menu.emptyCategory}</p>
            </div>
          )}

          <div className="mt-12 text-center">
            <div className="inline-block bg-card border border-border rounded-xl px-6 py-4">
              <p className="text-muted-foreground text-sm">
                <span className="text-primary font-semibold">{siteConfig.menu.tipPrefix}</span> {siteConfig.menu.tipText}
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
