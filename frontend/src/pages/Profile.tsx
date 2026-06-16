import { useAuth } from '../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import api from '../lib/api';
import SkillGrid from '../components/skill/SkillGrid';
import { formatDate } from '../lib/utils';

export default function Profile() {
  const { user } = useAuth();

  const { data: profile } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: () => api.get(`/users/${user?.id}`).then((r) => r.data),
    enabled: !!user?.id,
  });

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>Please log in to view your profile</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="border rounded-lg p-6 bg-card mb-8">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold">
            {user.name.charAt(0)}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-muted-foreground">{user.email}</p>
            {profile?.created_at && (
              <p className="text-sm text-muted-foreground mt-1">
                Member since {formatDate(profile.created_at)}
              </p>
            )}
          </div>
        </div>

        {profile?.badges?.length > 0 && (
          <div className="mt-6 pt-6 border-t">
            <h2 className="font-semibold mb-3">Badges</h2>
            <div className="flex flex-wrap gap-2">
              {profile.badges.map((badge: any) => (
                <span key={badge.id} className="px-3 py-1 bg-primary/10 rounded-full text-sm">
                  {badge.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <h2 className="text-xl font-bold mb-4">Your Skills</h2>
      <SkillGrid skills={profile?.skills || []} />
    </div>
  );
}