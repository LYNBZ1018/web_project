import ACTIONS from "./actions";

const evaluate = state => {
    let {lastOperand, currentOperand, operation} = state;
    let last = parseFloat(lastOperand);
    let current = parseFloat(currentOperand);
    let res = "";
    switch (operation) {
        case '+':
            res = last + current;
            break;
        
        case '-':
            res = last - current;
            break;

        case '×':
            res = last * current;
            break;

        case '÷':
            res = last / current;
            break;
    
        default:
            break;
    }
    return res.toString();
}

const reducer = (state={
    currentOperand: "",
    lastOperand: "",
    operation: "",
    overwrite: false,
}, action) => {
    switch(action.type) {
        case ACTIONS.ADD_DIGIT:
            if (state.overwrite) {  // 如果计算出一个结果后，再按数字键进行计算，清空结果
                return {
                    ...state,
                    currentOperand: action.digit,
                    overwrite: false,
                }
            }
            if (state.currentOperand === '0' && action.digit === '0')  // 防止有多个前导0
                return state;
            if (state.currentOperand === '0' && action.digit !== '.')  // 若果当前值为0，下一个输入的不是‘.’，就用输入值代替0，=>取消掉前导0
                return {
                    ...state,
                    currentOperand: action.digit,
                }
            if (action.digit === '.' && state.currentOperand.includes('.'))  // 防止一个数中出现多个'.'
                return state;
            if (action.digit === '.' && state.currentOperand === "")  // 输入为'.'，当前值为空，补一个0
                return {
                    ...state,
                    currentOperand: "0.",
                }
            return {
                ...state,
                currentOperand: state.currentOperand + action.digit,
            }
        
        case ACTIONS.DELETE_DIGIT:
            if (state.overwrite)  // 如果计算出一个结果后，再按Del，就清空结果
                return {
                    ...state,
                    currentOperand: "",
                    overwrite: false,
                }
            if (state.currentOperand === "")
                return state;
            return {
                ...state,
                currentOperand: state.currentOperand.slice(0, -1),  // 一位
            }

        case ACTIONS.CHOOSE_OPERATION:
            if (state.lastOperand === "" && state.currentOperand === "")  // 没有数值时按符号无作用
                return state;
            if (state.lastOperand === "")  // 如果last为空，current有，则把curren赋给last，operation赋给operation
                return {
                    ...state,
                    lastOperand: state.currentOperand,
                    operation: action.operation,
                    currentOperand: "",
                }
            if (state.currentOperand === "")  // 当last不为空，current为空，可以按符号来更换原来的符号
                return {
                    ...state,
                    operation: action.operation,
                }
            return {  // current和last都有值，再按符号键，就会把之前的计算结果放在last 清空current
                ...state,
                lastOperand: evaluate(state),
                operation: action.operation,
                currentOperand: "",
            }

        case ACTIONS.CLEAR: 
            return {
                ...state,
                currentOperand: "",
                lastOperand: "",
                operation: "",
            }

        case ACTIONS.EVALUATE:
            if (state.currentOperand === "" || state.lastOperand === "" || state.operation === "")
                return state;
            return {
                ...state,
                currentOperand: evaluate(state),
                lastOperand: "",
                operation: "",
                overwrite: true,
            }

        default:
            return state;
    }
};

export default reducer;