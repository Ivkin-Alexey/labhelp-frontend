export default function FallbackRender() {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.

  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{"sdfdsf"}</pre>
    </div>
  );
}
