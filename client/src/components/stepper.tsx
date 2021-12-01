/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import { Link } from "react-router-dom";

export const Steps = ({
  stepTitleNext,
  stepNumberNext,
  stepTitlePrev,
  onPrevClick,
  onNextClick,
  stepsCount,
  currentStep,
  onDone,
  onRestart,
  onChangeOpen,
  commentCont,
}: {
  stepTitlePrev: string | undefined;
  stepTitleNext: string | undefined;
  stepNumberNext: string | undefined;
  onPrevClick: () => void | undefined;
  onNextClick: () => void | undefined;
  stepsCount: string;
  currentStep: string;
  onDone: string;
  onRestart: string;
  onChangeOpen;
  commentCont;
}): JSX.Element => {
  return (
    <>
      <div className="  fixed bottom-0 left-0 w-full h-20 bg-gray-700 z-10 ">
        <div className="relative">
          <div className="overflow-hidden h-2 text-xs flex rounded bg-purple-100">
            <div
              style={{ width: `${(+currentStep / +stepsCount) * 100}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-700"
            />
          </div>
        </div>
        <div className="flex">
          <div className="w-full text-center">
            <div className="bg-gray-700 rounded-lg flex items-center justify-between ">
              <div
                className="flex w-1/3 gap-4 cursor-pointer"
                onClick={onPrevClick}
              >
                <div className="w-1/6 bg-transparent h-16 flex items-center justify-center icon-step">
                  <div className="flex-1 flex items-center justify-center">
                    <svg
                      width="24"
                      height="24"
                      xmlns="http://www.w3.org/2000/svg"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      fill="#f4f4f4"
                    >
                      <path d="M20 .755l-14.374 11.245 14.374 11.219-.619.781-15.381-12 15.391-12 .609.755z" />
                    </svg>
                  </div>
                </div>
                <div className="w-5/6 bg-gray-700 h-16 flex flex-col items-center justify-center px-1 rounded-r-lg body-step">
                  {stepTitlePrev ? (
                    <>
                      <h2 className="font-bold text-lg">{stepTitlePrev}</h2>
                    </>
                  ) : null}
                </div>
              </div>
              <div
                onClick={onChangeOpen}
                className="flex w-1/3  gap-4 cursor-pointer items-center"
              >
                Questions & Comments
                <span className="text-gray-400">({commentCont})</span>
              </div>
              <div
                className="flex w-1/3  gap-4 cursor-pointer items-center"
                onClick={onNextClick}
              >
                <div className="w-5/6 bg-gray-700 h-16 flex flex-col items-center justify-center px-1 rounded-r-lg body-step">
                  {stepNumberNext ? (
                    <>
                      <h2 className="font-bold text-lg">{stepTitleNext}</h2>
                    </>
                  ) : (
                    <div className="flex gap-4">
                      <Link
                        to={onDone}
                        key={Date.now() + Math.random() * 100}
                        className="  btn btn-outline "
                      >
                        Done
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          className="ml-3 inline"
                          fill="rgba(109, 40, 217)"
                        >
                          <path d="M23.334 11.96c-.713-.726-.872-1.829-.393-2.727.342-.64.366-1.401.064-2.062-.301-.66-.893-1.142-1.601-1.302-.991-.225-1.722-1.067-1.803-2.081-.059-.723-.451-1.378-1.062-1.77-.609-.393-1.367-.478-2.05-.229-.956.347-2.026.032-2.642-.776-.44-.576-1.124-.915-1.85-.915-.725 0-1.409.339-1.849.915-.613.809-1.683 1.124-2.639.777-.682-.248-1.44-.163-2.05.229-.61.392-1.003 1.047-1.061 1.77-.082 1.014-.812 1.857-1.803 2.081-.708.16-1.3.642-1.601 1.302s-.277 1.422.065 2.061c.479.897.32 2.001-.392 2.727-.509.517-.747 1.242-.644 1.96s.536 1.347 1.17 1.7c.888.495 1.352 1.51 1.144 2.505-.147.71.044 1.448.519 1.996.476.549 1.18.844 1.902.798 1.016-.063 1.953.54 2.317 1.489.259.678.82 1.195 1.517 1.399.695.204 1.447.072 2.031-.357.819-.603 1.936-.603 2.754 0 .584.43 1.336.562 2.031.357.697-.204 1.258-.722 1.518-1.399.363-.949 1.301-1.553 2.316-1.489.724.046 1.427-.249 1.902-.798.475-.548.667-1.286.519-1.996-.207-.995.256-2.01 1.145-2.505.633-.354 1.065-.982 1.169-1.7s-.135-1.443-.643-1.96zm-12.584 5.43l-4.5-4.364 1.857-1.857 2.643 2.506 5.643-5.784 1.857 1.857-7.5 7.642z" />
                        </svg>
                      </Link>
                      <Link
                        to={onRestart}
                        key={Date.now() + Math.random() * 100}
                        className="btn btn-primary"
                      >
                        Restart
                        <svg
                          className="ml-3 inline"
                          width="24"
                          height="24"
                          xmlns="http://www.w3.org/2000/svg"
                          fillRule="evenodd"
                          clipRule="evenodd"
                          fill="#fff"
                        >
                          <path d="M7 9h-7v-7h1v5.2c1.853-4.237 6.083-7.2 11-7.2 6.623 0 12 5.377 12 12s-5.377 12-12 12c-6.286 0-11.45-4.844-11.959-11h1.004c.506 5.603 5.221 10 10.955 10 6.071 0 11-4.929 11-11s-4.929-11-11-11c-4.66 0-8.647 2.904-10.249 7h5.249v1z" />
                        </svg>
                      </Link>
                    </div>
                  )}
                </div>
                <div className="w-1/6 bg-transparent h-16  flex items-center justify-center icon-step">
                  <div className="flex-1 flex items-center justify-center">
                    <svg
                      width="24"
                      height="24"
                      xmlns="http://www.w3.org/2000/svg"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      fill="#f4f4f4"
                    >
                      <path d="M4 .755l14.374 11.245-14.374 11.219.619.781 15.381-12-15.391-12-.609.755z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center" />
        </div>
      </div>
    </>
  );
};
