import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ClipboardPenLine, Loader2 } from "lucide-react";
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';

interface TaskInputProps {
  onSubmit: (task: string) => void;
  onChange?: (value: string) => void;
  value?: string;
  isLoading: boolean;
  placeholder?: string;
  submitLabel?: string;
  initialValue?: string;
}

const TaskInput: React.FC<TaskInputProps> = ({ 
  onSubmit, 
  onChange, 
  value, 
  isLoading, 
  placeholder, 
  submitLabel, 
  initialValue = '' 
}) => {
  // For backward compatibility - either use controlled value or internal state
  const isControlled = value !== undefined && onChange !== undefined;
  const [taskInput, setTaskInput] = useState<string>(isControlled ? value : (initialValue || ''));
  const { t } = useTranslation(['common', 'process']);
  const { currentLanguage } = useLanguage();
  const langClass = `lang-${currentLanguage}`;

  useEffect(() => {
    if (initialValue && !isControlled && initialValue !== taskInput) {
      setTaskInput(initialValue);
    }
  }, [initialValue, isControlled, taskInput]);

  useEffect(() => {
    if (isControlled && value !== taskInput) {
      setTaskInput(value);
    }
  }, [value, isControlled]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setTaskInput(newValue);
    if (isControlled && onChange) {
      onChange(newValue);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskInput.trim().length > 0) {
      onSubmit(taskInput);
    }
  };

  const predefinedTasks = [
    t('process:tasks.passport'),
    t('process:tasks.aadhaar'),
    t('process:tasks.pan'),
    t('process:tasks.driving'),
    t('process:tasks.voter'),
    t('process:tasks.property'),
    t('process:tasks.marriage')
  ];

  const handleTaskClick = (task: string) => {
    setTaskInput(task);
    if (isControlled && onChange) {
      onChange(task);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-6 border border-border/60">
      <h2 className={`text-xl font-semibold mb-4 flex items-center ${langClass}`}>
        <ClipboardPenLine className="mr-2 h-5 w-5 text-primary" />
        {t('process:enter_task')}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          <Input
            placeholder={placeholder || t('process:task_placeholder')}
            value={taskInput}
            onChange={handleInputChange}
            className="flex-grow"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t('process:generating')}
              </>
            ) : (
              submitLabel || t('process:get_steps')
            )}
          </Button>
        </div>

        <div className="mt-4">
          <p className={`text-sm text-muted-foreground mb-2 ${langClass}`}>{t('process:suggested_tasks')}:</p>
          <div className="flex flex-wrap gap-2">
            {predefinedTasks.map((task) => (
              <Button
                key={task}
                type="button"
                variant="outline"
                size="sm"
                className={`text-xs ${langClass}`}
                onClick={() => handleTaskClick(task)}
                disabled={isLoading}
              >
                {task}
              </Button>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};

export default TaskInput;
