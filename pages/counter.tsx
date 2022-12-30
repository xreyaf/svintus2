import {useDispatch, useSelector} from "react-redux";
import {
    decrement,
    increment,
    selectCount,

} from "../features/counter/counterSlice";
import "next/server";
import {useRouter} from "next/router";
import {Button, Heading} from "./style";
import React from "react";
import {Text} from './style'

const Counter = ({name}) => {
    const count = useSelector((state) => selectCount(name)(state));
    const dispatch = useDispatch();
    const router = useRouter();
    const refreshData = () => {
        router.replace(router.asPath);
    };

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
                refreshData();
            }, 500);
        } else {
            setTimeout(() => {
                refreshData();
            }, 500);
            return null;
        }
    };

    return (
        <>
            <Heading>{name.replace("counter", "")}</Heading>
            <Text>{count}</Text>
            <Button
                whileTap={{scale: 0.9}}
                whileHover={{scale: 1.05}}
                onClick={() => dispatch(decrement(name)())}
            >
                -1
            </Button>
            <Button
                whileTap={{scale: 0.9}}
                whileHover={{scale: 1.05}}
                onClick={() => dispatch(increment(name)())}
            >
                +1
            </Button>
            <Button
                style={{backgroundColor: "#A24D30"}}
                whileTap={{scale: 0.9}}
                whileHover={{scale: 1.05}}
                onClick={() => submitForm(name, count)}
            >
                upd
            </Button>
        </>
    );
};

export default Counter;


