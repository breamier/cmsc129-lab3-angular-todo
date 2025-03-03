// Interface for Tasks

export interface Task {
    id?: number,
    name: string,
    dateCreated: string,
    dueDate: string,
    reminder: boolean,
    priority: string,
}