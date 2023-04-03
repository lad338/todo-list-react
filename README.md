# todo-list-react
Single page Todo list in React. Front using this [Todo List Backend](https://github.com/lad338/todo-list-backend). UI elements from [MUI](https://mui.com/)

## Deployment
Example Netlify deployment: https://todo-list-lad338.netlify.app/

## Required features
- Functionality:
  - Both lists should be alphabetically sorted 
  - User can check and uncheck tasks and tasks suppose to appear in the corresponding column
  - The “To Do” list is unlimited
  - The “Done” list should only show 10 most recently completed tasks
  - “Delete all tasks” deletes everything after prompting for user’s confirmation
- Searching:
  - As the user enters text in the search box, both columns are filtered to display only items matching the text entered thus far
- Single page web app (SPA)

## Optional features added
- Dark mode toggle (fetching user's browser preference on page loading)
- Loading only 15 tasks for todo list, load more on scrolling to the bottom
- Snackbar notifications on action
- Offline mode using IndexedDB (with Dexie), connected when toggled on or backend is not available for demonstration purpose
- Mobile view for devices with smaller 
- Added service worker for downloading app on phones