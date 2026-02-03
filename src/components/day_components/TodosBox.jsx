import React, { useState, useEffect } from 'react';
import '../../assets/styles/todos.scss';

function TodosBox({ year, month, day }) {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const [loading, setLoading] = useState(true);

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthNumber = months.indexOf(month) + 1;
    const dateStr = `${year}-${String(monthNumber).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    useEffect(() => {
        fetchTodos();
    }, [year, month, day]);

    const fetchTodos = async () => {
        try {
            const response = await fetch(`/api/todos/${year}/${month}/${day}/`);
            const data = await response.json();
            setTodos(data);
        } catch (error) {
            console.error('Error fetching todos:', error);
        } finally {
            setLoading(false);
        }
    };

    const addTodo = async (e) => {
        e.preventDefault();
        if (!newTodo.trim()) return;

        try {
            const response = await fetch('/api/todos/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ date: dateStr, title: newTodo })
            });
            
            if (!response.ok) throw new Error('Failed to create todo');
            
            const createdTodo = await response.json();
            setTodos([...todos, createdTodo]);
            setNewTodo('');
        } catch (error) {
            console.error('Error creating todo:', error);
        }
    };

    const toggleTodo = async (todoId, completed) => {
        try {
            const response = await fetch(`/api/todos/${todoId}/`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ completed: !completed })
            });
            
            if (!response.ok) throw new Error('Failed to update todo');
            
            const updatedTodo = await response.json();
            setTodos(todos.map(t => t.id === todoId ? updatedTodo : t));
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    const deleteTodo = async (todoId) => {
        try {
            const response = await fetch(`/api/todos/${todoId}/`, { method: 'DELETE' });
            
            if (!response.ok) throw new Error('Failed to delete todo');
            
            setTodos(todos.filter(t => t.id !== todoId));
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    if (loading) return <div className="todos-box"><p>Loading...</p></div>;

    return (
        <div className="todos-box">
            <h3>Tasks</h3>
            
            <form onSubmit={addTodo} className="todo-input-form">
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Add a new task..."
                    className="todo-input"
                />
                <button type="submit" className="add-btn">Add</button>
            </form>

            <hr/>

            {todos.length === 0 ? (
                <p className="empty-todos">No tasks for today</p>
            ) : (
                <ul className="todos-list">
                    {todos.map(todo => (
                        <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => toggleTodo(todo.id, todo.completed)}
                                className="todo-checkbox"
                            />
                            <span className="todo-title">{todo.title}</span>
                            <button onClick={() => deleteTodo(todo.id)} className="delete-btn">
                                ✕
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default TodosBox;