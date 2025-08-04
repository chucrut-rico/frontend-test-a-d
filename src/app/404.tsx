import { Suspense } from "react";
import CleanLinkToHome from "@/components/CleanLinkToHome";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center text-center mt-20 px-4">
      <h1 className="text-3xl font-bold mb-2 text-primary">Page not found</h1>
      <p className="text-secondary mb-6">
        Sorry, we couldn’t find the page you’re looking for.
      </p>

      <Suspense fallback={null}>
        <CleanLinkToHome className="text-cta-fill-primary font-semibold underline">
          Back to catalog
        </CleanLinkToHome>
      </Suspense>
    </div>
  );
}
