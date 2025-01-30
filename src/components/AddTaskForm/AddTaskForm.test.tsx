import "@testing-library/jest-dom";
import { act, fireEvent, render, screen } from "@testing-library/react";


import { TasksProvider } from "../../context/TasksContext";
import AddTaskForm from "./AddTaskForm";

describe("Add TaskForm Component", () => {
    it("renders AddTaskForm and allows task additions", () => {
        render(
            <TasksProvider>
                <AddTaskForm />
            </TasksProvider>
        );
        
        const titleInput = screen.getByLabelText(/title/i);
        const descriptionInput = screen.getByLabelText(/description/i);
        const addButton = screen.getByRole("button", { name: /add task/i });

        fireEvent.change(titleInput, { target: { value: "Test Task" } });
        fireEvent.change(descriptionInput, { target: { value: "Test Description" } });
        fireEvent.click(addButton);

        expect(titleInput).toHaveValue("");
        expect(descriptionInput).toHaveValue("");
    });

    it("shows error state for empty inputs", () => {
        render(
            <TasksProvider>
                <AddTaskForm />
            </TasksProvider>
        );

        const addButton = screen.getByRole("button", { name: /add task/i });
        fireEvent.click(addButton);

        const titleInput = screen.getByLabelText(/title/i);
        const descriptionInput = screen.getByLabelText(/description/i);
        
        expect(titleInput).toHaveAttribute('aria-invalid', 'true');
        expect(descriptionInput).toHaveAttribute('aria-invalid', 'true');
    });

    it("handles input changes correctly", () => {
        render(
            <TasksProvider>
                <AddTaskForm />
            </TasksProvider>
        );

        const titleInput = screen.getByLabelText(/title/i);
        const descriptionInput = screen.getByLabelText(/description/i);

        fireEvent.change(titleInput, { target: { value: "New Task" } });
        fireEvent.change(descriptionInput, { target: { value: "Task Description" } });

        expect(titleInput).toHaveValue("New Task");
        expect(descriptionInput).toHaveValue("Task Description");
    });

    it("disables submit button while form is processing", async () => {
        render(
            <TasksProvider>
                <AddTaskForm />
            </TasksProvider>
        );

        const titleInput = screen.getByLabelText(/title/i);
        const descriptionInput = screen.getByLabelText(/description/i);
        const addButton = screen.getByRole("button", { name: /add task/i });
    
        // Fill in valid form data
    await act(async () => {
        fireEvent.change(titleInput, { target: { value: "Valid Title" } });
        fireEvent.change(descriptionInput, { target: { value: "Valid Description" } });
    });

    // Submit form
    await act(async () => {
        fireEvent.click(addButton);
    });

    // Verify button is disabled
    expect(addButton).toHaveAttribute('disabled');
});
});
