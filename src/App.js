import React from 'react'
import { BrowserRouter as Router,
    Routes, 
    Route } from 'react-router-dom'
import WelcomePage from '../src/pages/WelcomePage'
import ForecastPage from '../src/pages/ForecastPage'



const App = () => {
    return (
    
            <Router>
                <Routes>
                    <Route path="/" element={<WelcomePage />} />

                    <Route path="/clima" element={<ForecastPage />}/>
                                                      
                </Routes>
            </Router>
        
    )
}

export default App