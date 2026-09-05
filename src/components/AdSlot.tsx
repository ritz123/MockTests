"use client";

import { useEffect, useState } from "react";
import { sponsoredBooks, toAdProducts } from "../lib/affiliate";

export interface AdProduct {
  url: string;
  title: string;
  author?: string;
  price?: string;
  image?: string;
}

interface AdSlotProps {
  slotName?: string;
  className?: string;
  minHeight?: number;
  products?: AdProduct[];
}

const defaultProducts = toAdProducts(sponsoredBooks);

export function AdSlot({ slotName = "default", className = "", minHeight = 160, products = defaultProducts }: AdSlotProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={`ad-slot ${className}`} style={{ minHeight }} aria-hidden="true" />;
  }

  return (
    <div
      className={`ad-slot ${className}`}
      style={{ minHeight }}
      data-ad-slot={slotName}
      role="complementary"
      aria-label="Advertisement"
    >
      <div className="ad-content">
        <span className="ad-label">Sponsored</span>
        <div className="ad-products">
          {products.map((product, index) => (
            <a
              key={index}
              href={product.url}
              target="_blank"
              rel="noopener noreferrer nofollow sponsored"
              className="ad-product"
              aria-label={product.title}
            >
              {product.image && <img src={product.image} alt="" className="ad-product-image" />}
              <span className="ad-product-title">{product.title}</span>
              {product.price && <span className="ad-product-price">{product.price}</span>}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}