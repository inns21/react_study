import React, { Component } from "react"

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

export default Mynav;