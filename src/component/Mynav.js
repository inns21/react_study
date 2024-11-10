import React, { Component, useEffect, useState } from "react"

const Mynav = ({ data, onChangePage }) => {
  // 부모로부터 받은 값을 변경되었는지 확인? state에 넣어야함
  const [list, setList] = useState([]);
  let lists = [];
  const getList = () => {
    data.forEach(item => {
      lists.push(
        <li key={item.id}>
          <a href="/" onClick={(e) => {
            e.preventDefault();
            onChangePage(item.id);
          }}>
            {item.title}
          </a>
        </li>
      );
    });
    setList(lists);
  }
  useEffect(() => {
    getList();
    console.log('getList 실행');
  }, [data]);
  return (
    <nav>
      <ul>
        {list}
      </ul>
    </nav>
  )
}

export default Mynav;

/*
class Mynav extends Component{

  //  렌더 할 지 말 지 결정
  // return true면 mynav 작동 false면 미작동
  shouldComponentUpdate(newProps, newState) {
    console.log('shouldComponentUpdate 작동',
      newProps.data, // 변경된 값
      this.props.data  // 변경전 값
    );
    if (this.props.data === newProps.data) {
      return false;
    }
    return true;
  }

  render() {
    console.log('Mynav 실행');
    let lists = [];
    let data = this.props.data;

    data.forEach(item => {
      lists.push(
        <li key={item.id}>
          <a href="/" onClick={(e) => {
            e.preventDefault();
            this.props.onChangePage(item.id);
          }}>
            {item.title}
          </a>
        </li>
      );
    });
    return (
      <nav>
        <ul>
          {lists}
        </ul>
      </nav>
    )
  }
}
*/