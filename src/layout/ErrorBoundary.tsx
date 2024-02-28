import { Component, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    console.error(error); // Log the error
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: unknown) {
    console.error(error, errorInfo); // You can log additional information here
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong.</div>; // You can render a fallback UI
    }

    return this.props.children;
  }
}
