import React from 'react'
import { BrowserRouter as Router,
    Routes, 
    Route } from 'react-router-dom'
import WelcomePage from '../src/pages/WelcomePage'
import ForecastPage from '../src/pages/ForecastPage'
// import NotFoundPage from './pages/NotFoundPage'
// import { store } from './WeatherContext'


const App = () => {
    return (
    
            <Router>
                <Routes>
                    <Route path="/" element={<WelcomePage />} />

                    <Route path="/clima" element={<ForecastPage />}/>

                    {/* <Route path="*" element={<NotFoundPage />}/> */}
                                                      
                </Routes>
            </Router>
        
    )
}

export default App