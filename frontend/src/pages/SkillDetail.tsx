import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSkill } from '../hooks/useSkills';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Clock, MapPin, Globe, Download, ExternalLink } from 'lucide-react';
import { getDifficultyColor, getCountryFlag, formatDate } from '../lib/utils';

export default function SkillDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const { data: skill, isLoading } = useSkill(slug!);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-2/3 bg-muted rounded" />
          <div className="h-4 w-1/2 bg-muted rounded" />
          <div className="h-64 bg-muted rounded" />
        </div>
      </div>
    );
  }

  if (!skill) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold">Skill not found</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="max-w-4xl mx-auto">
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(skill.difficulty)}`}>
              {skill.difficulty}
            </span>
            {skill.category_name && (
              <span className="text-sm text-muted-foreground">{skill.category_name}</span>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{skill.title}</h1>
          <p className="text-lg text-muted-foreground">{skill.description}</p>

          <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-muted-foreground">
            {skill.learning_time && (
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {skill.learning_time}
              </span>
            )}
            {skill.country && (
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {getCountryFlag(skill.country)} {skill.country}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Globe className="h-4 w-4" />
              {skill.language}
            </span>
          </div>

          {skill.author_name && (
            <div className="flex items-center gap-3 mt-4 pt-4 border-t">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-medium">
                {skill.author_name.charAt(0)}
              </div>
              <div>
                <p className="font-medium">{skill.author_name}</p>
                <p className="text-xs text-muted-foreground">{formatDate(skill.created_at)}</p>
              </div>
            </div>
          )}
        </header>

        <div className="prose prose-lg max-w-none mb-8">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {skill.content_markdown}
          </ReactMarkdown>
        </div>

        {skill.video_url && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Video Tutorial</h2>
            <a
              href={skill.video_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              <ExternalLink className="h-4 w-4" />
              Watch video tutorial
            </a>
          </div>
        )}

        <div className="border-t pt-8 mt-8">
          <h2 className="text-xl font-bold mb-4">{t('skill.export')}</h2>
          <div className="flex gap-4">
            <a
              href={`/api/export/skill/${skill.id}/pdf`}
              className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-accent transition-colors"
            >
              <Download className="h-4 w-4" />
              PDF
            </a>
            <a
              href={`/api/export/skill/${skill.id}/html`}
              className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-accent transition-colors"
            >
              <Download className="h-4 w-4" />
              HTML
            </a>
            <a
              href={`/api/export/skill/${skill.id}/json`}
              className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-accent transition-colors"
            >
              <Download className="h-4 w-4" />
              JSON
            </a>
          </div>
        </div>
      </article>
    </div>
  );
}