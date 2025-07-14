

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Register = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const navigate = useNavigate();

//   const onSubmitHandler = async (event) => {
//     event.preventDefault();

//     if (currentState === "Sign Up") {
//       // Simulate signup success
//       console.log("Signing up:", { name, email, password });
//       // Normally call your signup API here and handle the response
//       alert("Sign up successful! Please login now.");
//       setCurrentState("Login");
//       // Clear fields
//       setName("");
//       setEmail("");
//       setPassword("");
//     } else {
//       // Simulate login success
//       console.log("Logging in:", { email, password });
//       // Normally call your login API here and get username from response
//       const usernameFromAPI = "John Doe"; // Replace with actual API response
//       localStorage.setItem("username", usernameFromAPI);
//       navigate("/home");
//     }
//   };

//   return (
//     <form
//       onSubmit={onSubmitHandler}
//       className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
//     >
//       <div className="inline-flex items-center gap-2 mt-10 mb-2">
//         <p className="text-3xl prata-regular">{currentState}</p>
//         <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
//       </div>

//       {currentState === "Sign Up" && (
//         <input
//           type="text"
//           className="w-full px-3 py-2 border border-gray-800"
//           placeholder="Enter your name"
//           required
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//       )}

//       <input
//         type="email"
//         className="w-full px-3 py-2 border border-gray-800"
//         placeholder="Enter your email"
//         required
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />

//       <input
//         type="password"
//         className="w-full px-3 py-2 border border-gray-800"
//         placeholder="Enter your password"
//         required
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />

//       <div className="flex justify-between w-full text-sm mt-[-8px]">
//         <p className="cursor-pointer">Forgot your password?</p>
//         {currentState === "Login" ? (
//           <p
//             onClick={() => setCurrentState("Sign Up")}
//             className="cursor-pointer"
//           >
//             Create a new account
//           </p>
//         ) : (
//           <p
//             onClick={() => setCurrentState("Login")}
//             className="cursor-pointer"
//           >
//             Login here
//           </p>
//         )}
//       </div>

//       <button
//         type="submit"
//         className="px-8 py-2 mt-4 font-light text-white bg-black"
//       >
//         {currentState === "Login" ? "Sign In" : "Sign Up"}
//       </button>
//     </form>
//   );
// };

// export default Register;
