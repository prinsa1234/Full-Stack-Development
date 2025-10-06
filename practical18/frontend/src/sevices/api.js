// Put your backend URL here. When running locally: http://localhost:5000
const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export async function fetchTodos(){
  const res = await fetch(`${BASE_URL}/api/todos`);
  return res.json();
}
export async function createTodo(payload){
  const res = await fetch(`${BASE_URL}/api/todos`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload)
  });
  return res.json();
}
export async function updateTodo(id, payload){
  const res = await fetch(`${BASE_URL}/api/todos/${id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload)
  });
  return res.json();
}
export async function deleteTodo(id){
  const res = await fetch(`${BASE_URL}/api/todos/${id}`, { method: 'DELETE' });
  return res.json();
}
