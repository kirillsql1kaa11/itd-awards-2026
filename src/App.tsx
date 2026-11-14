import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { About } from './pages/About'
import { CategoryDetail } from './pages/CategoryDetail'
import { Home } from './pages/Home'
import { MyVotes } from './pages/MyVotes'
import { Nominations } from './pages/Nominations'
import { NotFound } from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="nominations" element={<Nominations />} />
        <Route path="nominations/:categoryId" element={<CategoryDetail />} />
        <Route path="about" element={<About />} />
        <Route path="my-votes" element={<MyVotes />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
