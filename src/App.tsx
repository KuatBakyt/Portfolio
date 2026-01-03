import { Route, Routes } from 'react-router-dom'
import './style/all.scss'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import About from './components/About/About'
import Projects from './components/Projects/Projects'
import Contacts from './components/Contacts/Contacts'
import Experience from './components/Experience/Experiemce'

function App() {

  return (
    <>
      <Header />
      <div className='wrapper'>
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contacts" element={<Contacts />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App