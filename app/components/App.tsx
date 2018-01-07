import * as React from "react"
import { BrowserRouter, Route, Switch} from "react-router-dom"
const {Component} = React
import Home from "./home/Home"

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/setup" render={()=>"setup!"}/>
          <Route render={()=>{
              return <p>404 Not Found</p>;
            }} />
        </Switch>
      </BrowserRouter>
    );
  }
}



export default App
