import React, { Component } from "react"

class Mynav extends Component{
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