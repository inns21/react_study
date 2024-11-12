import './App.css';
import { React, useEffect, useState } from 'react';

function Nav({ list, onclick }) {
  console.log(list);
  let listHTML = list.map(item => {
    return (
      <li key={item.id}>
        <a href={item.id} onClick={e => {
          e.preventDefault();
          onclick(item.id);
        }}>{item.title}</a>
      </li>
    )
  })
  return (
    <nav>
      <ul>
        {listHTML}
      </ul>
    </nav>
  )
}

function App() {
  const [article, setArticle] = useState({
    title: 'Welcome',
    desc: 'React Ajax'
  });
  const [list, setList] = useState([]);
  useEffect(()=> {
    fetch('./data/task.json')
      .then(result => result.json())
      .then(data => {
        setList(data);
      })
  }, [])
  return (
    <div>
      <h1>프론트엔드 개발자</h1>
      <p>기본언어인 html, css, javascript부터 학습합니다.</p>
      <Nav list={list} onclick={id => {
        console.log(id);
        fetch(`./data/${id}.json`)
        .then(result => result.json())
        .then(data => {
          setArticle({
            title: data.title,
            desc: data.desc
        });
      })
      }}></Nav>
      <article>
        <h2>{article.title}</h2>
        <p>{article.desc}</p>
      </article>
    </div>
  );
}

export default App;
