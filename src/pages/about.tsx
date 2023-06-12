"use client";
import CenterTitle from '../../components/CenterTitle'
import { useState } from 'react';

export default function Home() {
  const [text, setText] = useState<string>('')
  const [todos, setTodos] = useState<string[]>([])

  const changeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const addTodos = () => {
    const newTodos = [...todos]
    newTodos.push(text);
    setTodos(newTodos)
    setText("")
  };

  return (
    <main >
      <CenterTitle />

      <div>
        <input type="text" value={text} onChange={changeText} />
        <h1>{text}</h1>
        <button onClick={addTodos}>aboutボタン</button>
      </div>
      <div>
        <ul>
          {todos.map((todo) => (
            <li key={todo}>
              <p>{todo}</p>
              <button>完了</button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
