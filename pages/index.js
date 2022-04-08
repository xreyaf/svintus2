import Head from 'next/head'
import {useDispatch, useSelector} from "react-redux";
import {decrement, increment, incrementByAmount, selectCount, setState} from "../features/counter/counterSlice";
import {useEffect, useState} from "react";
import {motion} from "framer-motion";
import styled from "@emotion/styled";
import {css, Global} from "@emotion/react";
import 'next/server'

const Container = styled.div`

  min-height: 100vh;
  color: white;
  text-align: center;
`

const Button = styled(motion.button)`
  cursor: pointer;
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
    const [incrementAmount, setIncrementAmount] = useState("2");
    const dispatch = useDispatch();

    let submitForm = async (name, number) => {
        let res = await fetch("https://svintus228.vercel.app/api/svin", {
            method: "PUT",
            body: JSON.stringify({
                [name]: number,
            }),
        });
        res = await res.json();
        console.log(res)

    };

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
            <Button style={{backgroundColor: 'red'}} whileTap={{scale: 0.9}} whileHover={{scale: 1.05}}
                    onClick={() => submitForm(name, count)}>upd</Button>
        </>
    );
};

export default function Home() {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            await fetch("https://svintus228.vercel.app/api/svin", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }).then(responce => responce.json()).then(data => {
                const counters = data.data
                delete counters[0]._id
                for (let index in counters[0]) {
                    dispatch(setState(index)(counters[0][index]))
                }
            });
        }
        fetchData()
    }, [])


    return (
        <>
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
            </Container>
        </>
    )
}