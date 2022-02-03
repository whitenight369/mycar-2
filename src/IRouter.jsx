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
import Reg from "./pages/form/Reg";
import Basic from "./pages/table/Basic";
import HighTable from "./pages/table/HighTable";
import City from "./pages/city";
import Order from "./pages/order";
import Detail from "./pages/order/Detail";
import Common from './Common';
import User from "./pages/user";
import BikeMap from './pages/map';
const IRouter = () =>{
    return (
        <HashRouter>
            <App>
                <Switch>
                <Route path="/common" render={()=>
                    <Common>
                        <Route  path="/common/order/detail/:orderId" component={Detail} />
                    </Common>
                } />
                
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
                    <Route path="/form/reg" component={Reg}/>
                    <Route path="/table/basic" component={Basic}/>
                    <Route path="/table/high" component={HighTable}/>
                    <Route path="/city" component={City}/>
                    <Route path="/order" component={Order}/>
                    <Route path="/user" component={User}/>
                    <Route path="/bikeMap" component={BikeMap} />
                    </Admin>
                }/>
                </Switch>
            </App>        
        </HashRouter>
    )
}
export default IRouter;