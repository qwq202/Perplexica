'use client';
import Select from '../ui/Select';
import { useLanguage } from './Provider';

const LanguageSwitcher = ({ className }: { className?: string }) => {
  const { language, setLanguage } = useLanguage();
  return (
    <Select
      className={className}
      value={language}
      onChange={(e) => setLanguage(e.target.value as any)}
      options={[
        { value: 'en', label: 'English' },
        { value: 'zh', label: '简体中文' },
      ]}
    />
  );
};

export default LanguageSwitcher;
