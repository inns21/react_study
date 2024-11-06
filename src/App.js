import './App.css';
import React, { Component } from 'react'
import Myheader from './component/Myheader';
import Mynav from './component/Mynav';
import ReadArticle from './component/ReadArticle';
import CreateArticle from './component/CreateArticle';

class App extends Component {
  constructor(props) {
    super(props);
    this.max_menu_id = 3;
    this.state = {
      mode: 'welcome',
      selected_id: 2,
      welcome: {
        title: 'Hello',
        desc: 'Welcome to FrontEnd'
      },
      subject: {
        title: "프론트엔드 개발자",
        desc: "기본언어인 html, css, javascript부터 학습합니다.",
      },
      menus: [
        {id:1, title:'UI/UX 개발 ', desc:'사용자 인터페이스와 사용자가 웹사이트를 이용하면 느끼고 생각하는 총체적 경험을 개발 '},
        {id:2, title:'재사용이 가능한 UI 개발 ', desc:'앵귤러, 리엑트, 뷰등의 자바스크립트 프레임워크를 가지고 재사용할 수 있는 UI를 만든다.  '},
        {id:3, title:'애니메이션 구현  ', desc:'CSS 또는 javascript를 사용해 다양한 효과의 애니메이션 구현한다.'},
      ]
    }
  }
  render() {
    console.log('App 실행')
    let _title, _desc, _article = null;
    if (this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadArticle title={_title} desc={_desc} mode={this.state.mode}></ReadArticle>
    } else if (this.state.mode === 'read') {
      let idx = this.state.menus.findIndex((item) => (item.id === this.state.selected_id));
      let data = this.state.menus[idx];
      _title = data.title;
      _desc = data.desc;
      _article = <ReadArticle title={_title} desc={_desc} onChangeMode={(_mode) => {this.setState({ mode: _mode })}}></ReadArticle>
    } else if (this.state.mode === 'create') {
      _article = <CreateArticle onSubmit={(_title, _desc) => {
        console.log(_title, _desc);
        this.max_menu_id += 1;
        // this.state.menus.push({
        //   id: this.max_menu_id,
        //   title: _title,
        //   desc: _desc
        // });
        let _menus = this.state.menus.concat({id: this.max_menu_id, title: _title, desc: _desc})
        this.setState({
          menus: _menus
        })
      }}></CreateArticle>

    }
    return (
      <div className='App'>
        <Myheader
          title={this.state.subject.title}
          desc={this.state.subject.desc}
          onChangeMode = {() => {
            this.setState({
              mode: 'welcome'
            })
          }}>
        </Myheader>
        <Mynav data={this.state.menus} onChangePage={(id) => {
          this.setState({
            mode: 'read',
            selected_id: id
          })

        }}></Mynav>
        {/* <ReadArticle
          title={_title}
          desc={_desc}
          mode={this.state.mode}
          onChangeMode={(_mode) => {
          this.setState({
            mode: _mode
          })
        }}></ReadArticle> */}
        {_article}
        <hr/>
        <div className="menu">
          <button type='button' className='primary' onClick={() => {
            this.setState({
              mode:'create'
            })
          }}>
            Create task
          </button>
          {/* <a href="/create" class="primary">Create task</a> */}
        </div>
      </div>
    )
  }
}

export default App;