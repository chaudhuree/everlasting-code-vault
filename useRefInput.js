let passRef,emailRef=useRef();

const SubmitData=async () => {

  let email = emailRef.value;
  let pass = passRef.value;
  
  console.log('email: ',email,' pass: ',pass);
  // clear input fields
  emailRef.value = ''; 
  passRef.value = '';

  // focus on email input field
  emailRef.focus();
}

<>
<input ref={(input)=>emailRef=input} placeholder="User Email" type="email"/>
<input ref={(input)=>passRef=input} placeholder="User Password" type="password"/>

<button onClick={SubmitData} >Submit</button>
</>