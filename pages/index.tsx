import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import {
  decrement,
  increment,
  selectCount,
  setState,
} from "../features/counter/counterSlice";
import { useEffect } from "react";
import { motion } from "framer-motion";
import styled from "@emotion/styled";
import { css, Global } from "@emotion/react";
import "next/server";

const Container = styled.div`
  min-height: 100vh;
  text-align: center;
`;

const Button = styled(motion.button)`
  cursor: pointer;
  border: none;
  outline: none;
  background-color: #4f453c;
  font-size: 2rem;
  color: #cac9c6;
  margin: 1rem 0.2rem;
  padding: 1rem;
  border-radius: 1rem;
`;

// const Input = styled(motion.input)`
//   border: none;
//   outline: none;
//   background-color:#4F453C;
//   font-size: 2rem;
//   color: #CAC9C6;
//   margin: 0 1rem;
//   padding: 1rem;
//   border-radius: 1rem;
//   width: 2rem;
// `

const Heading = styled.h1`
  margin: 0.3rem 0;
  color: #918673;
`;

const Text = styled.span`
  font-size: 2rem;
  color: #cac9c6;
`;

const Image = styled(motion.img)`
  margin-top: 1rem;
  width: 10rem;
`;

const Counter = ({ name }) => {
  const count = useSelector((state) => selectCount(name)(state));
  // const [incrementAmount, setIncrementAmount] = useState("2");
  const dispatch = useDispatch();

  let submitForm = async (name, number) => {
    let isProved = confirm(`Хочешь обновить ${name}?`);
    if (isProved === true) {
      let res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/svin`, {
        method: "PUT",
        body: JSON.stringify({
          [name]: number,
        }),
      });
      await res.json();
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } else {
      setTimeout(() => {
        window.location.reload();
      }, 500);
      return null;
    }
  };

  return (
    <>
      <Heading>{name.replace("counter", "")}</Heading>
      <Text>{count}</Text>
      <Button
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
        onClick={() => dispatch(decrement(name)())}
      >
        -1
      </Button>
      <Button
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
        onClick={() => dispatch(increment(name)())}
      >
        +1
      </Button>
      {/*<Input*/}
      {/*    value={incrementAmount}*/}
      {/*    onChange={(e) => setIncrementAmount(e.target.value)}*/}
      {/*/>*/}
      {/*<Button whileTap={{scale: 0.9}} whileHover={{scale: 1.05}}*/}
      {/*        onClick={() =>*/}
      {/*            dispatch(incrementByAmount(name)(Number(incrementAmount) || 0))*/}
      {/*        }*/}
      {/*>*/}
      {/*    add*/}
      {/*</Button>*/}
      <Button
        style={{ backgroundColor: "#A24D30" }}
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
        onClick={() => submitForm(name, count)}
      >
        upd
      </Button>
    </>
  );
};

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/svin`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((responce) => responce.json())
        .then((data) => {
          const counters = data.data;
          delete counters[0]._id;
          for (let index in counters[0]) {
            dispatch(setState(index)(counters[0][index]));
          }
        });
    };
    fetchData();
  }, []);

  const bounceTransition = {
    y: {
      duration: 1,
      yoyo: Infinity,
      ease: "easeOut",
    },
    backgroundColor: {
      duration: 0,
      yoyo: Infinity,
      ease: "easeOut",
      repeatDelay: 0.8,
    },
  };

  return (
    <>
      <Global
        styles={css`
          @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap");

          * {
            margin: 0;
            padding: 0;
            font-family: "Poppins", sans-serif;
          }

          body {
            background-color: #1e2128;
          }
        `}
      />
      <Container>
        <Head>
          <title>Свинтус</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Image
          transition={bounceTransition}
          animate={{
            y: [20, 0],
          }}
          src={"/svin.png"}
        />
        <Counter name="counterRoma" />
        <Counter name="counterLiza" />
        <Counter name="counterArseny" />
        <Counter name="counterDima" />
        <Counter name="counterOksana" />
      </Container>
    </>
  );
}
