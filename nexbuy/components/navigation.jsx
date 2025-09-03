"use client"; 
import Link from "next/link";
import { usePathname } from "next/navigation";
import "../app/globals.css";

export default function Navigation() {
  const pathname = usePathname();
  
  return (
    <div>
      <nav>
        <ul>
          <li className={pathname === "/" ? "active" : ""}>
            <Link href="/">Home</Link>
          </li>
          <li className={pathname === "/about" ? "active" : ""}>
            <Link href="/about">About</Link>
          </li>
          <li className={pathname === "/contact" ? "active" : ""}>
            <Link href="/contact">Contact</Link>
          </li>
          <li className={pathname === "/login" ? "active" : ""}>
            <Link href="/login">Login</Link>
          </li>
          <li className={pathname === "/register" ? "active" : ""}>
            <Link href="/register">Register</Link>
          </li>
          <li className={pathname === "/performance" ? "active" : ""}>
            <Link href="/performance">Performance</Link>
          </li>
          <li className={pathname === "/manageshop" ? "active" : ""}>
            <Link href="/manageshop">Manage Shop</Link>
          </li>
          <li className={pathname === "/product" ? "active" : ""}>
            <Link href="/product">Product</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
