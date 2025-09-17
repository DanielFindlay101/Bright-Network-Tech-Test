"use client";
import { useState, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import discover from "../app/assets/discover-journey-maze.svg";
import clipboard from "../app/assets/clipboard-question.svg";
import stopwatch from "../app/assets/stopwatch.svg";
import scissors from "../app/assets/scissor-cutting.svg";
import Card from "./components/Card";
import QuestionManager from "./manager/questionManager";
import ResultCard from "./components/ResultCard";

export interface Question {
  text: string;
  id: string;
}

export interface Answer {
  questionId: string;
  answer: number;
}

const answerArray = [1, 2, 3, 4, 5, 6, 7];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasCompleted, setHasCompleted] = useState(false);
  const [answers, setAnswers] = useState<Answer[]>([]);

  const [questions, setQuestions] = useState<Question[]>([]);
  const manager = new QuestionManager();

  // stops userId from chaning every render
  const userId = useMemo(() => uuidv4(), []);

  const fetchQuestions = async () => {
    const data = await manager.getQuestions(userId);
    setQuestions(data.questions);
  };

  const handleClick = (answerId: number) => {
    const currentQuestion = questions[currentIndex];

    const newAnswer: Answer = {
      questionId: currentQuestion.id,
      answer: answerId,
    };

    setAnswers((prev) => [...prev, newAnswer]);

    setCurrentIndex((prev) => prev + 1);
  };
  console.log(answers);

  const submitAnswers = async () => {
    await manager.submitAnswers(userId, answers);
    setHasCompleted(true);
  };

  const seeResults = async (userID: string) => {
    await manager.seeResults(userID);
  };

  const percentageComplete = (currentIndex / questions?.length) * 100;
  return (
    <div className=" bg-slate-100 w-full mb-12">
      <nav className="bg-slate-200 w-full h-1/5 flex flex-col-reverse md:flex-row items-center px-12">
        <div className="space-y-4">
          <h2 className="text-2xl text-slate-950 font-bold tracking-wide">
            Career path test
          </h2>
          <p className="text-slate-800">
            Discover careers that match your skills and personality
          </p>
        </div>
        <Image
          src={discover}
          alt="graduation"
          className="w-full md:w-1/2 h-full ml-auto"
        />
      </nav>
      <main className="p-8 md:p-12">
        <div className="flex flex-col md:flex-row justify-evenly gap-8">
          <Card
            className="bg-orange-100/50 border-orange-500"
            title="24 questions"
            description="Answer 24 questions about your working style and career
              preferences"
            icon={clipboard}
          />

          <Card
            className="bg-violet-100/50 border-violet-500"
            title="2 minutes"
            description="Gain insights into your future career in just two minutes"
            icon={stopwatch}
          />
          <Card
            className="bg-yellow-100/50 border-yellow-500"
            title="Personalised advice"
            description="Receive personalised advice to guide you on your next steps"
            icon={scissors}
          />
        </div>

        <div className="mt-12 md:mt-20 md:px-12 text-slate-800 space-y-4">
          <p>
            We&apos;ve analysed data from thousands of our members who work in
            graduate roles across a range of sectors to understand which
            personalities, skills and values best fit each career path.{" "}
          </p>
          <p>
            Take this test to understand what career path you might be suited to
            and how to get started.
          </p>
        </div>

        {!hasCompleted ? (
          <div className="border border-slate-300 w-4/5 mt-12 mx-auto shadow-xl shadow-slate-200">
            <div className=" border-b flex items-center gap-4 border-slate-300  w-full p-6">
              <p className="text-slate-800">
                Your progress - {Math.ceil(percentageComplete)}%
              </p>
              <progress
                className="progress progress-primary w-56"
                value={Math.ceil(percentageComplete)}
                max="100"
              ></progress>
            </div>
            <div className="p-2 md:py-12 md:px-20">
              {questions.length === 0 ? (
                <button
                  className="btn btn-primary bg-orange-500 border-orange-300 rounded-md"
                  onClick={() => fetchQuestions()}
                >
                  Get questions
                </button>
              ) : (
                <>
                  {currentIndex !== questions.length ? (
                    <>
                      <div className="flex gap-2">
                        <h3 className="text-orange-500">
                          Q{currentIndex + 1}/{questions.length}
                        </h3>
                        <p className="text-slate-700 text-sm">
                          In a job, I would be motivated by
                        </p>
                      </div>
                      <p className="text-slate-800 font-bold">
                        {questions[currentIndex].text}
                      </p>

                      <div className="flex flex-col items-center justify-center">
                        <ul className="steps  steps-vertical md:steps-horizontal mt-6">
                          {answerArray.map((answer, id) => (
                            // TODO: need to change colour of step onClick
                            <li
                              key={id}
                              className="step hover:cursor-pointer"
                              onClick={() => handleClick(id + 1)}
                            >
                              {answer}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  ) : (
                    <button
                      className="btn btn-primary bg-orange-500 border-orange-300 rounded-md"
                      onClick={() => submitAnswers()}
                    >
                      Finish
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        ) : (
          <ResultCard handler={() => seeResults(userId)} />
        )}
      </main>
    </div>
  );
}
