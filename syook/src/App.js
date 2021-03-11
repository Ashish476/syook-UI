import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state={
      title: 'Syook App',
      act: 0,
      index: '',
      datas: []
    }
  } 

  componentDidMount(){
    this.refs.title.focus();
  }

  fSubmit = (e) =>{
    e.preventDefault();
    console.log('try');

    let datas = this.state.datas;
    let title = this.refs.title.value;
    let discription = this.refs.discription.value;

    if(this.state.act === 0){   //new
      let data = {
        title, discription
      }
      datas.push(data);
    }else{                      //update
      let index = this.state.index;
      datas[index].title = title;
      datas[index].discription = discription;
    }    

    this.setState({
      datas: datas,
      act: 0
    });

    this.refs.myForm.reset();
    this.refs.title.focus();
  }

  fRemove = (i) => {
    let datas = this.state.datas;
    datas.splice(i,1);
    this.setState({
      datas: datas
    });

    this.refs.myForm.reset();
    this.refs.title.focus();
  }

  fEdit = (i) => {
    let data = this.state.datas[i];
    this.refs.title.value = data.title;
    this.refs.discription.value = data.discription;

    this.setState({
      act: 1,
      index: i
    });

    this.refs.title.focus();
  }  

  render() {
    let datas = this.state.datas;
    return (
      <div className="App">
        <h2>{this.state.title}</h2>
        <form ref="myForm" className="myForm">
          <input type="text" ref="title" placeholder="Enter Title" className="formField" />
          <input type="text" ref="discription" placeholder="Enter Discription" className="formField" />
          <button onClick={(e)=>this.fSubmit(e)} className="myButton">submit </button>
        </form>
        <pre>
          {datas.map((data, i) =>
            <li key={i} className="myList">
              {i+1}.{data.title}, {data.discription}
              <button onClick={()=>this.fRemove(i)} className="myListButton">Delete </button>
              <button onClick={()=>this.fEdit(i)} className="myListButton">edit </button>
            </li>
          )}
        </pre>
      </div>
    );
  }
}

export default App;
