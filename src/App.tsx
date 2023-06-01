import React, { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './reducers';
import styled from 'styled-components';
import { fetchPosts } from './actions/posts';

type Props = {
  value: any;
  onIncrement: () => void;
  onDecrement: () => void;
}



interface Post {
  userId: number;
  id: number;
  title: string;
}

function App({value, onIncrement, onDecrement} : Props) {
  const dispatch = useDispatch();
  const counter = useSelector((state : RootState) => state.counter);
  const todos : string[] = useSelector((state: RootState) => state.todos)
  const posts : Post[]  = useSelector((state: RootState) => state.posts[0])
  const postsTo10 = posts ? posts.slice(0, 10) : [{title : 'loading'}];
  const [todoValue, setTodoValue] = useState("")
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoValue(e.target.value);
  }
  
  useEffect(() => {
    dispatch(fetchPosts())
    
  }, [dispatch])

  
  const addTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({type: "ADD_TODO", text: todoValue})
    setTodoValue("");
    console.log(posts)
  }

  return (
    posts ? 
    <Layout>
      <h1>Counter</h1>
      Clicked for {counter} times!
      <Buttons>
        <CounterButton onClick={onIncrement} color={'white'}>
          +
        </CounterButton>
        <h3 style={{marginTop : '45px'}}>or</h3>
        <CounterButton onClick={onDecrement} color={'white'}>
          -
        </CounterButton>
      </Buttons>
      <h1>Todos</h1>
      <List>
        {todos.map((todo, index) => <ListItem key={index}> {todo}</ListItem>)}
      </List>
      <SubmitForm onSubmit={addTodo}>
        <Input type='text' value={todoValue} onChange={handleChange} placeholder='Input things to do!'/>
        <SubmitButton type='submit'> + </SubmitButton>
      </SubmitForm>
      <h1>Posts</h1>
      <Posts>
      {postsTo10.map((post, index) => <Post key={index}>ㆍ {post.title.toUpperCase()}</Post>)}
    </Posts>
    </Layout>
    : <div>Loading...</div>
    
  );
}

const Layout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #fffff4;
  border: 1px solid beige;
  width: 400px;
  margin: auto;
  margin-top: 10px;
  padding-bottom: 50px;
  border-radius: 5px;
`

const List = styled.ul`
  padding: 0;
`

const Buttons = styled.li`
  list-style: none;
  display: flex;
`

const CounterButton = styled.button`
  width : 50px;
  height: 40px;
  border-radius: 5px;
  margin: 40px;
  font-size: 25px;
  font-weight: lighter;
  text-align: center;
  border: none;
  transition: 300ms all ease;
  &:hover{
    background-color: #4a4848;
    font-size: 30px;
    
    color: ${(props) => (props.color)};
  }
`


const ListItem = styled.li`
  list-style: none;
  width: 250px;
  height: 40px;
  background-color: #b0eca3;
  border: none;
  margin: 10px;
  & + & {
    margin: 10px;
  }
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 350px;
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  font-style: italic;

`

const SubmitForm = styled.form`
  display: flex;
  margin-top: 10px;
  margin-bottom: 20px;
`

const Input = styled.input`
  width: 200px;
  height: 30px;
  margin-left: 40px;
`

const SubmitButton = styled.button`
  width: 35px;
  height: 35px;
  border-radius: 5px;
  border: none;
  margin-left: 15px;
  background-color: rgba(255,255,255,0);
  font-size: 30px;
  transition: 300ms ease;
  &:hover{
    transform: rotate(180deg) scale(1.3);
  }
  &:active{
    transform: scale(2.0);
  }
`

const Posts = styled.ul`
  padding: 0;
  margin-top: 30px;
  display : flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid tan;
  border-radius: 5px;
`

const Post = styled.li`
  width: 350px;
  height: 40px;
  font-size: large;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 5px;
  margin-top: 15px;
  padding: 15px;
  cursor: pointer;
  & + & {
    margin-top: 15px;
    
  }
  &:hover{
    color: #128e96;
  }
  `

export default App;
