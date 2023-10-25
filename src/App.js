import './App.css'
import styled from 'styled-components'
import { Route, Routes } from 'react-router-dom'
import ArticlesList from './Components/ArticlesList/ArticlesList'
import FullNews from './Components/FullNews/FullNews'

function App() {
  return (
    <Wiev>
      <Routes>
        <Route path="/" element={<ArticlesList />} />
        <Route path="/detailsNews/:id" element={<FullNews />} />
      </Routes>
    </Wiev>
  )
}

export default App

const Wiev = styled.div`
  max-width: 900px;
  margin: 0 auto;
`
