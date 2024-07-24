import React, { Component, ErrorInfo, ReactNode } from 'react';

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
    constructor(props: { children: ReactNode }) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(_: Error): { hasError: boolean } {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Error caught in Error Boundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <div>Something went wrong.</div>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
