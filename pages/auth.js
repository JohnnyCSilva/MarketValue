import { useAuth } from '../config/AuthContext';

function AuthScreen() {

  const {user, logIn, logOut} = useAuth();


  return (
    <div
      style={{
        maxWidth: "320px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <button onClick={logIn}>Log In</button>
      <button onClick={logOut}>Log Out</button>
      <pre>
        {JSON.stringify(user, null, 2)}
        {console.log(user)}
      </pre>
    </div>
  );
}

export default AuthScreen;