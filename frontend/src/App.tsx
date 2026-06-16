import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { I18nextProvider } from 'react-i18next';
import i18n from './lib/i18n';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import SkillDetail from './pages/SkillDetail';
import Search from './pages/Search';
import Category from './pages/Category';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import SubmitSkill from './pages/SubmitSkill';
import About from './pages/About';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 5 * 60 * 1000, retry: 1 },
  },
});

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="skills/:slug" element={<SkillDetail />} />
              <Route path="search" element={<Search />} />
              <Route path="category/:slug" element={<Category />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="profile" element={<Profile />} />
              <Route path="submit" element={<SubmitSkill />} />
              <Route path="about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </I18nextProvider>
  );
}

export default App;