"use client";

interface CatalogLoaderProps {
  isLoading: boolean;
  children: React.ReactNode;
}

export default function CatalogLoader({
  isLoading,
  children,
}: CatalogLoaderProps) {
  if (isLoading) {
    return (
      <div className="p-6 text-center">
        <p className="text-lg text-gray-700 animate-pulse">Loading games...</p>
      </div>
    );
  }

  return <>{children}</>;
}
