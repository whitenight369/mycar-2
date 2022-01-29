import { HashRouter,Route,Switch,Redirect } from "react-router-dom";
import App from './App';
import Admin from "./Admin";
import Home from './pages/Home';
import Buttons from './pages/ui/Buttons';
import Modals from "./pages/ui/Modals";
import Loadings from "./pages/ui/Loadings";
import Notifications from "./pages/ui/Notifications";
import Messages from "./pages/ui/Messages";
import Tab from "./pages/ui/Tabs";
import Gallery from "./pages/ui/Gallery";
import Carousels from "./pages/ui/Carousel";
import Login from "./pages/form/Login";

const IRouter = () =>{
    return (
        <HashRouter>
            <App>
                <Route path="/" render={()=>
                    <Admin>
                    <Route path="/home" component={Home}/>
                    <Route path="/ui/buttons" component={Buttons}/>
                    <Route path="/ui/modals" component={Modals}/>
                    <Route path="/ui/loadings" component={Loadings}/>
                    <Route path="/ui/notification" component={Notifications}/>
                    <Route path="/ui/messages" component={Messages}/>
                    <Route path="/ui/tabs" component={Tab}/>
                    <Route path="/ui/gallery" component={Gallery}/>
                    <Route path="/ui/carousel" component={Carousels}/>
                    <Route path="/form/login" component={Login}/>
                    </Admin>
                }/>
            </App>        
        </HashRouter>
    )
}
export default IRouter;