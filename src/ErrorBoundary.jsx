import { Component } from 'react'

export default class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Application rendering failed:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <main role="alert" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(28px, 8vw, 112px)', background: '#080808', color: '#f5f3ee', fontFamily: 'Inter, sans-serif' }}>
          <style>{`.app-error-title{margin:20px 0 10px;font:600 clamp(38px,7vw,66px)/1.05 Montserrat,sans-serif;letter-spacing:-.06em}.app-error-copy{max-width:440px;color:#aaa79f;font-size:14px;line-height:1.8}.app-error-actions{display:flex;gap:12px;align-items:center;margin-top:18px}.app-error-actions a,.app-error-actions button{min-height:44px;display:inline-flex;align-items:center;justify-content:center;padding:0 18px;border:1px solid rgba(255,255,255,.24);border-radius:24px;background:transparent;color:#f5f3ee;font:12px Inter,sans-serif;text-decoration:none;cursor:pointer}.app-error-actions button{border-color:#ffd700;background:#ffd700;color:#080808;font-weight:600}.app-error-actions a:focus-visible,.app-error-actions button:focus-visible{outline:2px solid #fff;outline-offset:3px}`}</style>
          <p style={{ color: '#aaa69d', fontSize: 10, fontWeight: 600, letterSpacing: '.18em' }}>BARDAPURE PRODUCTIONS</p>
          <h1 className="app-error-title">We hit a snag.</h1>
          <p className="app-error-copy">The page couldn’t load as expected. Refresh to try again, or get in touch with our team.</p>
          <div className="app-error-actions">
            <button type="button" onClick={() => window.location.reload()}>Refresh page</button>
            <a href="mailto:hello@bardapure.com">Contact us</a>
          </div>
        </main>
      )
    }

    return this.props.children
  }
}
