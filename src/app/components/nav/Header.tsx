"use client";
import Link from "next/link";
import styles from "../../styles/nav.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>MyStore</Link>
      <nav className={styles.nav}>
        <Link href="/products">Products</Link>
        <Link href="/carts">Cart</Link>
        <Link href="/about-us">About</Link>
        <Link href="/contact-us">Contact</Link>
      </nav>
    </header>
  );
}
