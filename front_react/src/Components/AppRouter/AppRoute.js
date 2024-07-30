import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../../pages/Dashboard/Dashboard'
import Employer from '../../pages/Employer/Employer'
import Ajout_employer from '../../pages/Action_Employer/Ajout_employer'
import Modifier_employer from '../../pages/Action_Employer/Modifier_employer'
import Payement_employer from '../../pages/Action_payement/Payement_employer'
import Table_payement from '../../pages/Payement/Table_payement'
import Table_deduction from '../../pages/Deduction/Table_deduction'
import Ajout_deduction from '../../pages/Action_deduction/Ajout_deduction'
import Modif_deduction from '../../pages/Action_deduction/Modif_deduction'
import InfosEmployer from '../../pages/Action_Employer/InfosEmployer'


function AppRoute() {
  return (
    <div>
        <Routes>
          <Route path="/Dashboard" element={<Dashboard />}></Route>
          <Route path="/Employer" element={<Employer />}></Route>
          <Route path="/Ajout_employer" element={<Ajout_employer />}></Route>
          <Route path="/modif_employer" element={<Modifier_employer />}></Route>
          <Route path="/view_employer" element={<InfosEmployer />}></Route>
          <Route path="/table_Payement" element={<Table_payement />}></Route>
          <Route path="/Payement" element={<Payement_employer />}></Route>
          <Route path="/table_deduction" element={<Table_deduction />}></Route>
          <Route path="/Ajout_deduction" element={<Ajout_deduction />}></Route>
          <Route path="/modif_deduction" element={<Modif_deduction />}></Route>
        </Routes> 
    </div>
  )
}

export default AppRoute
