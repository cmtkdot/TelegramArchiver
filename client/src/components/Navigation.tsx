import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";

export default function Navigation() {
  const [location] = useLocation();

  return (
    <nav className="border-b mb-6 px-6 py-3">
      <div className="container mx-auto flex gap-4">
        <Link href="/">
          <Button
            variant={location === "/" ? "default" : "ghost"}
            className="text-sm"
          >
            Dashboard
          </Button>
        </Link>
        <Link href="/channels">
          <Button
            variant={location === "/channels" ? "default" : "ghost"}
            className="text-sm"
          >
            Channels
          </Button>
        </Link>
        <Link href="/media">
          <Button
            variant={location === "/media" ? "default" : "ghost"}
            className="text-sm"
          >
            Media
          </Button>
        </Link>
      </div>
    </nav>
  );
}
