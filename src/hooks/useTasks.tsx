import { useContext } from "react";
import { TasksContext } from "../context/TasksContext";

interface TaskFormErrors {
    title: string;
    description: string;
}

export const useTask = () => {
    const context = useContext(TasksContext);
    if (!context) {
        throw new Error("No contexts found");
    }

    const validateForm = (title: string, description: string): { isValid: boolean; errors: TaskFormErrors } => {
        let isValid = true;
        const errors = {
            title: '',
            description: ''
        };

        // Title validations
        if (!title) {
            errors.title = 'Title is required';
            isValid = false;
        } else if (title.length < 3) {
            errors.title = 'Title must be at least 3 characters';
            isValid = false;
        } else if (title.length > 50) {
            errors.title = 'Title cannot exceed 50 characters';
            isValid = false;
        }

        // Description validations
        if (!description) {
            errors.description = 'Description is required';
            isValid = false;
        } else if (description.length < 3) {
            errors.description = 'Description must be at least 3 characters';
            isValid = false;
        }

        return { isValid, errors };
    };

    return {
        ...context,
        validateForm
    };
};