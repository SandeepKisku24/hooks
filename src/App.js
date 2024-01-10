
// import { useReducer } from "react";
import axios from "axios";
import React ,{useState,useReducer, useEffect,useRef,useLayoutEffect, createContext, useMemo} from "react";
import User from "./User";
import Login from "./Login";
// for userReducer

export const Appcontext = createContext(null);

function App() {
  const reducer =(state,action)=>{
    switch(action.type){
      case "increment": {
        return {counter:state.counter+1, showText: state.showText}
      }
      case "toogle":{
        return {counter:state.counter, showText: !state.showText}
      }
    }
}

  // use state 
  const [name, setName] = useState("");
  const [datas, setData] = useState([]);
  const [data, setDatas] = useState("");

  // usereducer
  const [state, disptach] = useReducer(reducer,{counter:0, showText:true})
  const changeName = (e)=>{
      setName(e.target.value);
  }

  // for reducer
  // const [counter, increase] = useState(0);
  // const [showText, toogle] = useState(true); 

  //  useEffect
  useEffect(()=>{
    axios.get("https://jsonplaceholder.typicode.com/posts").then((response) =>{
      // setDatas(response.data[0].title);
      setData(response.data);
      console.log("hello world");
      console.log(datas.length);
      if(datas.length>0){
        console.log("hi all");
        setDatas(datas[state.counter].title);
      }
      
    })

  },[state.counter])

  // useRef
  const inputRef = useRef(null);
  const onClick =()=>{
    console.log(inputRef.current.value);
    inputRef.current.focus();
  }

  // use context
  const [userName, setUserName] = useState("");


  //  use memo


  const findLongestName= (post)=>{
    if(!post) return "no";
    console.log("this is happening");
    for(var i  =0;i< post.length;i++){
      if(post.length>5){
        return post;
      }
    }
    return "hello";
  }

  const getLongestName = useMemo(()=>findLongestName(data), [datas]);
  return (
    <div className="App">
      Hi {name}
      <form>
      <input placeholder="name" onChange={(e)=>{
        setName(e.target.value)
      }} />
      </form> 

      <h1>{state.counter}</h1>
      <button onClick={()=>{

        // this is for reducer
        // increase(counter+1);
        // toogle(!showText);

        disptach({type:"increment"});
        disptach({type:"toogle"});
      }}>Click to Inc</button>
      {state.showText && <p>Even</p>}
      <p>{data}</p>

      {/* {for useref} */}
      <input type="text" placeholder="ex.." ref={inputRef}></input> 
      <button onClick={onClick}>change</button>
      
      {/* for usecontext  */}
      <h1>Use Context</h1>
      {/* <User setUserName ={setUserName}/><Login userName ={userName} /> */}
      <Appcontext.Provider value={{userName,setUserName}}>
        <User/> <Login/>
      </Appcontext.Provider>
      

      <div>{getLongestName}</div>

    </div>
  );
}

export default App;
