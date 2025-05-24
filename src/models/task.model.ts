export type Task = {
  id?: string;
  title: string;
  description: string;
  priority: string;
  created_at?: string;
};

export const TaskPriorityType = {
  "1": "Low",
  "2": "Medium",
  "3": "High",
  "4": "Urgent",
};
