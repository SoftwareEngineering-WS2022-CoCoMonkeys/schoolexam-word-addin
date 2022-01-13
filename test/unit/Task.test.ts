import Task from "../../src/word/Task";
import TaskDTO from "../../src/dto/TaskDTO";

test("equals() should work as expected", () => {
  const task = new Task("123", "Aufgabe 1", 3, 100, null);
  expect(task.equals(task)).toBeTruthy();

  const sameTask = new Task("123", "Aufgabe 1", 3, 100, null);
  expect(task.equals(sameTask)).toBeTruthy();

  const differentTask = new Task("456", "Aufgabe 3", 4, 200, null);
  expect(task.equals(differentTask)).toBeFalsy();

  const taskDifferentId = new Task("124", "Aufgabe 1", 3, 100, null);
  expect(task.equals(taskDifferentId)).toBeFalsy();
});

test("assembleDTO() should work as expected", () => {
  const id = "123";
  const title = "Aufgabe 1";
  const maxPoints = 2;
  const task = new Task(id, title, maxPoints, 100, null);

  const expected = new TaskDTO(id, title, maxPoints);
  const actual = task.assembleDTO();
  for (const prop in expected) {
    expect(actual[prop]).toBe(expected[prop]);
  }
});
