import { Skill } from '../../types';
import SkillCard from './SkillCard';

export default function SkillGrid({ skills }: { skills: Skill[] }) {
  if (!skills?.length) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No skills found
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {skills.map((skill) => (
        <SkillCard key={skill.id} skill={skill} />
      ))}
    </div>
  );
}