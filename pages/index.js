import Head from 'next/head'
import {Provider, useDispatch, useSelector} from "react-redux";
import {decrement, increment, incrementByAmount, selectCount} from "../features/counter/counterSlice";
import {useState} from "react";
import {motion} from "framer-motion";
import styled from "@emotion/styled";
import {css, Global} from "@emotion/react";
import store from "../app/store";
import 'next/server'

const Container = styled.div`

  min-height: 100vh;
  color: white;
  text-align: center;
`

const Button = styled(motion.button)`
  border: none;
  outline: none;
  background-color: black;
  font-size: 2rem;
  color: white;
  margin: 0 1rem;
  padding: 1rem;
  border-radius: 1rem;
`

const Input = styled(motion.input)`
  border: none;
  outline: none;
  background-color: black;
  font-size: 2rem;
  color: white;
  margin: 0 1rem;
  padding: 1rem;
  border-radius: 1rem;
  width: 6rem;
`

const Heading = styled.h1`
  margin: 0.3rem 0;
  color: black;
`

const Text = styled.span`
  font-size: 2rem;
  color: black;
`

const Image = styled(motion.img)`
  margin-top: 1rem;
  width: 10%;

`

const Counter = ({name}) => {
    const count = useSelector((state) => selectCount(name)(state));
    const dispatch = useDispatch();
    const [incrementAmount, setIncrementAmount] = useState("2");
    return (
        <>
            <Heading>{name.replace('counter', '')}</Heading>
            <Text>{count}</Text>
            <Button whileTap={{scale: 0.9}} whileHover={{scale: 1.05}}
                    onClick={() => dispatch(decrement(name)())}>-1</Button>
            <Button whileTap={{scale: 0.9}} whileHover={{scale: 1.05}}
                    onClick={() => dispatch(increment(name)())}>+1</Button>
            <Input
                value={incrementAmount}
                onChange={(e) => setIncrementAmount(e.target.value)}
            />
            <Button whileTap={{scale: 0.9}} whileHover={{scale: 1.05}}
                    onClick={() =>
                        dispatch(incrementByAmount(name)(Number(incrementAmount) || 0))
                    }
            >
                Add Amount
            </Button>
        </>
    );
};

export default function Home({isConnected}) {

    return (

        <Provider store={store}>
            <Global
                styles={css`
                  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

                  * {
                    margin: 0;
                    padding: 0;
                    font-family: 'Poppins', sans-serif;
                  }
                `}
            />
            <Container>
                <Head>
                    <title>Свинтус</title>
                </Head>
                <Image animate={{rotate: 360, scale: 1.01}}
                       transition={{type: 'spring', repeat: Infinity, duration: 3}} src={'/svin.png'}/>
                <Counter name="counterRoma"/>
                <Counter name="counterLiza"/>
                <Counter name="counterArseny"/>
                <Counter name="counterDima"/>
                <Counter name="counterOksana"/>
                <>{isConnected ? (
                    <Heading>You are connected to MongoDB</Heading>
                ) : (
                    <Heading>
                        You are NOT connected to MongoDB
                    </Heading>
                )}</>
            </Container>
        </Provider>
    )
}
