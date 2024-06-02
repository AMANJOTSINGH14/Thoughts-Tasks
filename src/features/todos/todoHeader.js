import { useDispatch, useSelector } from 'react-redux';
import React from 'react';

const TodoHeader = ()=>{
    const user= useSelector(state=> state.auth.user.email);
    const t= useSelector(state=> state.todos.todos)
    const lastToDo= t.length
    console.log(t.length)
    const getEmailPrefix = (user) => {
        const index = user.indexOf('@');
        if (index !== -1) {
          return user.substring(0, index);
        }
        return user;
      };
      
      const prefix = getEmailPrefix(user);
      console.log(prefix);
return(
    <>
    <h1>
       Hi {prefix} below are your tasks.
       
    </h1>
   
    </>
    
)
}
export default TodoHeader