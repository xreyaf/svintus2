import styled from "@emotion/styled";
import {motion} from "framer-motion";

export const Container = styled.div`
  min-height: 100vh;
  text-align: center;

`;

export const Button = styled(motion.button)`
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

export const Heading = styled.h1`
  margin: 0.3rem 0;
  color: #918673;
`;

export const Text = styled.span`
  font-size: 2rem;
  color: #cac9c6;
`;

export const Image = styled(motion.img)`
  margin-top: 1rem;
  width: 10rem;
`;