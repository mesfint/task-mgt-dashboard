import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

import { TasksProvider } from "../../context/TasksContext";
import AddTaskForm from "./AddTaskForm";

describe("Add TaskForm Component", () => {
    it("renders AddTaskForm and allows task additions",()=>{
        render(
            <TasksProvider>
                <AddTaskForm />
            </TasksProvider>
        );
        //elemets
        const titleInput = screen.getByLabelText(/title/i);
        const descriptionInput = screen.getByLabelText(/description/i);
        const addButton = screen.getByRole("button", { name: /add task/i});

        fireEvent.change(titleInput, { target: { value: "Test Task"}});
        fireEvent.change(descriptionInput, { target: { value: "Test Task"}});
        fireEvent.click(addButton);

        expect(titleInput).toHaveValue("");
        expect(descriptionInput).toHaveValue("");

    })

  
  
});
