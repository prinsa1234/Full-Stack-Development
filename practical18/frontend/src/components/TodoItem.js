import React, { useState } from 'react';

function TodoItem({ todo, onToggle, onDelete, onSave, format }) {
  const [editing, setEditing] = useState(false);
  const [local, setLocal] = useState({
    title: todo.title,
    description: todo.description || '',
    priority: todo.priority || 'medium',
    dueDate: todo.dueDate ? new Date(todo.dueDate).toISOString().split('T')[0] : ''
  });

  function handleChange(e){
    const { name, value } = e.target;
    setLocal(prev => ({ ...prev, [name]: value }));
  }

  async function save(){
    await onSave(todo._id, {
      title: local.title,
      description: local.description,
      priority: local.priority,
      dueDate: local.dueDate ? new Date(local.dueDate) : null
    });
    setEditing(false);
  }

  return (
    <div className={`todo-card ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-left">
        <input type="checkbox" checked={todo.completed} onChange={onToggle} />
        {!editing ? (
          <div className="todo-content">
            <h4>{todo.title}</h4>
            {todo.description && <p className="small">{todo.description}</p>}
            <div className="meta">
              <span className={`chip ${todo.priority}`}>{todo.priority}</span>
              {todo.dueDate && <span className="small">Due: {format(new Date(todo.dueDate), 'dd MMM yyyy')}</span>}
            </div>
          </div>
        ) : (
          <div className="todo-edit">
            <input name="title" value={local.title} onChange={handleChange} />
            <input name="description" value={local.description} onChange={handleChange} />
            <div className="row">
              <select name="priority" value={local.priority} onChange={handleChange}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <input name="dueDate" value={local.dueDate} onChange={handleChange} type="date" />
            </div>
          </div>
        )}
      </div>

      <div className="todo-right">
        {!editing ? (
          <>
            <button className="icon" onClick={()=> setEditing(true)}>Edit</button>
            <button className="icon danger" onClick={onDelete}>Delete</button>
          </>
        ) : (
          <>
            <button className="icon" onClick={save}>Save</button>
            <button className="icon ghost" onClick={()=> { setEditing(false); setLocal({ title: todo.title, description: todo.description || '', priority: todo.priority, dueDate: todo.dueDate ? new Date(todo.dueDate).toISOString().split('T')[0] : '' })}}>Cancel</button>
          </>
        )}
      </div>
    </div>
  );
}

export default TodoItem;
