import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function ErrorBoundary({children}) {
    const [hasError, setHasError] = useState(false);
    const location = useLocation();
    useEffect(() => {
      if (hasError) {
        setHasError(false);
      }
    }, [location.key]);
    return (
      /**
       * NEW: The class component error boundary is now
       *      a child of the functional component.
       */
      <ErrorBoundaryInner 
        hasError={hasError} 
        setHasError={setHasError}
      >
        {children}
      </ErrorBoundaryInner>
    );
}
  


