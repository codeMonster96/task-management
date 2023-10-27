import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'
import RootLayout from './Components/Layouts/RootLayout'
import Dashboard, { tasksLoader } from './Components/Pages/Dashboard'
import Create from './Components/Pages/Create'
import Profile from './Components/Pages/Profile'
import Detail from './Components/Pages/Detail'
import Edit from './Components/Pages/Edit'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Dashboard />} loader={tasksLoader} />
      <Route path="create" element={<Create />} />
      <Route path='/edit/:id' Component={Edit} />
      <Route path='/view/:id' Component={Detail} />
      <Route path="profile" element={<Profile />} />
    </Route>
  )
)

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App

