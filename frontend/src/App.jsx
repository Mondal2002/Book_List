import React from 'react'
import { Routes,Route } from 'react-router-dom';
import Home from './pages/Home';
import Create from './pages/Create';
import Update from './pages/Update';
import Delete from './pages/Delete';
import Show from './securitypages/login';
import Logout from './securitypages/logout';
import Coverpage from './pages/coverpage';
import PotectedRoute from './components/protectedRoute';
import Register from './securitypages/register';
import ForgotPassword from './securitypages/forgotPassword';
import UserIdToChange from './securitypages/userIdToChange';
import DeactivateAcc from './securitypages/deactivateAcc';
import AllUsersList from './adminPages/allUsersList';
import AdminLogin from './adminPages/adminLogin';
import DeleteUser from './adminPages/DeleteUser';
import UpdateUser from './adminPages/UpdateUser';
export const App = () => {
  return (
    <Routes>
      <Route path='/books'element={<PotectedRoute>
        <Home />
      </PotectedRoute>}/>
      <Route path='/book/create/'element={<Create />}/>
      <Route path='book/update/:id' element={<Update />}/>
      <Route path='/book/delete/:id' element={<Delete />}/>
      <Route path='/logout' element={<Logout/>}/>
      <Route path='/login'element={<Show/>}/>
      <Route path='/'element={<Coverpage/>}/>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/forgot/password'element={<UserIdToChange/>}></Route>
      <Route path='/change/password/:id' element={<ForgotPassword/>}></Route>
      <Route path='/deactivate' element={<DeactivateAcc/>}></Route>
      <Route path='/admin/ShowUsers' element={<AllUsersList/>}></Route>
      <Route path='/admin/login' element={<AdminLogin/>}></Route>
      <Route path='/admin/Deleteuser/:id' element={<DeleteUser/>}></Route>
      <Route path='/admin/Update/:id' element={<UpdateUser/>}></Route>
    </Routes>
  )
}

export default App;