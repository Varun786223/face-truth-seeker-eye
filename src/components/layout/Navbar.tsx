
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";

interface NavItems {
  title: string;
  href: string;
}

const navItems: NavItems[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Image Analysis",
    href: "/image-analysis",
  },
  {
    title: "Video Analysis",
    href: "/video-analysis",
  },
  {
    title: "Live Camera",
    href: "/webcam-analysis",
  },
  {
    title: "Blockchain",
    href: "/blockchain",
  },
  {
    title: "Resources",
    href: "/resources",
  },
  {
    title: "Settings",
    href: "/settings",
  },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center">
        <div className="flex w-full justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold">DeepfakeDetector</span>
          </Link>
          <nav className="hidden md:flex gap-6 ml-10">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <Menu className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-4 pt-10">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="text-base font-medium text-muted-foreground transition-colors hover:text-primary"
                    onClick={handleToggleMenu}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
