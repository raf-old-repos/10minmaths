import Head from "next/head";
import { db } from "../../util/db";
import styles from "../styles/Home.module.css";
import PrivateRoute from "../../components/private";
import { useState, useEffect } from "react";
import Image from "next/image";
import { EditableMathField, StaticMathField } from "react-mathquill";

/*

    Problem page
*/

export default function Problem({ e, problem }) {
  const time = 600;
  const [fallback, setFallback] = useState(null);
  const [userResponse, setUserResponse] = useState(null);
  const [countDown, setCountDown] = useState(time);
  const [prettyCountDown, setPrettyCountDown] = useState(null);
  const [visible, setVisible] = useState(localStorage.getItem("countdown-visibility"));

  useEffect(() => {

  }, [])

  useEffect(() => {

    // Setting the visibility to false if count down is 0
  

    return () => clearInterval(interval);
  }, [countDown]);

  useEffect(() => {
    if (problem.date != new Date().toISOString() && problem.released) {
      setFallback(`/problems/past/${problem.date}`);
    }
  }, [e, problem]);

  if (e) {
    return (
      <>
        <div className={styles.container}>
          <Head>
            <title>Oh No!</title>
          </Head>
          <h1>This may have been a miscalculation on our end! 😢</h1>
          {/* Make a toggle later to show error for geeks */}
          <p>{e}</p>
        </div>
      </>
    );
  }

  const handleSubmit = async () => {};

  return (
    <PrivateRoute fallback={fallback}>
      <div className={styles.container}>
        <Head>
          <title>
            {problem.name} | {problem.date}
          </title>
          {/* TODO ! Add all the required headers here */}
          <meta name="description" content="..." />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {/* Timer */}
        <div>
          <h1>{prettyCountDown}</h1>
        </div>
        {/* Problem Name */}
        <div>
          <h1>{problem.name}</h1>
        </div>
        {/* Question */}
        <div>
          <StaticMathField>{problem.body}</StaticMathField>
        </div>
        <div>
          <EditableMathField
            latex={userResponse}
            onChange={(mathField) => {
              setUserResponse(mathField.latex());
            }}
          />
        </div>
        <div>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </PrivateRoute>
  );
}

export async function getStaticProps(ctx) {
  const { date } = ctx.req.params;

  try {
    const problem = await db.dailyProblem.findFirstOrThrow({
      where: {
        date,
      },
    });

    

    return {
      props: {
        problem,
      },
    };
  } catch (e) {
    return {
      props: {
        e,
      },
    };
  }
}
