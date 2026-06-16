import { Link } from 'react-router-dom';
import { Clock, MapPin } from 'lucide-react';
import { Skill } from '../../types';
import { getDifficultyColor, getCountryFlag } from '../../lib/utils';

export default function SkillCard({ skill }: { skill: Skill }) {
  return (
    <Link to={`/skills/${skill.slug}`} className="group block">
      <div className="border rounded-lg p-4 hover:shadow-lg transition-all duration-200 bg-card">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg group-hover:text-primary transition-colors line-clamp-2">
            {skill.title}
          </h3>
          <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(skill.difficulty)}`}>
            {skill.difficulty}
          </span>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {skill.description}
        </p>

        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          {skill.category_name && (
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-primary" />
              {skill.category_name}
            </span>
          )}
          {skill.learning_time && (
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {skill.learning_time}
            </span>
          )}
          {skill.country && (
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {getCountryFlag(skill.country)}
            </span>
          )}
        </div>

        {skill.author_name && (
          <div className="mt-3 pt-3 border-t flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">
              {skill.author_name.charAt(0)}
            </div>
            <span className="text-xs text-muted-foreground">{skill.author_name}</span>
          </div>
        )}
      </div>
    </Link>
  );
}