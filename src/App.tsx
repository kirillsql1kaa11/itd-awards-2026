import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { CategoryDetail } from './pages/CategoryDetail'
import { Home } from './pages/Home'
import { MyVotes } from './pages/MyVotes'
import { Nominations } from './pages/Nominations'
import { NotFound } from './pages/NotFound'
import { Questions } from './pages/Questions'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="nominations" element={<Nominations />} />
        <Route path="nominations/:categoryId" element={<CategoryDetail />} />
        <Route path="questions" element={<Questions />} />
        <Route path="about" element={<Navigate to="/questions" replace />} />
        <Route path="my-votes" element={<MyVotes />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
