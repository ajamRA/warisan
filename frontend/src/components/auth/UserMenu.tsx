import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { User, LogOut, Settings } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export default function UserMenu() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 p-2 hover:bg-accent rounded-md"
      >
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
          <User className="h-4 w-4" />
        </div>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-background border rounded-md shadow-lg py-1 z-50">
          <div className="px-4 py-2 border-b">
            <p className="font-medium">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
          <Link
            to="/profile"
            className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-accent"
            onClick={() => setOpen(false)}
          >
            <Settings className="h-4 w-4" />
            Profile
          </Link>
          <button
            onClick={() => { logout(); setOpen(false); }}
            className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-accent w-full text-left text-red-500"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}