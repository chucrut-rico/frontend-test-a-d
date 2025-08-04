"use client";

import { createContext, useContext, useState } from "react";

type CatalogLoadingContextType = {
  isLoading: boolean;
  setLoading: (value: boolean) => void;
};

const CatalogLoadingContext = createContext<
  CatalogLoadingContextType | undefined
>(undefined);

export function CatalogLoadingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <CatalogLoadingContext.Provider
      value={{ isLoading, setLoading: setIsLoading }}
    >
      {children}
    </CatalogLoadingContext.Provider>
  );
}

export function useCatalogLoading() {
  const context = useContext(CatalogLoadingContext);

  if (!context)
    throw new Error(
      "useCatalogLoading must be used within a CatalogLoadingProvider"
    );

  return context;
}
