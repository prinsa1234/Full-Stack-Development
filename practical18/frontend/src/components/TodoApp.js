import React, { useEffect, useState } from 'react';
import { fetchTodos, createTodo, updateTodo, deleteTodo } from '../sevices/api';
import TodoItem from './TodoItem';
import { format } from 'date-fns';
import * as api from '../sevices/api.js';


function TodoApp(){
  const [todos, setTodos] = useState([]);
  const [form, setForm] = useState({ title:'', description:'', priority:'medium', dueDate:''});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function load(){
    setLoading(true);
    try {
      const data = await fetchTodos();
      setTodos(data);
    } catch (e) {
      setError('Failed to load todos');
    } finally { setLoading(false); }
  }

  useEffect(()=> { load(); }, []);

  function onChange(e){
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  async function onSubmit(e){
    e.preventDefault();
    if (!form.title.trim()) { setError('Please add a title'); return; }
    setError('');
    try {
      const newTodo = await createTodo({
        ...form,
        dueDate: form.dueDate ? new Date(form.dueDate) : null
      });
      setTodos(prev => [newTodo, ...prev]);
      setForm({ title:'', description:'', priority:'medium', dueDate:'' });
    } catch (err) {
      setError('Failed to create todo');
    }
  }

  async function toggleComplete(todo){
    const updated = await updateTodo(todo._id, { completed: !todo.completed });
    setTodos(prev => prev.map(t => t._id === updated._id ? updated : t));
  }

  async function removeTodo(id){
    await deleteTodo(id);
    setTodos(prev => prev.filter(t => t._id !== id));
  }

  async function saveEdit(id, data){
    const updated = await updateTodo(id, data);
    setTodos(prev => prev.map(t => t._id === updated._id ? updated : t));
  }

  return (
    <div className="container">
      <header className="hero">
        <div className="hero-grid">
          <div className="hero-left">
            <h1>SunnyTodos</h1>
            <p className="sub">A pleasant, responsive MERN todo app — stay focused and feel accomplished.</p>
            <form className="todo-form" onSubmit={onSubmit}>
              <input name="title" value={form.title} onChange={onChange} placeholder="What needs doing?" />
              <div className="row">
                <input name="description" value={form.description} onChange={onChange} placeholder="Few details (optional)" />
                <select name="priority" value={form.priority} onChange={onChange}>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                <input name="dueDate" value={form.dueDate} onChange={onChange} type="date" />
              </div>
              <div className="form-actions">
                <button className="btn" type="submit">Add Todo</button>
                <button type="button" className="btn ghost" onClick={()=> setForm({ title:'', description:'', priority:'medium', dueDate:'' })}>Clear</button>
              </div>
            </form>
            {error && <p className="error">{error}</p>}
          </div>
          <div className="hero-right">
            <div className="stats-card">
              <h3>Quick Stats</h3>
              <p>Total: <strong>{todos.length}</strong></p>
              <p>Completed: <strong>{todos.filter(t=>t.completed).length}</strong></p>
              <p>High Priority: <strong>{todos.filter(t=>t.priority==='high').length}</strong></p>
            </div>
          </div>
        </div>
      </header>

      <main className="todos-list">
        {loading ? <p>Loading...</p> : (
          todos.length === 0 ? <p className="empty">No todos — add your first one!</p> :
          todos.map(todo => (
            <TodoItem key={todo._id}
                      todo={todo}
                      onToggle={() => toggleComplete(todo)}
                      onDelete={() => removeTodo(todo._id)}
                      onSave={saveEdit}
                      format={format}
            />
          ))
        )}
      </main>

      <footer className="footer">
        <p>Made with ☀️</p>
      </footer>
    </div>
  );
}

export default TodoApp;
