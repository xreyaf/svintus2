import Head from "next/head";
import {useDispatch} from "react-redux";
import {
    setState,
} from "../features/counter/counterSlice";
import {useCallback, useEffect, useRef, useState} from "react";
import {css, Global} from "@emotion/react";
import "next/server";
import {Container, Image} from "./style";
import Counter from "./counter";
import topology from "vanta/dist/vanta.halo.min";
import * as THREE from "three";

const _ = require("lodash");


export default function Home() {
    const dispatch = useDispatch();
    let prevData;

    const fetchData = useCallback(async () => {
        await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/svin`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((responce) => responce.json())
            .then((data) => {
                if (_.isEqual(prevData, data)) {
                    return;
                } else {
                    prevData = _.cloneDeep(data);
                }
                const counters = data.data;
                delete counters[0]._id;
                for (let index in counters[0]) {
                    dispatch(setState(index)(counters[0][index]));
                }
            });
    }, []);

    useEffect(() => {
        fetchData();

        const intervalId = setInterval(() => fetchData(), 3000);
        return () => clearInterval(intervalId);
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


    const [vantaEffect, setVantaEffect] = useState(0);
    const vantaRef = useRef(null);
    useEffect(() => {
        if (!vantaEffect) {
            setVantaEffect(
                topology({
                    el: vantaRef.current,
                    THREE,
                    mouseControls: true,
                    touchControls: true,
                    gyroControls: false,
                    minHeight: 200.00,
                    minWidth: 200.00
                })
            );
        }
        return () => {
            if (vantaEffect) vantaEffect.destory();
        };
    }, [vantaEffect]);


    return (
        <main ref={vantaRef}>
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
                      overflow: hidden;
                  }
                `}
            />

            <Container>
                <Head>
                    <title>Свинтус</title>
                    <link rel="icon" href="/favicon.ico"/>

                </Head>
                <Image
                    transition={bounceTransition}
                    animate={{
                        y: [20, 0],
                    }}
                    src={"/svin.png"}
                />
                <Counter name="counterRoma"/>
                <Counter name="counterLiza"/>
                <Counter name="counterArseny"/>
                <Counter name="counterDima"/>
                <Counter name="counterOksana"/>
            </Container>
        </main>
    );
}
