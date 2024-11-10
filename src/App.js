import './App.css';
import React, { Component, useState } from 'react'
import Myheader from './component/Myheader';
import Mynav from './component/Mynav';
import ReadArticle from './component/ReadArticle';
import CreateArticle from './component/CreateArticle';
import UpdateArticle from './component/UpdateArticle';

const App = () => {
  // 변경이 많이 될거다? state
  // 변경이 많이 안된다? 일반 변수
  let max_menu_id = 3;
  let welcome = {
    title: 'Hello',
    desc: 'Welcome to FrontEnd'
  }
  let subject = {
    title: '프론트엔드 개발자 역량',
    desc: '기본언어인 HTML, CSS, JAVASCRIPT부터 학습합니다'
  }
  const [mode, setMode] = useState('welcome');
  const [selected_id, setSelectedId] = useState(2);
  const [menus, setMenus] = useState([
    {id:1, title:'UI/UX 개발 ', desc:'사용자 인터페이스와 사용자가 웹사이트를 이용하면 느끼고 생각하는 총체적 경험을 개발 '},
    {id:2, title:'재사용이 가능한 UI 개발 ', desc:'앵귤러, 리엑트, 뷰등의 자바스크립트 프레임워크를 가지고 재사용할 수 있는 UI를 만든다.  '},
    {id:3, title:'애니메이션 구현  ', desc:'CSS 또는 javascript를 사용해 다양한 효과의 애니메이션 구현한다.'},
  ]);

  const getReadArticle = () => {
    let idx = menus.findIndex((item) => (item.id === selected_id));
    let data = menus[idx];
    return data;
  }

  const getArticles = () => {
    let _title, _desc, _article = null;
    if (mode === 'welcome') {
      _title = welcome.title;
      _desc = welcome.desc;
      _article = <ReadArticle title={_title} desc={_desc} mode={mode}></ReadArticle>
    } else if (mode === 'read') {

      let _data = getReadArticle()

      _article = <ReadArticle title={_data.title} desc={_data.desc} onChangeMode={(_mode) => {
        if (_mode === 'delete') {
          if (window.confirm("정말 삭제할까요?")) {
            let _menus = Array.from(menus);
            let idx = _menus.findIndex(item => (item.id === selected_id));
            console.log(idx)
            _menus.splice(idx, 1);

            setMenus(_menus);
            setMode('welcome');

          }

        } else {
          setMode('update');
        }
      }}></ReadArticle>

    } else if (mode === 'create') {
      _article = <CreateArticle onSubmit={(_title, _desc) => {
        max_menu_id += 1;

        let _menus = Array.from(menus);
        _menus.push({id:max_menu_id, title:_title, desc:_desc})

        setMenus(_menus);
        setMode('read');
        setSelectedId(max_menu_id);

      }}></CreateArticle>
    } else if (mode === 'update') {
      let _content = getReadArticle();
      _article = <UpdateArticle data={ _content} onSubmit={(_id,_title, _desc) => {

        let _menus = Array.from(menus);
        _menus.forEach((item, index) => {
          if (item.id === _id) {
            _menus[index] = {id:_id, title:_title, desc:_desc}
          }
        });

        setMenus(_menus);
        setMode('read');

      }}></UpdateArticle>

    }
    return _article;
  }
  return (
    <div className='App'>
      <Myheader
          title={subject.title}
          desc={subject.desc}
          onChangeMode = {() => {
            setMode('welcome');
          }}>
      </Myheader>
      <Mynav data={menus} onChangePage={(id) => {
        setMode('read');
        setSelectedId(id);
      }}></Mynav>

      {getArticles()}

      <hr/>
        <div className="menu">
          <button type='button' className='primary' onClick={() => {
          setMode('create');
          }}>
            Create task
          </button>
        </div>
    </div>
  )
}

export default App;


/*
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

  getReadArticle() {
    let idx = menus.findIndex((item) => (item.id === selected_id));
    let data = menus[idx];
    return data;
  }

  // welcome, read, create 함수로 만들기
  getArticles() {
    let _title, _desc, _article = null;
    if (mode === 'welcome') {
      _title = welcome.title;
      _desc = welcome.desc;
      _article = <ReadArticle title={_title} desc={_desc} mode={mode}></ReadArticle>
    } else if (mode === 'read') {
      let _data = this.getReadArticle()
      _article = <ReadArticle title={_data.title} desc={_data.desc} onChangeMode={(_mode) => {
        if (_mode === 'delete') {
          if (window.confirm("정말 삭제할까요?")) {
            let _menus = Array.from(menus);
            let idx = _menus.findIndex(item => (item.id === selected_id));
            console.log(idx)
            _menus.splice(idx, 1);
            this.setState({
              mode: 'welcome',
              menus : _menus
            })

          }

        } else {
          this.setState({
            mode: _mode
          })
        }
      }}></ReadArticle>

    } else if (mode === 'create') {
      _article = <CreateArticle onSubmit={(_title, _desc) => {
        console.log(_title, _desc);
        this.max_menu_id += 1;
        // let _menus = menus.concat({id: this.max_menu_id, title: _title, desc: _desc})
        // this.setState({
        //   menus: _menus
        // });

        // 생명주기 함수 shouldComponentUpdate에 적용이 안 됨
        // menus.push(
        //   {id:this.max_menu_id, title:_title, desc:_desc}
        // )
        // this.setState({
        //   menus:menus
        // });

        let _menus = Array.from(menus);
        _menus.push({id:this.max_menu_id, title:_title, desc:_desc})
        this.setState({
          menus: _menus,
          mode: 'read',
          selected_id: this.max_menu_id
        });

      }}></CreateArticle>
    } else if (mode === 'update') {
      let _content = this.getReadArticle();
      _article = <UpdateArticle data={ _content} onSubmit={(_id,_title, _desc) => {

        let _menus = Array.from(menus);
        _menus.forEach((item, index) => {
          if (item.id === _id) {
            _menus[index] = {id:_id, title:_title, desc:_desc}
          }
        });
        this.setState({
          menus: _menus,
          mode:'read'
        });
      }}></UpdateArticle>

    }
    return _article;
  }

  render() {
    console.log('App 실행')

    return (
      <div className='App'>
        <Myheader
          title={subject.title}
          desc={subject.desc}
          onChangeMode = {() => {
            this.setState({
              mode: 'welcome'
            })
          }}>
        </Myheader>
        <Mynav data={menus} onChangePage={(id) => {
          this.setState({
            mode: 'read',
            selected_id: id
          })

        }}></Mynav>

        {this.getArticles()}

        <hr/>
        <div className="menu">
          <button type='button' className='primary' onClick={() => {
            this.setState({
              mode:'create'
            })
          }}>
            Create task
          </button>
        </div>
      </div>
    )
  }
}
 */


