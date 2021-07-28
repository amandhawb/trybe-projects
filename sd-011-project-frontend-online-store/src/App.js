import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import ShoppingCart from './pages/ShoppingCart';
import Details from './pages/Details';

class App extends React.Component {
  constructor() {
    super();

    this.addState = this.addState.bind(this);
    this.increaseQuantity = this.increaseQuantity.bind(this);
    this.decreaseQuantity = this.decreaseQuantity.bind(this);

    this.state = {
      cart: [],
    };
  }

  addState(newProduct) {
    const { cart } = this.state;
    this.setState(() => ({
      cart: [...cart, newProduct ],
    }));
  }

  increaseQuantity(product) {
    this.addState(product)
  }

  decreaseQuantity(product) {
    const { cart } = this.state;
    const counterWillDelete = cart.filter(item => item.id === product.id).length
    console.log(`currentCounterDoProdutoASerDeletado`, counterWillDelete)

    const newListThatNotIncludesProdutoASerDeletado = cart.filter(item => item.id !== product.id);
    let newList = [...newListThatNotIncludesProdutoASerDeletado]
    for(let i=1;i<=counterWillDelete-1;i++){
      newList = [...newList, product]
    }
    this.setState({
      cart: newList,
    });
  }

  render() {
    const { cart } = this.state;
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={ () => <Home addState={ this.addState }/> 
            } />
            <Route
              exact
              path="/carrinho"
              render={ () => (<ShoppingCart
                addState={ this.addState }
                cart={ cart }
                increaseQuantity={this.increaseQuantity}
                decreaseQuantity={this.decreaseQuantity}
              />) }
            />
            <Route
              exact
              path="/details/:id"
              render={ (props) => (
                <Details
                  { ...props }
                  addState={ this.addState }
                />) }
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
