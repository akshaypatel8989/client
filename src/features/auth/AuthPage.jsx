import { useState } from 'react'
import { Activity, ArrowRight, LockKeyhole, Mail, UserRound } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLoginMutation, useRegisterMutation } from '../../services/api'

export default function AuthPage({ mode = 'login' }) {
  const isSignup = mode === 'signup'
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({ name: '', email: '', password: '', department: '' })
  const [error, setError] = useState('')
  const [login, loginState] = useLoginMutation()
  const [register, registerState] = useRegisterMutation()
  const pending = loginState.isLoading || registerState.isLoading

  const submit = async (event) => {
    event.preventDefault(); setError('')
    try {
      const result = isSignup ? await register(form).unwrap() : await login({ email: form.email, password: form.password }).unwrap()
      if (result.user) navigate(location.state?.from || '/', { replace: true })
    } catch (requestError) { setError(requestError?.data?.message || 'We could not complete that request.') }
  }
  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value })
  return <main className="auth-layout"><section className="auth-art"><div className="brand brand-light"><span className="brand-mark"><Activity size={18} /></span><span>tempo</span></div><div className="auth-art-copy"><p className="eyebrow">ATTENDANCE, IN SYNC</p><h1>Make every hour<br /><em>count.</em></h1><p>A calmer way to understand where your team is, when they arrive, and how work gets done.</p></div><div className="art-stats"><span><strong>94.2%</strong><small>attendance rate</small></span><span><strong>08:47</strong><small>latest check-in</small></span></div></section><section className="auth-panel"><div className="auth-form-wrap"><p className="auth-kicker">NORTHSTAR WORKSPACE</p><h2>{isSignup ? 'Create your account' : 'Welcome back'}</h2><p className="auth-subtitle">{isSignup ? 'Set up your profile to get started.' : 'Sign in to your attendance workspace.'}</p><form onSubmit={submit}>{isSignup && <label><span>Full name</span><div className="input-wrap"><UserRound size={17} /><input name="name" value={form.name} onChange={update} required placeholder="Jordan Davis" /></div></label>}<label><span>Work email</span><div className="input-wrap"><Mail size={17} /><input name="email" type="email" value={form.email} onChange={update} required placeholder="you@company.com" /></div></label>{isSignup && <label><span>Department</span><div className="input-wrap"><Activity size={17} /><input name="department" value={form.department} onChange={update} placeholder="Engineering" /></div></label>}<label><span>Password</span><div className="input-wrap"><LockKeyhole size={17} /><input name="password" type="password" minLength="8" value={form.password} onChange={update} required placeholder="At least 8 characters" /></div></label>{error && <p className="form-error">{error}</p>}<button className="primary-button auth-submit" disabled={pending}>{pending ? 'Please wait...' : isSignup ? 'Create account' : 'Sign in'} <ArrowRight size={17} /></button></form><p className="auth-switch">{isSignup ? 'Already have an account?' : 'New to tempo?'} <button onClick={() => navigate(isSignup ? '/login' : '/signup')}>{isSignup ? 'Sign in' : 'Create an account'}</button></p></div></section></main>
}
