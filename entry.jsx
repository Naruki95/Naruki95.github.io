import React from 'react';
//import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
//import { Provider } from 'react-redux';

//import store from './store';
//import { addOrange, addApple, clearFruit } from './actions';
//import FruitStandContainer from './components/fruit_stand_container';

import App from "./App";
import Category from './assets/Category'
// TODO just for testing!
//window.store = store;
//window.addOrange = addOrange;
//window.addApple = addApple;
//window.clearFruit = clearFruit;

//const App = () => (
  //<Provider store={store}>
  //  <FruitStandContainer />
  //</Provider>
  //<h2>hoho</h2>
//);

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], text: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <div>
        <h3>TODO</h3>
        <TodoList items={this.state.items} />
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="new-todo">
            What needs to be done?
          </label>
          <input
            id="new-todo"
            onChange={this.handleChange}
            value={this.state.text}
          />
          <button>
            Add #{this.state.items.length + 1}
          </button>
        </form>
      </div>
    );
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.text.length === 0) {
      return;
    }
    const newItem = {
      text: this.state.text,
      id: Date.now()
    };
    this.setState(state => ({
      items: state.items.concat(newItem),
      text: ''
    }));
  }
}

class TodoList extends React.Component {
  render() {
    return (
      <ul>
        {this.props.items.map(item => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    );
  }
}


document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById('root');
  const root = createRoot(container);
  root.render(<Category />);
});
