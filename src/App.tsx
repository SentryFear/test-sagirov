import React, {useEffect} from 'react';
import {BrowserRouter, Redirect, Route, Switch, withRouter} from "react-router-dom";
import {connect, Provider} from "react-redux";
import store, {AppStateType} from "./redux/store";
import {compose} from "redux";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
import {initializeApp} from "./redux/app-reducer";
import Main from "./components/Main/Main";

const App = (props: any) => {

    useEffect(() => {
        props.initializeApp()
    }, [])

    if (!props.isAuth) {
        return (
            <Switch>
                <Route exact path='/'
                       render={() => <Redirect to={"/register"}/>}/>

                <Route path='/login'
                       render={() => <Login/>}/>

                <Route path='/register'
                       render={() => <Register/>}/>

                <Route path='*'
                       render={() => <Redirect to={"/login"}/>}/>
            </Switch>
        )
    }

    return (
        <div className='app-wrapper'>
            <div className='app-wrapper-content'>
                <Switch>
                    <Route exact path='/'
                           render={() => <Redirect to={"/main"}/>}/>

                    <Route path='/main'
                           render={() => <Main/>}/>

                    <Route path='*'
                           render={() => <Redirect to={"/main"}/>}/>
                </Switch>
            </div>
        </div>
    )
}

const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized,
    isAuth: state.auth.isAuth
})

let AppContainer = compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);

const FinalApp: React.FC = () => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}

export default FinalApp
