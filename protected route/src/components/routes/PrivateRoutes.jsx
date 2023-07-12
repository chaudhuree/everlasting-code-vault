import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Loading from './Loading'

export default function PrivateRoutes() {
  const [login, setLogin] = useState(false)

  // server side checking
  useEffect(() => {
    const authCheck = async () => {
      const { data } = await axios.get("http://localhost:8000/api/v1/auth-check",{
        headers:{
          Authorization: localStorage.getItem("token"),
        }
      });
      
      // jodi login kora hoy tahole localStorage e token ta set kora hoye jabe
      // so ai token soho jokhn http://localhost:8000/api/v1/auth-check
      // ai address a hit kora hobe. jodi jwt token valid hoy tahole server
      //  theke ai route a login: true response ta pabo. jodi valid na hoy
      //  tahole login: false response ta pabo.

      // so data.login means true.

      // now checking as per response jodi token valid hoy so login kora
      // ache so take protected route gulo te niye jawa jabe. mane jgulo
      // use korte authentication must.
      if (data.login) {
        setLogin(true);
      } else {
        setLogin(false);
      }
    };

    if (localStorage.getItem("token")) authCheck();
  }, [localStorage.getItem("token")]);

  // upore validate hoile login er value hoye jabe true so tokhn amra Outlet
  // that means protected route gulo te niye jete parbo. jodi false hoy tahole Loading component ta render hobe. jeta amader ke 3 sec por home page a niye jabe.
  return login ? <Outlet /> : <Loading />
}
