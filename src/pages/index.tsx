"use client";
import { type } from "os";
import { useState } from "react";

export default function Home() {
  // setTextでtextを更新。初期値は空で定義
  const [text, setText] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [date, setDate] = useState<string>("");
  const [deadlines, setDeadlines] = useState<string[]>([]);

  //  Todoオブジェクトの型定義
  type Todo = {
    inputValue: string;
    index: number; //key指定のため
    date: string;
  };

  //  changeText関数
  const changeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value); //  event.target.valueで入力されたものを取り出しtextを変更
  };

  //  日付を取得するchangeDate関数
  const changeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value); //  event.target.valueで入力されたものを取り出しdateを変更
  };

  //  todoを追加するaddTodo関数
  const addTodos = () => {
    //  新しいTodo作成
    const newTodo: Todo = {
      inputValue: text,
      index: todos.length,
      date: date,
    };

    setTodos([newTodo, ...todos]);
    console.log(text);
    setText("");
  };

  //  deadlineを追加するaddDeadline関数
  const addDeadlines = () => {
    const newDeadlines = [...deadlines]; //  deadlinesをすべて取り出す
    newDeadlines.push(date); //  newTodos配列にdateを挿入
    setDeadlines(newDeadlines); //  todosをnewTodosに更新
    setDate(""); //  dateを初期化
  };

  //  Todoの編集
  const editTodo = (index: number, inputValue: string) => {
    //  todosオブジェクトの中身を書き換えないようにmap()を使ってディープコピー
    const copyTodo = todos.map((todo) => ({ ...todo }));
    console.log(copyTodo);

    const newTodos = copyTodo.map((todo) => {
      if (todo.index === index) {
        todo.inputValue = inputValue; //対象のTodoのinputvalueを書き換え
      }
      return todo;
    });

    setTodos(newTodos);
  };

  //  deadlineの編集
  const editDeadline = (index: number, inputDate: string) => {
    //  
  };

  //  todoを削除するdeleteTodo関数
  //  number型の引数index
  const deleteTodo = (index: number) => {
    const newTodos = [...todos];
    //  newTodos配列のindex番目を1つ削除する
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  //  deaelineを削除するdeleteDeadline関数
  //  number型の引数index
  const deleteDeadline = (index: number) => {
    const newDeadlines = [...deadlines];
    //  newDeadlines配列のindex番目を1つ削除する
    newDeadlines.splice(index, 1);
    setDeadlines(newDeadlines);
  };

  //  今日の日付を取得
  const nowDate = new Date();
  const nowDateString =
    nowDate.getFullYear() +
    "-" +
    ("0" + (nowDate.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + nowDate.getDate()).slice(-2);

  return (
    <>
      <main>
        <h1>Todo</h1>
        <div className="form">
          <input type="text" value={text} onChange={changeText} />
          <input
            type="date"
            min={nowDateString}
            value={date}
            onChange={changeDate}
          />
          <button
            onClick={() => {
              if (text == "") {
                alert("Todoを入力してください");
              } else if (date == "") {
                alert("期日を選択してください");
              } else {
                addTodos();
                addDeadlines();
              }
            }}
          >
            追加
          </button>
        </div>

        <div>
          <ul>
            {todos.map((todo) => (
              <li key={todo.index}>
                <input
                  type="text"
                  value={todo.inputValue}
                  onChange={(e) => editTodo(todo.index, e.target.value)}
                />
                <input
                  type="date"
                  min={nowDateString}
                  value={deadlines[todo.index]}
                  onChange={(e) =>
                    editDeadline(todo.index, e.target.value)
                  }
                />

                <button
                  onClick={() => {
                    deleteTodo(todo.index);
                    deleteDeadline(todo.index);
                  }}
                >
                  削除
                </button>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}