import { HashRouter,Route,Switch,Redirect } from "react-router-dom";
import App from './App';
import Admin from "./Admin";
import Home from './pages/Home';
const IRouter = () =>{
    return (
        <HashRouter>
            <App>
                <Route path="/" render={()=>
                    <Admin>
                    <Route path="/home" component={Home}/>
                    </Admin>
                }/>
            </App>        
        </HashRouter>
    )
}
export default IRouter;