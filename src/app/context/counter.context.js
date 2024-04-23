"use client";

import React, { createContext, useEffect, useReducer, useState } from "react";

const initialState = {
  searchCriteria: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SETSEARCHCRITERIA":
      localStorage.setItem("searchCriteria", JSON.stringify(action.criteria));
      return { ...state, searchCriteria: JSON.stringify(action.criteria) };
    // case "DECREMENT":
    //   return { ...state, searchCriteria: state.count - 1 };
    // case "RESET":
    //   return { ...state, searchCriteria: 0 };
    default:
      return state;
  }
};

export const CounterContext = createContext({ state: null, dispatch: () => null });

export const CounterContextProvider = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const storedData = localStorage.getItem("searchCriteria");
    if (storedData) {
      dispatch({ type: "SETSEARCHCRITERIA", criteria: JSON.parse(storedData) });
    }
  }, []);

  return (
    <CounterContext.Provider value={{ state, dispatch }}>
      {children}
    </CounterContext.Provider>
  );
};
