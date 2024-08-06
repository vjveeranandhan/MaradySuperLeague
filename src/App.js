import './App.css';
import  {BrowserRouter, Routes, Route} from  "react-router-dom";
import Navbar from './components/Navbar';
import Players from './components/Players/Players';
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup';
import Logout from './components/Logout/Logout';
import Profile from './components/Profile/Profile';
// function App() {
//   return (
    
//     <div>
//     <Navbar/>
//     <Login/>
//     </div>
//   );
// }

function App() {
	return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        {/* <Navbar/> */}
        {/* <Route path="/" exact element={<Home/>} /> */}
        <Route path="/login" element={<Login/>} />
        <Route path="/players" element={<Players/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/logout" element={<Logout/>} />
        <Route path="/profile" element={<Profile/>} />
        {/* />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/club" element={<CreateClub/>} />
        <Route path="/my-tournaments" element={<MyTournaments/>} />
        <Route path="/tournament-invitations" element={<TournamentInvitations/>} /> */}
      </Routes>
    </BrowserRouter>
	);
}


export default App;
