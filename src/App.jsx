import React from 'react'
import './App.css'

class ModifierButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value
        }
    }
    render() {
        return (
            <button className='modifier' 
                onClick={() => this.props.onClick()}
            >
            {this.state.value} 
            </button>
        )
    }
}

class OperatorButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value
        }
    }
    render() {
        return (
            <button className='operator' 
                onClick={() => this.props.onClick()}
            >
            {this.state.value} 
            </button>
        )
    }
}

class CalcButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value,
        };
    }

    render() {
        return (
            <button className= {this.state.value != 0 ? 'digit' : 'digit_zero'} 
                onClick={() => this.props.onClick()}
            >
            {this.state.value} 
            </button>
        )
    }
}

class EquationBorder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            equation: ""
        };
    }
    changeEquation(i) {
        this.setState({
            equation: i
        })
    }
    appendToEquation(i) {
        this.setState({
            equation: this.state.equation + i
        })
    }
    render() {
        return (
            <div className='eq-border'>
                {this.state.equation}
            </div>
        )
    }
}

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.EquationElement = React.createRef();
    }
    handleDigitClick(i) {
        const equationElement = this.EquationElement.current;

        equationElement.appendToEquation(i);
    }

    renderModifierButton(i, clickHandler) {
        return (
            <ModifierButton
                value={i}
                onClick= { clickHandler } />
        )
    }

    renderOperatorButton(i, clickHandler) {
        return (
            <OperatorButton
                value={i}
                onClick= { clickHandler } />
        )
    }

    renderButton(i) {
        return (
            <CalcButton
                value={i}
                onClick={() => 
                    this.handleDigitClick(i)
                }
            />
        )
    }
    render() {
        return (
            <div className='calculator'>
                <div className='calc-border'>
                    <div>
                        <div>
                            <div>
                                <div>
                                    <EquationBorder ref={this.EquationElement} />
                                </div>
                            </div>
                            {this.renderModifierButton('C', () => {
                                        const equationElement = this.EquationElement.current;
                                        equationElement.changeEquation("");
                            })}
                            {this.renderModifierButton('+/-', () => {
                                        const equationElement = this.EquationElement.current;
                                        equationElement.changeEquation(eval("-1 * " + equationElement.state.equation));
                            })}
                            {this.renderModifierButton('%', () => {
                                        const equationElement = this.EquationElement.current;
                                        equationElement.changeEquation(eval(equationElement.state.equation / 100));
                            })}
                                {this.renderOperatorButton('/', () => {
                                        const equationElement = this.EquationElement.current;
                                        equationElement.appendToEquation('/');
                                })}
                            <div className="calc-row">
                                {this.renderButton(7)}
                                {this.renderButton(8)}
                                {this.renderButton(9)}
                                {this.renderOperatorButton('*', () => {
                                        const equationElement = this.EquationElement.current;
                                        equationElement.appendToEquation('*');
                                })}
                            </div>
                            <div className="calc-row">
                                {this.renderButton(4)}
                                {this.renderButton(5)}
                                {this.renderButton(6)}
                                {this.renderOperatorButton('-', () => {
                                        const equationElement = this.EquationElement.current;
                                        equationElement.appendToEquation('-');
                                })}
                            </div>
                            <div className="calc-row">
                                {this.renderButton(1)}
                                {this.renderButton(2)}
                                {this.renderButton(3)}
                                {this.renderOperatorButton('+', () => {
                                        const equationElement = this.EquationElement.current;
                                        equationElement.appendToEquation('+');
                                })}
                            </div>
                            <div className="calc-row">
                                {this.renderButton(0)}
                                {this.renderButton('.')}
                                {this.renderOperatorButton('=', () => {
                                        const equationElement = this.EquationElement.current;
                                        equationElement.changeEquation(eval(equationElement.state.equation));
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function App() {
  return (
    <div className="App">
      <Calculator/>
    </div>
  )
}

export default App
