// /* eslint-disable */
// import { Link, useHistory } from "react-router-dom";
// import React, { useRef, useState } from "react";
// import { authentication } from "../../../auth/firebase/firebase";
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// import { useSkin } from "@hooks/useSkin";
// import { Row, Col, CardTitle, CardText, Label } from "reactstrap";
// import "@styles/base/pages/page-auth.scss";
// import "../../../assets/scss/register.scss";
// import image from "../../../img/monachus2.png";
// import { Form, Button, Alert } from "react-bootstrap";
// import validator from "validator";

// const Register = () => {
//   const [skin, setSkin] = useSkin();
//   const userNameRef = useRef();
//   const emailRef = useRef();
//   const passwordRef = useRef();
//   const passwordConfirmRef = useRef();
//   const auth = getAuth();
//   const [error, setError] = useState("");
//   const [userName, setUserName] = useState("");
//   const [loading, setLoading] = useState(false);
//   const history = useHistory();

//   async function handleSubmit(e) {
//     e.preventDefault();
//     if (passwordRef.current.value !== passwordConfirmRef.current.value) {
//       setError("Hata");
//     } else if (
//       validator.isStrongPassword(passwordRef.current.value, {
//         minLength: 6,
//         minLowercase: 0,
//         minUppercase: 0,
//         minNumbers: 0,
//         minSymbols: 0,
//       })
//     ) {
//       try {
//         createUserWithEmailAndPassword(
//           auth,
//           emailRef.current.value,
//           passwordRef.current.value
//         ).then((userCredential) => {
//           // Signed in
//           const user = userCredential.user;
//           setUserName(userNameRef.current.value);
//           localStorage.setItem(
//             "userData",
//             JSON.stringify({
//               username: userNameRef.current.value,
//               role: "admin",
//               email: emailRef.current.value,
//               password: passwordRef.current.value,
//               ability: [
//                 {
//                   action: "manage",
//                   subject: "all",
//                 },
//               ],
//             })
//           );
//           history.push("/monachus/rulebuilder");
//           // ...
//         });
//       } catch {}
//     } else {
//       setError("Is Not Strong Password");
//     }

//     setLoading(false);
//   }

//   const illustration =
//       skin === "dark" ? "register-v2-dark.svg" : "register-v2.svg",
//     source = require(`@src/assets/images/pages/${illustration}`).default;

//   //             <img className='img-fluid' src={source} alt='Login V2' />
//   return (
//     <div className="auth-wrapper auth-v2">
//       <Row className="auth-inner m-0">
//         <Link className="brand-logo" to="/">
//           <img src={image} width="200px"></img>
//         </Link>
//         <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
//           <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
//             <img className='img-fluid' src={source} alt='Login V2' />
//           </div>
//         </Col>
//         <Col
//           className="d-flex align-items-center auth-bg px-2 p-lg-5"
//           lg="4"
//           sm="12"
//         >
//           <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
//             <CardTitle tag="h2" className="font-weight-bold mb-1">
//               Adventure starts here
//             </CardTitle>
//             <CardText className="mb-2">
//               Make your app management easy and fun!
//             </CardText>
//             <Form className="auth-register-form mt-2" onSubmit={handleSubmit}>
//               {error && <Alert variant="danger">{error}</Alert>}
//               <Form.Group>
//                 <Label className="form-label" for="register-username">
//                   Username
//                 </Label>
//                 <Form.Control
//                   type="text"
//                   id="register-username"
//                   placeholder="johndoe"
//                   ref={userNameRef}
//                   required
//                 />
//               </Form.Group>
//               <Form.Group>
//                 <Label className="form-label" for="register-email">
//                   Email
//                 </Label>
//                 <Form.Control
//                   type="email"
//                   id="register-email"
//                   placeholder="john@example.com"
//                   ref={emailRef}
//                   required
//                 />
//               </Form.Group>
//               <Form.Group>
//                 <Label className="form-label" for="register-password">
//                   Password
//                 </Label>
//                 <Form.Control
//                   type="password"
//                   className="input-group-merge"
//                   id="register-password"
//                   ref={passwordRef}
//                   required
//                 />
//               </Form.Group>
//               <Form.Group>
//                 <Label className="form-label" for="confirmation-password">
//                   Confirm your password
//                 </Label>
//                 <Form.Control
//                   type="password"
//                   className="input-group-merge"
//                   id="confirmation-password"
//                   ref={passwordConfirmRef}
//                   required
//                 />
//               </Form.Group>
//               <div className="d-grid">
//                 <Button className="btn btn-primary" size="lg" type="submit">
//                   Sign up
//                 </Button>
//               </div>
//             </Form>
//             <p className="text-center mt-2">
//               <span className="mr-25">Already have an account?</span>
//               <Link to="/login">
//                 <span>Sign in instead</span>
//               </Link>
//             </p>
//           </Col>
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default Register;
// /* eslint-disable */