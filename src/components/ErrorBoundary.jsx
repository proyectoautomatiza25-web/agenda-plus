import React from 'react';

/**
 * ErrorBoundary - Componente que captura errores en React
 * Previene que la app se quede en blanco cuando hay errores
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('\u274c Error capturado en ErrorBoundary:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundColor: '#fee',
          padding: '20px',
          flexDirection: 'column',
          gap: '20px',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
          <h1 style={{ color: '#c33', margin: 0 }}>\u26a0️ Oops! Algo salió mal</h1>
          <p style={{ color: '#666', margin: 0, maxWidth: '500px', textAlign: 'center' }}>
            La aplicación encontró un error inesperado.
          </p>
          {this.state.error && (
            <details style={{
              padding: '10px',
              backgroundColor: '#fff5f5',
              borderRadius: '4px',
              maxWidth: '600px',
              overflow: 'auto'
            }}>
              <summary style={{ cursor: 'pointer', fontWeight: 'bold', color: '#c33' }}>
                Detalles técnicos
              </summary>
              <pre style={{
                margin: '10px 0 0 0',
                fontSize: '12px',
                color: '#666',
                overflow: 'auto'
              }}>
                {this.state.error.toString()}
                {this.state.errorInfo && this.state.errorInfo.componentStack}
              </pre>
            </details>
          )}
          <button
            onClick={() => {
              window.location.reload();
            }}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              marginTop: '20px'
            }}
          >
            Recargar Página
          </button>
          <p style={{ fontSize: '12px', color: '#999', margin: '10px 0 0 0' }}>
            Si el problema persiste, contacta a soporte@automatizasur.cl
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
