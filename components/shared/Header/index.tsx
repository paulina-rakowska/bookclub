

import { Search, Menu, BookOpenText } from "lucide-react"
import Link from "next/link";
import Image from 'next/image';
import "./header.css";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Header = () => {
    return (
    <header className="bg-primary text-primary-foreground shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <div className="w-10 h-8 bg-white rounded-lg flex items-center justify-center relative z-10">
                <BookOpenText className="h-5 w-5 text-primary" />
              </div>
            </div>
            <span className="text-xl font-bold ml-2">BookClub</span>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="search"
                placeholder="Search book or author"
                className="pl-10 bg-background text-foreground border-border"
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <ul className="md:flex items-center space-x-6">
              <li>
                <a href="/books" className="hover:text-secondary transition-colors">
                  Books
                </a>
              </li>
              <li>
                <a href="/authors" className="hover:text-secondary transition-colors">
                  Authors
                </a>
              </li>
              <li>
                <a href="/login" className="hover:text-secondary transition-colors">
                  Log In
                </a>
              </li>
              <li>
                <Button variant="secondary" size="sm" className="bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80 h-8">
                  Sign Up
                </Button>
              </li>
            </ul>
          </nav>

          {/* Mobile menu button */}
          <Button variant="ghost" size="sm" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* Mobile search */}
        <div className="md:hidden mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="search"
              placeholder="Search book or author"
              className="pl-10 bg-background text-foreground border-border"
            />
          </div>
        </div>
      </div>
    </header>
    );
}

export default Header;