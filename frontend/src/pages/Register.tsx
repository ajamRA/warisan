import { useTranslation } from 'react-i18next';
import RegisterForm from '../components/auth/RegisterForm';

export default function Register() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <h1 className="text-2xl font-bold text-center mb-8">{t('auth.registerTitle')}</h1>
      <div className="border rounded-lg p-6 bg-card">
        <RegisterForm />
      </div>
    </div>
  );
}