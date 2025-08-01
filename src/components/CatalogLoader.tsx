"use client";

import { useState, useEffect } from "react";

interface CatalogLoaderProps {
  loadingKey: string;
  children: React.ReactNode;
}

export default function CatalogLoader({
  loadingKey,
  children,
}: CatalogLoaderProps) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 200); // Muestra loader al menos 200ms

    return () => clearTimeout(timeout);
  }, [loadingKey]);

  if (isLoading) {
    return (
      <div className="p-6 text-center">
        <p className="text-lg text-gray-700 animate-pulse">
          Loading catalog...
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
