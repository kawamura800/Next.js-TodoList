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

  // APIを叩く
  const callAPI = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users")
    const users = await res.json();
    console.log(users[0].username);
    
  }

  return (
    <main >
      <CenterTitle />

      <div>
        <input type="text" value={text} onChange={changeText} />
        <h1>{text}</h1>
        <button onClick={addTodos}>aboutボタン</button>
      </div>
      <div>
        <button onClick={callAPI}>API GET</button>
      </div>
    </main>
  )
}
