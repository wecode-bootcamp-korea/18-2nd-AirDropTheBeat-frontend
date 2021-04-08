import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import DetailMain from './Pages/Detail/DetailMain';
import Lists from './Pages/Lists/Lists';
import Login from './Pages/Login/Login';
import Main from './Pages/Main/Main';
import MyPage from './Pages/MyPage/MyPage';
import Order from './Pages/Order/Order';
import Nav from './Components/Nav/Nav';
import Footer from './Components/Footer/Footer';
import DetailSaveModal from './Pages/Detail/DetailSaveModal';

const Routes = () => {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/detail" component={DetailMain} />
        <Route exact path="/test" component={DetailSaveModal} />
        <Route exact path="/lists" component={Lists} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/mypage" component={MyPage} />
        <Route exact path="/order" component={Order} />
      </Switch>
      <Footer />
    </Router>
  );
};
export default Routes;
