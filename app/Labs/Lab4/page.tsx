"use client"
// 1. Import all the components you have made so far
import ClickEvent from "./ClickEvent";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunctions";
import EventObject from "./EventObject";
import Counter from "./Counter";
import BooleanStateVariables from "./BooleanStateVariables";
import StringStateVariables from "./StringStateVariables";
import DateStateVariable from "./DateStateVariable";
import ObjectStateVariable from "./ObjectStateVariable";
import ArrayStateVariable from "./ArrayStateVariable";
import ParentStateComponent from "./ParentStateComponent";
import ReduxExamples from "./ReduxExamples";
import store from "./store";
import { Provider } from "react-redux";

export default function Lab4() {
  
  // 2. This is the function for the PassingFunctions component
  function sayHello() {
    alert("Hello");
  }

  return (
    <Provider store={store}>
      <div id="wd-passing-functions">
        <h2>Lab 4</h2>
        
        {/* 3. All your components go inside the Provider */}
        <ClickEvent />
        <PassingDataOnEvent />
        <PassingFunctions theFunction={sayHello} />
        <EventObject />
        <Counter />
        <BooleanStateVariables />
        <StringStateVariables />
        <DateStateVariable />
        <ObjectStateVariable />
        <ArrayStateVariable />
        <ParentStateComponent />
        <ReduxExamples/>
        
        {/* We will add more components here as we go... */}
      </div>
    </Provider>
    // --- END OF CHANGE ---
  );
}