import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Ornament } from "@/components/ornament"
import Link from "next/link"
import Image from "next/image"
import { Clock01Icon, Location04Icon, Call02Icon, FireIcon, UserGroupIcon, StarIcon, CheckmarkCircle02Icon } from "hugeicons-react"
import { reviews } from "@/lib/reviews-data"
import { siteConfig } from "@/lib/site-config"
import { menuItems } from "@/lib/menu-data"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      <main className="flex-1">
        <section className="relative py-20 md:py-32 px-4 overflow-hidden bg-background">
          <div className="absolute top-0 right-0 w-2/3 h-full overflow-hidden opacity-[0.03] pointer-events-none">
            <Image
              src="/assets/orig.jpg"
              alt="Background"
              fill
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-background" />
          </div>
          <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl z-0 pointer-events-none" />

          <div className="max-w-6xl mx-auto relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-block mb-6">
                <span className="bg-primary text-background px-5 py-2 rounded-full text-sm font-bold tracking-wide uppercase">
                  {siteConfig.home.tagline}
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight text-balance leading-none">
                <span className="text-primary block drop-shadow-sm">{siteConfig.home.titlePart1}</span>
                <span className="text-foreground">{siteConfig.home.titlePart2}</span>
              </h1>

              <div className="lg:hidden flex justify-center w-full my-6">
                <Ornament />
              </div>
              <div className="hidden lg:block w-full my-6 opacity-80">
                <Ornament />
              </div>

              <p className="text-2xl md:text-3xl text-primary font-semibold mt-6 mb-4">
                {siteConfig.home.subtitle}
              </p>

              <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0">
                {siteConfig.home.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-12">
                <Link
                  href="/menu"
                  className="group bg-primary text-background px-10 py-4 rounded-xl font-bold text-lg hover:bg-primary/80 transition-all hover:scale-105 shadow-lg shadow-primary/20"
                >
                  {siteConfig.home.buttons.menu}
                </Link>
                <Link
                  href="/booking"
                  className="group bg-accent text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-accent/80 transition-all hover:scale-105 shadow-lg shadow-accent/20"
                >
                  {siteConfig.home.buttons.booking}
                </Link>
              </div>
            </div>

            <div className="flex-1 w-full max-w-lg hidden lg:block relative">
              <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black/40 border border-border/50">
                <Image
                  src="/assets/orig.jpg"
                  alt={siteConfig.home.imgAlt}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
              </div>
            </div>
          </div>
        </section>

        <section className="py-10 px-4 bg-card border-y border-border">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {siteConfig.home.stats.map((stat, i) => (
                <div key={i} className="p-4">
                  <p className={`text-3xl md:text-4xl font-bold ${i % 2 === 0 ? "text-primary" : "text-accent"}`}>{stat.value}</p>
                  <p className="text-muted-foreground text-sm mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 px-4 bg-background">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4">
              {siteConfig.home.features.title} <span className="text-primary">{siteConfig.home.features.titleHighlight}</span>
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
              {siteConfig.home.features.subtitle}
            </p>

            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              <div className="group bg-card border border-border p-8 rounded-2xl hover:border-primary/50 transition-all hover:-translate-y-1">
                <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/30 transition-colors">
                  <FireIcon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-bold text-xl mb-3 text-foreground">{siteConfig.home.features.items[0].title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {siteConfig.home.features.items[0].description}
                </p>
              </div>

              <div className="group bg-card border border-border p-8 rounded-2xl hover:border-accent/50 transition-all hover:-translate-y-1">
                <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-accent/30 transition-colors">
                  <UserGroupIcon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-bold text-xl mb-3 text-foreground">{siteConfig.home.features.items[1].title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {siteConfig.home.features.items[1].description}
                </p>
              </div>

              <div className="group bg-card border border-border p-8 rounded-2xl hover:border-primary/50 transition-all hover:-translate-y-1">
                <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/30 transition-colors">
                  <StarIcon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-bold text-xl mb-3 text-foreground">{siteConfig.home.features.items[2].title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {siteConfig.home.features.items[2].description}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 px-4 bg-card border-y border-border">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4">{siteConfig.home.popular.title}</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
              {siteConfig.home.popular.subtitle}
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuItems.filter((item) => ["4", "6", "8"].includes(item.id)).map((dish, i) => (
                <div key={i} className="group cursor-pointer bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 hover:shadow-lg transition-all hover:-translate-y-1 duration-300">
                  <div className="h-56 relative overflow-hidden">
                    <Image
                      src={dish.image}
                      alt={dish.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
                    <div className="absolute top-4 right-4">
                      <span className="bg-background/80 backdrop-blur text-foreground border border-border px-3 py-1.5 rounded-lg text-lg font-bold shadow-lg">
                        {dish.price} <span className="text-primary">{siteConfig.menu.currency}</span>
                      </span>

                    </div>
                  </div>

                  <div className="p-5 relative z-10">
                    <h3 className="font-bold text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
                      {dish.name}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                      {dish.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link
                href="/menu"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors text-lg"
              >
                {siteConfig.home.popular.viewAll}
                <span className="text-xl">→</span>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 px-4 bg-background">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-card border border-border p-8 rounded-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                    <Clock01Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">{siteConfig.home.info.hoursTitle}</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-border">
                    <span className="text-muted-foreground">{siteConfig.hours.weekdaysTitle}</span>
                    <span className="font-semibold text-primary">{siteConfig.hours.weekdays}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-border">
                    <span className="text-muted-foreground">{siteConfig.hours.weekendsTitle}</span>
                    <span className="font-semibold text-accent">{siteConfig.hours.weekends}</span>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border p-8 rounded-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center">
                    <Location04Icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">{siteConfig.home.info.contactTitle}</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 py-3 border-b border-border">
                    <Location04Icon className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">{siteConfig.home.info.addressLabel}</p>
                      <p className="text-muted-foreground">{siteConfig.contact.mainAddress}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 py-3">
                    <Call02Icon className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">{siteConfig.home.info.phoneLabel}</p>
                      <p className="text-primary font-medium">{siteConfig.contact.phone}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 border-y border-border">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {siteConfig.home.booking.title} <span className="text-accent">{siteConfig.home.booking.titleHighlight}</span>
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              {siteConfig.home.booking.subtitle}
            </p>
            <Link
              href="/booking"
              className="inline-block bg-accent text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-accent/80 transition-all hover:scale-105 shadow-lg shadow-accent/20"
            >
              {siteConfig.home.buttons.bookingNow}
            </Link>
          </div>
        </section>

        <section className="py-20 bg-background overflow-hidden relative border-b border-border">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl z-0 pointer-events-none" />
          <div className="max-w-7xl mx-auto relative z-10 px-4">
            <div className="text-center mb-12">
              <span className="bg-primary/10 text-primary px-5 py-2 rounded-full text-sm font-bold tracking-wide uppercase border border-primary/20">
                {siteConfig.home.reviews.tagline}
              </span>
              <h2 className="text-3xl md:text-5xl font-bold mt-6 mb-4 text-foreground">
                {siteConfig.home.reviews.title} <span className="text-accent">{siteConfig.home.reviews.titleHighlight}</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                {siteConfig.home.reviews.subtitle}
              </p>
            </div>

            <div className="relative flex overflow-x-hidden group -mx-4 sm:mx-0">
              <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-20" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-20" />

              <div className="flex animate-marquee group-hover:pause-animation gap-6 py-4 w-max px-4">
                {[...reviews, ...reviews].map((review, idx) => (
                  <div
                    key={idx}
                    className="w-[300px] md:w-[380px] shrink-0 bg-card border border-border rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 hover:border-primary/40 relative overflow-hidden"
                  >
                    <div className="flex items-center gap-4 mb-5 relative z-10">
                      <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-primary/20">
                        <Image src={review.avatar} alt={review.name} fill className="object-cover" />
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground flex items-center gap-1.5">
                          {review.name}
                          <CheckmarkCircle02Icon className="w-4 h-4 text-primary" />
                        </h4>
                        <div className="flex items-center mt-1">
                          {[...Array(5)].map((_, i) => (
                            <StarIcon
                              key={i}
                              className={`w-4 h-4 ${i < review.rating ? "text-accent fill-accent" : "text-border"}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed relative z-10 text-[15px]">
                      "{review.text}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
