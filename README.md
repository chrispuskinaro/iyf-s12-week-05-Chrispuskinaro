# MyTo-Do List - Week 05 DOM Manipulation

**IYF Season 12 - Week 05**

Live Demo: https://chrispuskinaro.github.io/iyf-s12-week-05-chrispuskinaro/

## Features
- Add new task (Enter key or Add button)
- Refuse empty / spaces-only tasks
- Clear input after adding
- Click task to mark as completed / active (line-through)
- Delete task with delete button
- Filter: All / Active / Completed
- Count: "X items left"
- Clear Completed button
- Bonus: Double-click to edit, Enter to save, Escape to cancel

## Rules Followed (from marking scheme)
- Uses event delegation (one listener on UL, not per task)
- Uses textContent (never innerHTML) - safe from injection
- Uses classList for completed state
- Uses addEventListener
- Keeps tasks in array of objects and re-renders

## How to use
1. Open Live Demo link
2. Type task in "What needs to be done?" and press Add or Enter
3. Click task to complete
4. Double-click to edit

## Tech
- HTML, CSS, Vanilla JavaScript (no framework)
