import { Link } from 'react-router-dom';
import { useSkillOfTheDay } from '../../hooks/useSkills';
import { Sparkles } from 'lucide-react';
import { getCountryFlag } from '../../lib/utils';

export default function SkillOfTheDay() {
  const { data: skill, isLoading } = useSkillOfTheDay();

  if (isLoading) {
    return (
      <div className="border rounded-lg p-8 animate-pulse bg-muted/50">
        <div className="h-6 w-48 bg-muted rounded mb-4" />
        <div className="h-4 w-full bg-muted rounded mb-2" />
        <div className="h-4 w-3/4 bg-muted rounded" />
      </div>
    );
  }

  if (!skill) return null;

  return (
    <div className="border rounded-lg p-8 bg-gradient-to-br from-primary/5 to-primary/10">
      <div className="flex items-center gap-2 text-primary mb-4">
        <Sparkles className="h-5 w-5" />
        <span className="font-semibold">Skill of the Day</span>
      </div>

      <Link to={`/skills/${skill.slug}`} className="group block">
        <h2 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
          {skill.title}
        </h2>
        <p className="text-muted-foreground mb-4">{skill.description}</p>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-primary" />
            {skill.category_name}
          </span>
          {skill.country && (
            <span className="flex items-center gap-1">
              {getCountryFlag(skill.country)}
              {skill.country}
            </span>
          )}
        </div>
      </Link>
    </div>
  );
}