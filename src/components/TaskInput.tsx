
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ClipboardPenLine, Loader2 } from "lucide-react";

interface TaskInputProps {
  onSubmit: (task: string) => void;
  isLoading: boolean;
  initialValue?: string;
}

const TaskInput: React.FC<TaskInputProps> = ({ onSubmit, isLoading, initialValue = '' }) => {
  const [taskInput, setTaskInput] = useState<string>(initialValue);

  useEffect(() => {
    if (initialValue && initialValue !== taskInput) {
      setTaskInput(initialValue);
    }
  }, [initialValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskInput.trim().length > 0) {
      onSubmit(taskInput);
    }
  };

  const predefinedTasks = [
    "Passport Application",
    "Aadhaar Card Registration",
    "PAN Card Application",
    "Driving License Application",
    "Voter ID Registration",
    "Property Registration",
    "Marriage Registration"
  ];

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-6 border border-border/60">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <ClipboardPenLine className="mr-2 h-5 w-5 text-primary" />
        Enter Administrative Task
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          <Input
            placeholder="e.g., Passport Application, Aadhaar Registration..."
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            className="flex-grow"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              "Get Process Steps"
            )}
          </Button>
        </div>

        <div className="mt-4">
          <p className="text-sm text-muted-foreground mb-2">Suggested tasks:</p>
          <div className="flex flex-wrap gap-2">
            {predefinedTasks.map((task) => (
              <Button
                key={task}
                type="button"
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => setTaskInput(task)}
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
