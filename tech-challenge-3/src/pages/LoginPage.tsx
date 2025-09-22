import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../lib/auth';

export default function LoginPage() {
  const [role, setRole] = useState<'student' | 'teacher'>('student');
  const navigate = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    auth.setRole(role);
    navigate('/', { replace: true });
  };

  return (
    <form onSubmit={submit} style={{ maxWidth: 360 }}>
      <h1>Login</h1>
      <p>Selecione o perfil para continuar.</p>
      <label>
        <input type="radio" name="role" value="student"
               checked={role === 'student'} onChange={() => setRole('student')} />
        Estudante
      </label>
      <br />
      <label>
        <input type="radio" name="role" value="teacher"
               checked={role === 'teacher'} onChange={() => setRole('teacher')} />
        Professor(a)
      </label>
      <br /><br />
      <button type="submit">Entrar</button>
    </form>
  );
}