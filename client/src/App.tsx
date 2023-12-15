import { Fragment } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from 'react-router-dom';
import { useSelector } from 'react-redux';

import Auth from "./components/Auth";
import Navbar from "./components/Navbar";
import MainPage from "./components/MainPage";
import AlertBox from "./components/AlertBox";
import NotFound from './components/NotFound';

function App() {
    const user = useSelector((state: any) => state.auth)?.authData?.user;

    return (
        <Router>
            <Fragment>
                <Navbar />
                <AlertBox />
                <Routes>
                    <Route path='/' element={user ? <MainPage /> : <Navigate to='/auth' replace />} />
                    <Route path='/people/search' element={user ? <MainPage /> : <Navigate to='/auth' replace />} />
                    <Route path='/auth' element={<Auth />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </Fragment>
        </Router>
    )
}

export default App;