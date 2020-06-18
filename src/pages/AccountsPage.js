import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../auth/auth";
import firebaseClient from "../auth/firebase";

const AccountsPage = (props) => {
  const [accounts, setAccounts] = useState([]);

  const { currentUser } = useContext(AuthContext);

  //   if (currentUser) {

  //   }
  const otherEndpoint = (event) => {
    event.preventDefault();
    axios.defaults.withCredentials = true;

    axios.get(`http://localhost:8000/bank_items`).then((res) => {
      console.log(res);
    });
  };

  useEffect(() => {
    firebaseClient
      .auth()
      .currentUser.getIdToken(/* forceRefresh */ true)
      .then(function (idToken) {
        // Send token to your backend via HTTPS
        // ...
        console.log(idToken);

        axios
          .get(`http://localhost:8000/bank_items`, {
            headers: { Authorization: `Bearer ${idToken}` },
          })
          .then((res) => {
            console.log(res.data);
            let arr = res.data.map((elem) => {
              return elem.institution.name;
            });
            setAccounts(arr);
            console.log(arr);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch(function (error) {
        // Handle error
        console.log(error);
      });
  }, []);

  return (
    <div>
      <ul>
        <li>
          {/* Every account gets a list element */}
          {/* By defualt, the first transaction is expanded  */}
        </li>
      </ul>
    </div>
  );
};

export default AccountsPage;
